# NestJS Prisma Schematics

[![npm version](https://badge.fury.io/js/nestjs-prisma.svg)](https://www.npmjs.com/package/nestjs-prisma)

Add [Prisma](https://github.com/prisma/prisma) support to your [NestJS](https://github.com/nestjs/nest) application.

## Installation

```bash
nest add nestjs-prisma
```

Example output

```bash
▹▹▹▹▸ Package installation in progress... ☕
Starting library setup...
? Do you like to generate your own PrismaService for customizations? Yes
? Do you like to Dockerize your application? Yes
CREATE src/prisma/prisma.module.ts (192 bytes)
CREATE src/prisma/prisma.service.spec.ts (460 bytes)
CREATE src/prisma/prisma.service.ts (389 bytes)
CREATE .env (165 bytes)
CREATE Dockerfile (555 bytes)
CREATE docker-compose.yml (454 bytes)
UPDATE package.json (2260 bytes)
✔ Packages installed successfully.
✔ Packages installed successfully.
    Initialized Prisma
```

1. Use `PrismaService` and `PrismaModule` provided by **nestjs-prisma**

Answer the **first** question with **no** if you like to use the provided `PrismaService` and `PrismaModule`. Add `PrismaModule` to the `imports` section in your `AppModule` or other modules to gain access to `PrismaService`.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
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
|  `dockerNodeImageVersion` | Node version for the builder and runner image.                          | `string`  | `12`     |
|  `name`                   | The name for the Prisma service extending the Prisma Client and module. | `string`  | `Prisma` |
|  `prismaVersion`          | The Prisma version to be installed.                                     | `string`  | `latest` |
|  `skipInstall`            | Skip installing dependency packages.                                    | `boolean` | `false`  |
|  `skipPrismaInit`         | Skip initializing Prisma.                                               | `boolean` | `false`  |

You can pass additional flags to customize the schematic. For example, if you want to install a different version for **Prisma** use `--prismaVersion` flag:

```bash
nest add nestjs-prisma --prismaVersion 2.7.1
```

If you want to skip installing dependencies use `--skipInstall` flag:

```bash
nest add nestjs-prisma --skipInstall
```

Add `Dockerfile` and `docker-compose.yaml`, you can even use a different `node` version (`12-alpine` or `14`).

> Currently uses to **PostgreSQL** as a default database in `docker-compose.yaml`.

```bash
nest add nestjs-prisma --addDocker --dockerNodeImageVersion 12-alpine
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
