---
title: Prisma Client Extensions
---

To use the new [Prisma Client Extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions) you must update to Prisma Client [v4.7.0](https://github.com/prisma/prisma/releases/tag/4.7.0) or later and install `nestjs-prisma@v0.20.0` or later.

Follow this guide or checkout the [extensions example](https://github.com/notiz-dev/nestjs-prisma/tree/main/examples/extensions).

## Prisma Extension

### Create Prisma Extension

Create a file for your Prisma extension for example `prisma.extension.ts`

```ts
import { PrismaClient } from '@prisma/client';

export const extendedPrismaClient = new PrismaClient().$extends({
  model: {
    user: {
      findByEmail: async (email: string) => {
        return extendedPrismaClient.user.findFirstOrThrow({ where: { email } });
      },
    },
  },
});

export type ExtendedPrismaClient = typeof extendedPrismaClient;
```

Export the type of your extended Prisma Client, this will be used for correct type-safety for your `CustomPrismaService`.

### Register Extended Prisma Client

Register your extended Prisma Client using `CustomPrismaModule.forRootAsync`.

#### useFactory

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma.extension';

@Module({
  imports: [
    // ✅ use `forRootAsync` when using `PrismaClient().$extends({})`
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient;
      },
    }),
    // ❌ error: 'getOwnPropertyDescriptor' on proxy
    // CustomPrismaModule.forRoot({
    //   name: 'PrismaServiceAuth',
    //   client: new PrismaClient().$extends({}),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

#### useClass

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CustomPrismaModule } from 'nestjs-prisma';
import { ExtendedPrismaConfigService } from './extended-prisma-config.service';

@Module({
  imports: [
    // ✅ use `forRootAsync` when using `PrismaClient().$extends({})`
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useClass: ExtendedPrismaConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Create the `ExtendedPrismaConfigService` and extend it with the `CustomPrismaClientFactory` and provide the type of your extended Prisma Client.

```ts
import { Injectable } from '@nestjs/common';
import { CustomPrismaClientFactory } from 'nestjs-prisma';
import {
  type ExtendedPrismaClient,
  extendedPrismaClient,
} from './prisma.extension';

@Injectable()
export class ExtendedPrismaConfigService
  implements CustomPrismaClientFactory<ExtendedPrismaClient>
{
  constructor() {
    // TODO inject any other service here like the `ConfigService`
  }

  createPrismaClient(): ExtendedPrismaClient {
    // you could pass options to your `PrismaClient` instance here
    return extendedPrismaClient;
  }
}
```

### Use Extended Prisma Client

Inject `CustomPrismaService` into your controller/service and use the extended Prisma Client for type-safety.

```ts
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { type ExtendedPrismaClient } from './prisma.extension';

@Injectable()
export class AppService {
  constructor(
    // ✅ use `ExtendedPrismaClient` type for correct type-safety of your extended PrismaClient
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  users() {
    return this.prismaService.client.user.findMany();
  }

  user(email: string) {
    // 🦾 use new `findByEmail`
    return this.prismaService.client.user.findByEmail(email);
  }
}
```

Now you have access to your extensions `this.prismaService.client.user.findByEmail(email)`.

## Extension Packages

Follow these examples to use Prisma Extension packages in your NestJS application.

### Pagination

Add pagination meta information to all or some Prisma models with [Prisma Pagination Extension](https://github.com/deptyped/prisma-extension-pagination).

Install the pagination extension package.

```bash
npm i prisma-extension-pagination
```

Now add the pagination extension to your Prisma Client for [all models](https://github.com/deptyped/prisma-extension-pagination#install-extension-to-all-models).

```ts
// prisma.extension.ts
import { PrismaClient } from '@prisma/client';
import pagination from 'prisma-extension-pagination';

// pagination for all models
export const extendedPrismaClient = new PrismaClient().$extends(pagination());

export type ExtendedPrismaClient = typeof extendedPrismaClient;
```

Follow the docs to [add pagination to specific models](https://github.com/deptyped/prisma-extension-pagination#install-extension-on-some-models), if you don't want to add pagination to all models.

[Register your extended Prisma Client](#register-extended-prisma-client) and use the new `paginate` function for your Prisma models.

```ts
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { type ExtendedPrismaClient } from './prisma.extension';

@Injectable()
export class AppService {
  constructor(
    // ✅ use `ExtendedPrismaClient` from extension for correct type-safety
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async usersPage() {
    // 🦾 use new `paginate` function
    const [users, meta] = await this.prismaService.client.user
      .paginate()
      .withPages({
        limit: 10,
        page: 1,
        includePageCount: true,
      });

    return {
      users,
      meta,
    };
  }
}
```

### Read Replica

Add [read replica](https://www.prisma.io/blog/read-replicas-prisma-client-extension-f66prwk56wow) support to your Prisma Client with [Prisma Read Replica Extension](https://github.com/prisma/extension-read-replicas).

Install the read replica extension package.

```bash
npm i @prisma/extension-read-replicas
```

Now add the read replica extension to your Prisma Client.

```ts
// prisma.extension.ts
import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';

export const extendedPrismaClient = new PrismaClient().$extends(
  // update url to your read replica url
  readReplicas({ url: 'postgresql://replica.example.com:5432/db' }),
);

export type ExtendedPrismaClient = typeof extendedPrismaClient;
```

[Register your extended Prisma Client](#register-extended-prisma-client) and while using `CustomPrismaService` all read operations, such as `findMany`, `findUnique` are forwarded to a database replica. All write operations, such as `create`, `update`, `delete` are forwarded to the primary database. To read from the primary database use `$primary()`, instead of accessing a read replica.

```ts
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { type ExtendedPrismaClient } from './prisma.extension';

@Injectable()
export class AppService {
  constructor(
    // ✅ use `ExtendedPrismaClient` type for correct type-safety of your extended PrismaClient
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  users() {
    // uses database replica
    return this.prismaService.client.user.findMany();
  }

  user(id: string) {
    // bypasses database replica and uses primary database
    return this.prismaService.client
      .$primary()
      .user.findUnique({ where: { id } });
  }

  add(email: string) {
    // uses primary database
    return this.prismaService.client.user.create({
      data: {
        email,
      },
    });
  }
}
```

## Enable preview feature (before version 4.16.0)

Enable `clientExtensions` preview in your Prisma schema and generate Prisma Client again.

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["clientExtensions"]
}

model User {
  id    String  @id @default(cuid())
  email String  @unique
  name  String?
}
```

## Type issues with Prisma Client v4.7.0

Change `declaration` to `false` in your `tsconfig.json` - workaround for https://github.com/prisma/prisma/issues/16536#issuecomment-1332055501

`The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.`
