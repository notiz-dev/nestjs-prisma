---
title: Basic Usage
layout: ../../layouts/Blog.astro
---

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
