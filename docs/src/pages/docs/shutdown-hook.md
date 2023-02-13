---
title: Shutdown Hook
layout: ../../layouts/Doc.astro
---

Handle [Prisma shutdown](https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks) to gracefully close your Nest application. Add the `enableShutdownHooks` of your Prisma Service in the `main.ts` file.

## PrismaService

Use `PrismaService` when Prisma Client uses the default output location.

```ts
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
```

## CustomPrismaService

Use `CustomPrismaService` when you configured a [custom Prisma Client location](/docs/custom-prisma-client-location) or [Prisma Client Extensions](/docs/prisma-client-extensions).

```ts
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomPrismaService } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma.extension';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const customPrismaService: CustomPrismaService<extendedPrismaClient> =
    app.get('PrismaService'); // 👈 use the same name as in app.module.ts
  await customPrismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
```

The `name` property for `CustomPrismaService` must be matching name used to register `CustomPrismaModule`.

```ts
// src/app.module.ts
import { Module } from '@nestjs/common';
import { CustomPrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { extendedPrismaClient } from './prisma.extension';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService', // 👈 must be the same name here
      useFactory: () => {
        return extendedPrismaClient;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```


