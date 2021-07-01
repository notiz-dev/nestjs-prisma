# NestJS Prisma Schematics

[![npm version](https://badge.fury.io/js/nestjs-prisma.svg)](https://www.npmjs.com/package/nestjs-prisma)
![Lib and Schematics CI](https://github.com/marcjulian/nestjs-prisma/workflows/Node.js%20CI/badge.svg)

Add [Prisma](https://github.com/prisma/prisma) support to your [NestJS](https://github.com/nestjs/nest) application.

## Installation

```bash
nest add nestjs-prisma
```

Example output

```bash
✔ Package installation in progress... ☕
Starting library setup...
? Do you like to generate your own PrismaService for customizations? No
? Do you like to Dockerize your application? Yes
? Which datasource provider do you want to use for `prisma init`? sqlite
    ✅️ Added prisma@2.26.0
    ✅️ Added @prisma/client@2.26.0
    ✅️ Added Prisma scripts [6]
    ✅️ Added Docker files
    ✅️ Add "prisma" directory to "excludes" in tsconfig.build.json
CREATE .dockerignore (42 bytes)
CREATE .env (192 bytes)
CREATE Dockerfile (455 bytes)
CREATE docker-compose.yml (474 bytes)
UPDATE package.json (2380 bytes)
UPDATE tsconfig.build.json (130 bytes)
✔ Packages installed successfully.
✔ Packages installed successfully.
    ✅️ Initialized Prisma - Datasource sqlite
```

1. Use `PrismaService` and `PrismaModule` provided by **nestjs-prisma**

Answer the **first** question with **no** if you like to use the provided `PrismaService` and `PrismaModule`. Add `PrismaModule` to the `imports` section in your `AppModule` or other modules to gain access to `PrismaService`.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule.forRoot()],
})
export class AppModule {}
```

`PrismaModule` allows to be used globally and to pass options to the `PrismaClient`.

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

2. Generate your **own** `PrismaService` and `PrismaModule`

Answer the **first** question with **yes** if you like to generate your own `PrismaService` and `PrismaModule` for further customizations. Add `PrismaModule` to the `imports` section in your `AppModule` or other modules to gain access to `PrismaService`.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
```

> **Note**: It is safe to remove `nestjs-prisma` as dependency otherwise you have two import suggestions for `PrismaService` and `PrismaModule`.

## Additional options

All available flags:

| Flag                      |  Description                                                            | Type      |  Default |
| ------------------------- | ----------------------------------------------------------------------- | --------- | -------- |
|  `addPrismaService`       | Create a Prisma service extending the Prisma Client and module.         | `boolean` | Prompted |
|  `addDocker`              | Create a Dockerfile and docker-compose.yaml.                            | `boolean` | `false`  |
|  `dockerNodeImageVersion` | Node version for the builder and runner image.                          | `string`  | `14`     |
|  `name`                   | The name for the Prisma service extending the Prisma Client and module. | `string`  | `Prisma` |
|  `prismaVersion`          | The Prisma version to be installed.                                     | `string`  | `latest` |
|  `skipInstall`            | Skip installing dependency packages.                                    | `boolean` | `false`  |
|  `skipPrismaInit`         | Skip initializing Prisma.                                               | `boolean` | `false`  |

You can pass additional flags to customize the schematic. For example, if you want to install a different version for **Prisma** use `--prismaVersion` flag:

```bash
nest add nestjs-prisma --prismaVersion 2.20.1
```

If you want to skip installing dependencies use `--skipInstall` flag:

```bash
nest add nestjs-prisma --skipInstall
```

Add `Dockerfile` and `docker-compose.yaml`, you can even use a different `node` version (`14-alpine` or `15`).

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
