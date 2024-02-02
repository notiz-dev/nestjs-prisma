---
title: Custom Prisma Client Location
---

Prisma allows you to [customize the output location](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client#the-location-of-prisma-client) of your Prisma Client.

```prisma
generator client {
  provider = "prisma-client-js"
  output = "../node_modules/@notiz/prisma"
}
```

For the schema above you would import `PrismaClient` from `@notiz/prisma` instead of the default `@prisma/client`.

```diff
-import { PrismaClient } from '@prisma/client';
+import { PrismaClient } from '@notiz/prisma';

const prisma = new PrismaClient();
```

This can be useful if you want to just use a **different location** or want to use **multiple** Prisma Clients in your project.

## CustomPrismaModule and CustomPrismaService

To use `nestjs-prisma` with custom output location for Prisma Client, you need to update to `nestjs-prisma@v0.20.0` or later and use `CustomPrismaModule` and `CustomPrismaService`.

Import `CustomPrismaModule` and provide a **unique** name and an **instance** of your `PrismaClient`. The unique name will be used to inject the `CustomPrismaService`.

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CustomPrismaModule } from 'nestjs-prisma';
import { PrismaClient } from '@notiz/prisma'; // 👈 update to your output directory

@Module({
  imports: [
    CustomPrismaModule.forRoot({
      name: 'PrismaServiceAuth', // 👈 must be unique for each PrismaClient
      client: new PrismaClient(), // create new instance of PrismaClient
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

The `PrismaClient` instance could also be used together with the new preview feature [Prisma Client extensions](/docs/prisma-client-extensions).

Use the `Inject` decorator with the **unique** name to inject `CustomPrismaService`. Additionally, `CustomPrismaService` requires you to specify the `PrismaClient` as generic for type-safety & auto-completion.

```ts
import { Inject, Injectable } from '@nestjs/common';

import { CustomPrismaService } from 'nestjs-prisma';
import { PrismaClient } from '@notiz/prisma'; // 👈 update to your output directory

@Injectable()
export class AppService {
  constructor(
    @Inject('PrismaServiceAuth') // 👈 use unique name to reference
    private prisma: CustomPrismaService<PrismaClient>, // specify PrismaClient for type-safety & auto-completion
  ) {}

  users() {
    return this.prisma.client.user.findMany();
  }

  user(userId: string) {
    return this.prisma.client.user.findFirstOrThrow({
      where: { id: userId },
    });
  }
}
```

You can use the auto generated queries from `PrismaClient` by accessing `client` property of `CustomPrismaService` e.g. `this.prisma.client.user.create({ data: ... });`

## Multiple Prisma Clients

If you have multiple Prisma Clients repeat the above steps for each client.

Important to register each Prisma Client with a unique name and the correct `PrismaClient` instance.

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CustomPrismaModule } from 'nestjs-prisma';
import { PrismaClient as PrismaAuth } from '@notiz/prisma'; // 👈 update to your output directory
import { PrismaClient as PrismaCms } from '@notiz/prisma-cms'; // 👈 update to your output directory

@Module({
  imports: [
    CustomPrismaModule.forRoot({
      name: 'PrismaServiceAuth', // 👈 must be unique for each PrismaClient
      client: new PrismaAuth(),
    }),
    CustomPrismaModule.forRoot({
      name: 'PrismaServiceCms', // 👈 must be unique for each PrismaClient
      client: new PrismaCms(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Import `CustomPrismaService` with the correct reference name and Prisma Client as type.

```ts
import { Inject, Injectable } from '@nestjs/common';

import { CustomPrismaService } from 'nestjs-prisma';
import { PrismaClient as PrismaAuth } from '@notiz/prisma'; // 👈 update to your output directory
import { PrismaClient as PrismaCms } from '@notiz/prisma-cms'; // 👈 update to your output directory

@Injectable()
export class AppService {
  constructor(
    @Inject('PrismaServiceAuth') // 👈 use unique name to reference
    private prismaAuth: CustomPrismaService<PrismaAuth>,
    @Inject('PrismaServiceCms') // 👈 use unique name to reference
    private prismaCms: CustomPrismaService<PrismaCms>,
  ) {}

  users() {
    return this.prismaAuth.client.user.findMany();
  }

  user(userId: string) {
    return this.prismaAuth.client.user.findFirstOrThrow({
      where: { id: userId },
    });
  }

  posts() {
    return this.prismaCms.client.post.findMany();
  }
}
```
