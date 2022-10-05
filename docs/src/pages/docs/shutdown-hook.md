---
title: Shutdown Hook
layout: ../../layouts/Doc.astro
---

Handle Prisma [shutdown](https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks) signal to shutdown your Nest application.

```ts
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
