---
title: Exception Filter
---

Use `PrismaClientExceptionFilter` to catch unhandled [PrismaClientKnownRequestError](https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine) and return different HttpStatus codes instead of `500 Internal server error`. The exception filter supports REST (Express/Fasitfy) and GraphQL.

> [NotFoundError](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#finduniqueorthrow) has been deprecated and replaced with `PrismaClientKnownRequestError`. (changed in `v0.21.0-dev.1`)

The exception filter has the following default error code mapping for [Prisma Client Errors](https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine).

| Error Code                                                                                                        |  Http Status      |
| ----------------------------------------------------------------------------------------------------------------- | ----------------- |
| P2000 - "The provided value for the column is too long for the column's type. Column: {column_name}"              | Bad Request - 400 |
| P2002 - "Unique constraint failed on the {constraint}"                                                            | Conflict - 409    |
| P2025 - "An operation failed because it depends on one or more records that were required but not found. {cause}" | Not Found - 404   |

## Binding filter

### useGlobalFilters()

Instantiate the filter in your `main.ts` and pass the `HttpAdapterHost`

```ts
//src/main.ts
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

### APP_FILTER

Use `APP_FILTER` token in combination with `useFactory` to instantiate `PrismaClientExceptionFilter`

```ts
//src/app.module.ts
import { Module } from '@nestjs/common';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter);
      },
      inject: [HttpAdapterHost],
    },
  ],
})
export class AppModule {}
```

Or use `providePrismaClientExceptionFilter()` (available since `v0.21.0-dev.0`)

```ts
//src/app.module.ts
import { Module } from '@nestjs/common';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  providers: [providePrismaClientExceptionFilter()],
})
export class AppModule {}
```

## Error code mapping

Provide your own error code mapping, if you like to catch additional [Prisma Client Errors](https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine) or when you need to change the `HttpStatus`.

### useGlobalFilters()

```ts
//src/main.ts
import { HttpStatus } from '@nestjs/common';
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
    }),
  );

  await app.listen(3000);
}
bootstrap();
```

### APP_FILTER

```ts
//src/app.module.ts
import { HttpStatus, Module } from '@nestjs/common';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter, {
          // Prisma Error Code: HTTP Status Response
          P2000: HttpStatus.BAD_REQUEST,
          P2002: HttpStatus.CONFLICT,
          P2025: HttpStatus.NOT_FOUND,
        });
      },
      inject: [HttpAdapterHost],
    },
  ],
})
export class AppModule {}
```

Or use `providePrismaClientExceptionFilter()` (available since `v0.21.0-dev.0`)

```ts
//src/app.module.ts
import { HttpStatus, Module } from '@nestjs/common';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  providers: [
    providePrismaClientExceptionFilter({
      // Prisma Error Code: HTTP Status Response
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    }),
  ],
})
export class AppModule {}
```
