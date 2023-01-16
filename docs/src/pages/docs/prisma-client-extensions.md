---
title: Prisma Client Extensions (Preview)
layout: ../../layouts/Doc.astro
---

To use the new [Prisma Client Extensions (Preview)](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions) you must update to Prisma Client [v4.7.0](https://github.com/prisma/prisma/releases/tag/4.7.0) or later and install `nestjs-prisma@v0.20.0-dev.2` or later.

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

/**
 * TS error: "Inferred type of this node exceeds the maximum length the compiler will serialize" with "declaration": true in tsconfig
 *
 * Change "declaration": false in `tsconfig.json`
 *
 * https://github.com/prisma/prisma/issues/16536#issuecomment-1332055501
 */
export const prismaClient = new PrismaClient().$extends({
  model: {
    user: {
      findByEmail: async (email: string) => {
        return prismaClient.user.findFirstOrThrow({ where: { email } });
      },
    },
  },
});

export type prismaClient = typeof prismaClient;
```

Use `CustomPrismaModule.forRootAsync`

```ts
import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { prismaClient } from './prisma.extension';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useFactory: () => {
        return prismaClient;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Inject `CustomPrismaService` into your controller/service

```ts
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { prismaClient } from './prisma.extension';

@Injectable()
export class AppService {
  constructor(
    // ✅ use `prismaClient` from extension for correct type-safety
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<prismaClient>
  ) {}

  users() {
    return this.prismaService.client.user.findMany();
  }

  user(userId: string) {
    // 🦾 use new `findByEmail`
    return this.prismaService.client.user.findByEmail(userId);
  }
}
```

## Type issues with Prisma Client v4.7.0

Change `declaration` to `false` in your `tsconfig.json` - workaround for https://github.com/prisma/prisma/issues/16536#issuecomment-1332055501

`The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.`