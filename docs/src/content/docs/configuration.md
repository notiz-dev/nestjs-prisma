---
title: Configuration
---

`PrismaModule` provides a `forRoot(...)` and `forRootAsync(..)` method. They accept an option object of `PrismaModuleOptions` for the [PrismaService](#prismaservice-options) and [PrismaClient](#prismaclient-options).

## PrismaService options

### isGlobal

If `true`, registers `PrismaModule` as a [global](https://docs.nestjs.com/modules#global-modules) module. `PrismaService`will be available everywhere.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
```

### prismaServiceOptions.explicitConnect

If `true`, `PrismaClient` explicitly creates a connection pool and your first query will respond instantly.

For most use cases the [lazy connect](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management) behavior of `PrismaClient` will do. The first query of `PrismaClient` creates the connection pool.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        explicitConnect: true,
      },
    }),
  ],
})
export class AppModule {}
```

## PrismaClient options

### prismaServiceOptions.prismaOptions

Pass `PrismaClientOptions` [options](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference/#prismaclient) directly to the `PrismaClient`.

### prismaServiceOptions.middlewares

Apply Prisma [middlewares](/docs/prisma-middleware) to perform actions before or after db queries.

## Async configuration

Additionally, `PrismaModule` provides a `forRootAsync` to pass options asynchronously.

### useFactory

One option is to use a factory function:

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: () => ({
        prismaOptions: {
          log: ['info', 'query'],
        },
        explicitConnect: false,
      }),
    }),
  ],
})
export class AppModule {}
```

You can inject dependencies such as `ConfigModule` to load options from .env files.

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          prismaOptions: {
            log: [configService.get('log')],
            datasources: {
              db: {
                url: configService.get('DATABASE_URL'),
              },
            },
          },
          explicitConnect: configService.get('explicit'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

### useClass

Alternatively, you can use a class instead of a factory:

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
  ],
})
export class AppModule {}
```

Create the `PrismaConfigService` and extend it with the `PrismaOptionsFactory`

```ts
import { Injectable } from '@nestjs/common';
import { PrismaOptionsFactory, PrismaServiceOptions } from 'nestjs-prisma';

@Injectable()
export class PrismaConfigService implements PrismaOptionsFactory {
  constructor() {
    // TODO inject any other service here like the `ConfigService`
  }

  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        log: ['info', 'query'],
      },
      explicitConnect: true,
    };
  }
}
```
