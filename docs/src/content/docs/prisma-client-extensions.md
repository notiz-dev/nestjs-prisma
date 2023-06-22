---
title: Prisma Client Extensions (Preview)
---

To use the new [Prisma Client Extensions (Preview)](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions) you must update to Prisma Client [v4.7.0](https://github.com/prisma/prisma/releases/tag/4.7.0) or later and install `nestjs-prisma@v0.20.0` or later.

Follow this guide or checkout the [extensions example](https://github.com/notiz-dev/nestjs-prisma/tree/main/examples/extensions).

## Enable preview feature

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

## Prisma Extension

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

export type extendedPrismaClient = typeof extendedPrismaClient;
```

Register your extended Prisma Client using `CustomPrismaModule.forRootAsync`.

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

Inject `CustomPrismaService` into your controller/service and use the extended Prisma Client for type-safety.

```ts
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma.extension';

@Injectable()
export class AppService {
  constructor(
    // ✅ use `extendedPrismaClient` type for correct type-safety of your extended PrismaClient
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<extendedPrismaClient>
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

## Type issues with Prisma Client v4.7.0

Change `declaration` to `false` in your `tsconfig.json` - workaround for https://github.com/prisma/prisma/issues/16536#issuecomment-1332055501

`The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.`
