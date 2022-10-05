---
title: Exception Filter
layout: ../../layouts/Blog.astro
---

Use `PrismaClientExceptionFilter` to catch unhandled [PrismaClientKnownRequestError](https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine) and returns different HttpStatus codes instead of `500 Internal server error`. The exception filter supports REST (Express/Fasitfy) and GraphQL.

To use the filter you have the following two options.

1. Instantiate the filter in your `main.ts` and pass the `HttpAdapterHost`

```ts
//src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
```

Optionally, provide your own error code mapping via the constructor:

```ts
//src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      // Prisma Error Code: HTTP Status Response
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    })
  );

  await app.listen(3000);
}
bootstrap();
```

See the list of [Prisma CLient Errors](https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine) in the Prisma docs.

This will override the default error code mapping:

| Error Code                                                                                                        |  Http Status      |
| ----------------------------------------------------------------------------------------------------------------- | ----------------- |
| P2000 - "The provided value for the column is too long for the column's type. Column: {column_name}"              | Bad Request - 400 |
| P2002 - "Unique constraint failed on the {constraint}"                                                            | Conflict - 409    |
| P2025 - "An operation failed because it depends on one or more records that were required but not found. {cause}" | Not Found - 404   |

2. Use `APP_FILTER` token in any module

```ts
//src/app.module.ts
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
```
