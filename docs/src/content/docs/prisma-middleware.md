---
title: Prisma Middleware
---

Apply [Prisma Middlewares](https://www.prisma.io/docs/concepts/components/prisma-client/middleware) with `PrismaModule`

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [
          async (params, next) => {
            // Before query: change params
            const result = await next(params);
            // After query: result
            return result;
          },
        ], // see example loggingMiddleware below
      },
    }),
  ],
})
export class AppModule {}
```

Here is an example for using a [Logging middleware](https://www.prisma.io/docs/concepts/components/prisma-client/middleware/logging-middleware).

Create your Prisma Middleware and export it as a `function`

```ts
// src/logging-middleware.ts
import { Prisma } from '@prisma/client';

export function loggingMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    const before = Date.now();

    const result = await next(params);

    const after = Date.now();

    console.log(
      `Query ${params.model}.${params.action} took ${after - before}ms`,
    );

    return result;
  };
}
```

Now import your middleware and add the function into the `middlewares` array.

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { loggingMiddleware } from './logging-middleware';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),
  ],
})
export class AppModule {}
```

Try out the built in [Logging Middleware](/docs/logging-middleware).
