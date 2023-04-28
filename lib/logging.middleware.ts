import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export interface LoggingMiddlewareOptions {
  logger: Console | Logger;
  logLevel: 'log' | 'debug' | 'warn' | 'error';
  /**
   * Create a custom log message.
   */
  logMessage?: (query: QueryInfo) => string;
}

export interface QueryInfo {
  /**
   * The queried prisma model.
   */
  model: string;
  /**
   * The performed action on the model e.g. `create`, `findUnique`.
   */
  action: string;
  /**
   * Time `Date.now()` before the query execution.
   *
   */
  before: number;
  /**
   * Time `Date.now()` after the query execution.
   */
  after: number;
  /**
   * Execution time of the query in milliseconds.
   */
  executionTime: number;
}

export function loggingMiddleware(
  { logger, logMessage, logLevel }: LoggingMiddlewareOptions = {
    logger: console,
    logLevel: 'debug',
  },
): Prisma.Middleware {
  return async (params, next) => {
    const before = Date.now();

    const result = await next(params);

    const after = Date.now();

    const executionTime = after - before;

    if (logMessage) {
      logger[logLevel](
        logMessage({
          model: params.model!,
          action: params.action,
          before,
          after,
          executionTime,
        }),
      );
    } else {
      logger[logLevel](
        `Prisma Query ${params.model}.${params.action} took ${executionTime}ms`,
      );
    }

    return result;
  };
}
