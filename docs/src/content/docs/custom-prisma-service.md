---
title: Custom Prisma Service
---

Add the flag `--addPrismaService` if you like to generate your own `PrismaService` and `PrismaModule` for further customizations.

```bash
nest add nestjs-prisma -- --addPrismaService
```

Add `PrismaModule` to the `imports` section in your `AppModule` or other modules to gain access to `PrismaService`.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
```

**Note**: It is safe to remove `nestjs-prisma` as dependency otherwise you have two import suggestions for `PrismaService` and `PrismaModule`.
