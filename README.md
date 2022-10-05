<h1 align="center">nestjs-prisma</h1>

<p align="center">
    Easy <a href="https://github.com/prisma/prisma" target="_blank" rel="noopener">Prisma</a> support for your <a href="https://github.com/nestjs/nest" target="_blank" rel="noopener">NestJS</a> application.
</p>

<p align="center">
  <a href="https://github.com/notiz-dev/nestjs-prisma/actions/workflows/node.js.yml" target="_blank" rel="noopener">
    <img src="https://github.com/notiz-dev/nestjs-prisma/actions/workflows/node.js.yml/badge.svg?branch=main"alt="Build Status"/>
  </a>
  <a href="https://www.npmjs.com/package/nestjs-prisma" target="_blank" rel="noopener">
    <img src="https://img.shields.io/npm/dt/nestjs-prisma.svg" alt="Total Downloads" />
  </a>
  <a href="https://www.npmjs.com/package/nestjs-prisma" target="_blank" rel="noopener">
    <img src="https://img.shields.io/npm/v/nestjs-prisma.svg" alt="npm package"/>
  </a>
  <a href="https://github.com/notiz-dev/nestjs-prisma/blob/main/LICENSE" target="_blank" rel="noopener">
    <img src="https://img.shields.io/npm/l/nestjs-prisma.svg" alt="License">
  </a>
</p>

## Installation

Install the library:

```bash
# npm
npm install nestjs-prisma

# yarn
yarn add nestjs-prisma
```

or install it automatically using the [schematics command](https://docs.nestjs.com/cli/usages#nest-add):

```bash
nest add nestjs-prisma
```

Besides installing the library, the [schematics](#schematics) allows to configure Prisma, Docker and even a custom `PrismaService`.

## Basic usage

Add `PrismaModule` to the `imports` section in your `AppModule` or other modules to gain access to `PrismaService`.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule.forRoot()],
})
export class AppModule {}
```

Use the `PrismaService` via dependency injection in your controller, resolver, services, guards and more:

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  users() {
    return this.prisma.user.findMany();
  }

  user(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
```

You have access to all exposed methods and arguments of the generated `PrismaClient` through `PrismaService`.

## Documentation

## Contributing

You are welcome to contribute to this project.

The code is split up into three directories:

```
+-- docs
+-- lib
+-- schematics
```

The `docs` directory contains an astro website and the [docs content](./docs/src/pages/docs) pages.

The `lib` directory contains everything exposed by `nestjs-prisma` as a library.

The `schematics` directory contains the blue prints for installing the library with the schematic command.

Here are some tips if you like to make changes to the schematics.

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

Helpful article about [Custom Angular Schematics](https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4) which also applies to Nest.
