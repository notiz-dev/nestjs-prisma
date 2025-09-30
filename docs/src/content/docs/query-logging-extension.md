---
title: Query Logging Extension
---

Create a PrismaClient extension to log all queries performed by the PrismaClient.

## Add query logging extension

Prisma provides an example for [Prisma Client Extension - Query Logging](https://github.com/prisma/prisma-client-extensions/tree/main/query-logging). You need to create a new `PrismaClient` instance with `$extends` where you will define the query logging extension. 

```ts
// prisma.extension.ts
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const logger = new Logger('PrismaClient');

export const extendedPrismaClient = new PrismaClient().$extends({
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }) {
        const start = performance.now();
        const result = await query(args);
        const end = performance.now();
        const time = Math.ceil((end - start) * 100) / 100;
        // adjust logging behavior to your needs
        logger.log(`Prisma Query ${model}.${operation} took ${time}ms`);
        return result;
      },
    },
  },
});

export const ExtendedPrismaClient = typeof extendedPrismaClient;
```

Now you need to register and inject the `CustomPrismaService` with your `extendedPrismaClient`. Read more about [Prisma Client Extensions](/docs/prisma-client-extensions).

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Inject the `CustomPrismaService` with the `ExtendedPrismaClient` type, useful when adding [custom methods](http://localhost:4321/docs/prisma-client-extensions#create-prisma-extension) to your models.

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
}
```

You will see now for the log messages in your terminal

```bash
Prisma Query User.findMany took 10ms
...
```

## Query Logging extension function

Extract the query logging extension as shareable extension by following [Create a shareable extension](https://www.prisma.io/docs/orm/prisma-client/client-extensions/shared-extensions#create-a-shareable-extension).

```ts
// query-logger.extension.ts
import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const queryLoggingExtension = (logger: Logger) =>
  Prisma.defineExtension({
    name: 'prisma-extension-query-logger',
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          const start = performance.now();
          const result = await query(args);
          const end = performance.now();
          const time = Math.ceil((end - start) * 100) / 100;
          logger.log(`Prisma Query ${model}.${operation} took ${time}ms`);
          return result;
        },
      },
    },
  });
```

Now you can import and use `queryLoggingExtension(new Logger(...))` in `$extends(...)`. 

```ts
// prisma.extension.ts
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { queryLoggingExtension } from './query-logger.extension';

const logger = new Logger('PrismaClient');

export const extendedPrismaClient = new PrismaClient().$extends(
  queryLoggingExtension(logger),
);

export const ExtendedPrismaClient = typeof extendedPrismaClient;
```

Make sure to register and inject the `CustomPrismaService` described above.

## Example

The [Extensions](https://github.com/notiz-dev/nestjs-prisma/blob/main/examples/extensions/src/query-logging.extension.ts) example on GitHub includes the `query-logging.extension.ts`.
