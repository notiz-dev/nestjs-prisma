---
title: Basic Usage
---

## Prisma schema

`nestjs-prisma` requires the Prisma Client to be generated to the default output location (`./node_modules/.prisma/client`). The client will be imported from `@prisma/client`.

```prisma
// prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

If you like to choose a **different** output location or want to use **multiple** Prisma Client, you can [customize the Prisma Client location](/docs/custom-prisma-client-location).

## PrismaModule and PrismaService

Add `PrismaModule` to the `imports` section in your `AppModule` or other modules to gain access to `PrismaService`.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
```

[Configure](/docs/configuration) your `PrismaModule` by using either `forRoot(...)` or `forRootAsync(...)`.

Use the `PrismaService` via dependency injection in your controllers, resolvers, services, guards and more:

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
