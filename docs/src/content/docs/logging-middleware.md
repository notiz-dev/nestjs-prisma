---
title: Logging Middleware
---

## Apply logging middleware

Use `loggingMiddleware` to log the query execution time.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),
  ],
})
export class AppModule {}
```

The default log messages are looking as follows.

```
Prisma Query User.findUnique took 6ms
Prisma Query User.create took 4ms
Prisma Query Product.findMany took 10ms
```

## Customize log output

Customize the logging middleware by providing your own `logger`, `logLevel` and `logMessage`.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule, loggingMiddleware, QueryInfo } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log', // default is `debug`
            logMessage: (query: QueryInfo) =>
              `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
          }),
        ],
      },
    }),
  ],
})
export class AppModule {}
```

The customized log messages are looking as follows.

```
[Nest] 51348  - 29/07/2022, 10:08:41     LOG [PrismaMiddleware] [Prisma Query] User.findUnique - 4ms
[Nest] 51348  - 29/07/2022, 10:08:50     LOG [PrismaMiddleware] [Prisma Query] User.create - 6ms
[Nest] 51348  - 29/07/2022, 10:09:13     LOG [PrismaMiddleware] [Prisma Query] Product.findMany - 9ms
```

Change the log level from your `.env` file using the [@nestjs/config](https://docs.nestjs.com/techniques/configuration) module. Add `PRISMA_QUERY_LOG_LEVEL` to your `.env` file with one of the log levels (`log`, `debug`, `warn`, `error`).

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule, loggingMiddleware, QueryInfo } from 'nestjs-prisma';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          middlewares: [
            loggingMiddleware({
              logger: new Logger('PrismaMiddleware'),
              logLevel: config.get('PRISMA_QUERY_LOG_LEVEL'),
            }),
          ],
          prismaOptions: { log: ['warn', 'error'] },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```
