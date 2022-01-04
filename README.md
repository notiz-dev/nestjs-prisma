# NestJS Prisma Library and Schematics

[![npm version](https://badge.fury.io/js/nestjs-prisma.svg)](https://www.npmjs.com/package/nestjs-prisma)
![Lib and Schematics CI](https://github.com/notiz-dev/nestjs-prisma/workflows/Node.js%20CI/badge.svg)

Add [Prisma](https://github.com/prisma/prisma) support to your [NestJS](https://github.com/nestjs/nest) application.

## Installation

```bash
nest add nestjs-prisma
```

Example output

```bash
✔ Package installation in progress... ☕
Starting library setup...
? Which datasource provider do you want to use for `prisma init`? postgresql
? Do you like to Dockerize your application? (Supports postgresql and mysql) Yes
    ✅️ Added prisma@latest
    ✅️ Added @prisma/client@latest
    ✅️ Added Prisma scripts [6]
    ✅️ Added Prisma Seed script
    ✅️ Added Docker file
    ✅️ Added Docker Compose and .env
    ✅️ Add "prisma" directory to "excludes" in tsconfig.build.json
CREATE .dockerignore (42 bytes)
CREATE Dockerfile (455 bytes)
CREATE .env (642 bytes)
CREATE docker-compose.yml (497 bytes)
UPDATE package.json (2754 bytes)
UPDATE tsconfig.build.json (130 bytes)
✔ Packages installed successfully.
✔ Packages installed successfully.
    ✅️ Initialized Prisma - Datasource postgresql
```

### Use `PrismaService` and `PrismaModule` provided by **nestjs-prisma**

Add `PrismaModule` to the `imports` section in your `AppModule` or other modules to gain access to `PrismaService`.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule.forRoot()],
})
export class AppModule {}
```

#### Shutdown Hook

Handle Prisma [shutdown](https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks) signal to shutdown your Nest application.

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
```

#### Prisma Middleware

Apply [Prisma Middlewares](https://www.prisma.io/docs/concepts/components/prisma-client/middleware) with `PrismaModule`

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { loggingMiddleware } from './logging-middleware';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [
          async (params, next) => {
            // Before query: change params
            const result = await next(params);
            // After query: result
            return result;
          },
        ], // see example loggingMiddleware below
      },
    }),
  ],
})
export class AppModule {}
```

Here is an example for using a [Logging middleware](https://www.prisma.io/docs/concepts/components/prisma-client/middleware/logging-middleware).

Create your Prisma Middleware and export it as a `function`

```ts
// src/logging-middleware.ts
import { Prisma } from '@prisma/client';

export function loggingMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    const before = Date.now();

    const result = await next(params);

    const after = Date.now();

    console.log(
      `Query ${params.model}.${params.action} took ${after - before}ms`,
    );

    return result;
  };
}
```

Now import your your Middleware and add the function into the `middlewares` array.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { loggingMiddleware } from './logging-middleware';

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

#### `PrismaModule` configuration

`PrismaModule` allows to be used [globally](https://docs.nestjs.com/modules#global-modules) and to pass options to the `PrismaClient`.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: { log: ['info'] },
        explicitConnect: true,
      },
    }),
  ],
})
export class AppModule {}
```

Additionally, `PrismaModule` provides a `forRootAsync` to pass options asynchronously. One option is to use a factory function:

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

Alternatively, you can use a class instead of a factory:

```ts
import { Module } from '@nestjs/common';
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
import { PrismaOptionsFactory, PrismaServiceOptions } from '.nestjs-prisma';

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

### Generate **custom** `PrismaService` and `PrismaModule`

```bash
nest add nestjs-prisma --addPrismaService
```

Add the flag `--addPrismaService` if you like to generate your own `PrismaService` and `PrismaModule` for further customizations. Add `PrismaModule` to the `imports` section in your `AppModule` or other modules to gain access to `PrismaService`.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
```

> **Note**: It is safe to remove `nestjs-prisma` as dependency otherwise you have two import suggestions for `PrismaService` and `PrismaModule`.

## PrismaClientExceptionFilter

`nestjs-prisma` provides an `PrismaClientExceptionFilter` to catch unhandled [PrismaClientKnownRequestError](https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine) and returning different status codes instead of `500 Internal server error`.

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

## Additional options

All available flags:

| Flag                     | Description                                                             | Type      | Default  |
| ------------------------ | ----------------------------------------------------------------------- | --------- | -------- |
| `datasourceProvider`     | Specifies the datasource provider for prisma init and docker.           | `boolean` | Prompted |
| `addDocker`              | Create a Dockerfile and docker-compose.yaml.                            | `boolean` | Prompted |
| `addPrismaService`       | Create a Prisma service extending the Prisma Client and module.         | `boolean` | `false`  |
| `dockerNodeImageVersion` | Node version for the builder and runner image.                          | `string`  | `14`     |
| `name`                   | The name for the Prisma service extending the Prisma Client and module. | `string`  | `Prisma` |
| `prismaVersion`          | The Prisma version to be installed.                                     | `string`  | `latest` |
| `skipInstall`            | Skip installing dependency packages.                                    | `boolean` | `false`  |
| `skipPrismaInit`         | Skip initializing Prisma.                                               | `boolean` | `false`  |

You can pass additional flags to customize the schematic. For example, if you want to install a different version for **Prisma** use `--prismaVersion` flag:

```bash
nest add nestjs-prisma --prismaVersion 3.2.1
```

If you want to skip installing dependencies use `--skipInstall` flag:

```bash
nest add nestjs-prisma --skipInstall
```

Add `Dockerfile` and `docker-compose.yaml`, you can even use a different `node` version (`14-alpine` or `16`).

> Currently uses to **PostgreSQL** as a default database in `docker-compose.yaml`.

```bash
nest add nestjs-prisma --addDocker --dockerNodeImageVersion 14-alpine
```

## Developing

Install `@angular-devkit/schematics-cli` to be able to use `schematics` command

```bash
npm i -g @angular-devkit/schematics-cli
```

Now build the schematics and run the schematic.

```bash
npm run build:schematics
# or
npm run dev:schematics

# dry-run
schematics .:nest-add

# execute schematics
schematics .:nest-add --debug false
# or
schematics .:nest-add --dry-run false
```

## Helpful

Helpful article about [Custom Angular Schematics](https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4) which also applies to Nest.
