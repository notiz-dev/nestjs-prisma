import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

/**
 *
 * {@link PrismaClientExceptionFilter} handling {@link Prisma.PrismaClientKnownRequestError} exceptions.
 *
 * Error codes definition for Prisma Client (Query Engine)
 * https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2000':
        this.catchValueTooLong(exception, response);
        break;
      case 'P2002':
        this.catchUniqueConstraint(exception, response);
        break;
      case 'P2025':
        this.catchNotFound(exception, response);
        break;
      default:
        this.unhandledException(exception, host);
        break;
    }
  }

  /**
   * Catches P2000 error code
   * https://www.prisma.io/docs/reference/api-reference/error-reference#p2000
   *
   * @param exception P2000
   * @param response 400 Bad Request
   */
  catchValueTooLong(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const status = HttpStatus.BAD_REQUEST;
    response.status(status).json({
      statusCode: status,
      message: this.cleanUpException(exception),
    });
  }

  /**
   * Catches P2002 error code
   * https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
   *
   * @param exception P2002
   * @param response 409 Conflict
   */
  catchUniqueConstraint(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const status = HttpStatus.CONFLICT;
    response.status(status).json({
      statusCode: status,
      message: this.cleanUpException(exception),
    });
  }

  /**
   * Catches P2025 error code
   * https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
   *
   * @param exception P2025
   * @param response 404 Not Found
   */
  catchNotFound(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response,
  ) {
    const status = HttpStatus.NOT_FOUND;
    response.status(status).json({
      statusCode: status,
      message: this.cleanUpException(exception),
    });
  }

  unhandledException(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    // default 500 error code
    super.catch(exception, host);
  }

  /**
   *
   * @param exception
   * @returns replace line breaks with empty string
   */
  cleanUpException(exception: Prisma.PrismaClientKnownRequestError): string {
    return exception.message.replace(/\n/g, '');
  }
}
