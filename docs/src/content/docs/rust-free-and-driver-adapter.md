---
title: Rust-free and driver adapter
---

> Rust-free Prisma Client is Generally Available with [v6.16.0](https://github.com/prisma/prisma/releases/tag/6.16.0).

Learn how to use the new `prisma-client` provider with a custom output path and adapter driver. For more information see the [No Rust engine](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/no-rust-engine) guide on Prisma docs. 

Make sure you have `prisma` and `@prisma/client` v6.16.0 or later installed.

## Configure Rust-free Prisma Client

Configure your Prisma schema to use the new `prisma-client` provider and set a output directory. You can include the output directory in git, because it doesn't contain the rust query engine binary. 

```prisma
// prisma/schema.prisma
generator client {
  provider     = "prisma-client"
  output       = "../src/generated/prisma"
  engineType   = "client"
  moduleFormat = "cjs"
}

datasource db {
  provider = "sqlite"
  url      = "file:dev.db"
}
```

Read more about additional [fields](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#fields-for-prisma-client-provider) for the `prisma-client` provider.

Add your models to the `schema.prisma`, run `npx prisma generate` and run the prisma migration `npx prisma migrate dev`.

### Prisma config (optional)

Add at the root level the `prisma.config.ts` to [configure](https://www.prisma.io/docs/orm/reference/prisma-config-reference) the Prisma CLI for commands like `migrate`, `seed`.

```ts
// prisma.config.ts
import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: {
    path: './prisma/migrations',
    seed: 'tsx ./prisma/seed.ts',
  },
});
```

### Install driver adapter

You need to [install a driver adapter](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/no-rust-engine#3-install-the-driver-adapter) depending on your database.

For the example, use install the driver adatper for SQLite.

```bash
npm install @prisma/adapter-better-sqlite3
```

### Prisma Client instance

Now create a `PrismaClient` instance from your custom output and configure the driver adapter.

```ts
// src/prisma.extension.ts
import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from './generated/prisma/client';

const adapter = new PrismaBetterSQLite3({ url: 'file:./prisma/dev.db' });
export const prisma = new PrismaClient({ adapter });

export type PrismaClientType = typeof prisma;
```

You can also use `process.env.DATABASE_URL` for setting the url in the adapter.

### Seed database

Add `seed.ts` in your prisma directory and reuse the prisma client instance for seeding your development environment.

```ts
// prisma/seed.ts
// reuse the prisma client instance
import { prisma } from '../src/prisma.extension';

async function main() {
  console.log('Seeding database...');
  console.time('Seeding complete 🌱');

  // TODO seed development data

  console.timeEnd('Seeding complete 🌱');
}

main().catch((e) => console.log(e));
```

## Use Rust-free Prisma Client

Register your `prisma` instance with the `CustomPrismaModule`.

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomPrismaModule } from 'nestjs-prisma/dist/custom';
import { prisma } from './prisma.extension';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useFactory: () => {
        return prisma;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Query your database by injecting `CustomPrismaService` with your `PrismaClientType`. You have full access to the Prisma Client with `this.prismaService.client`.

```ts
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma/dist/custom';
import { PrismaClientType } from './prisma.extension';

@Injectable()
export class AppService {
  constructor(
    // ✅ use `ExtendedPrismaClient` from extension for correct type-safety
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<PrismaClientType>,
  ) {}

  users() {
    return this.prismaService.client.user.findMany();
  }
}
```

## Example

Checkout the [Rust-free and driver adapter](https://github.com/notiz-dev/nestjs-prisma/blob/main/examples/extensions/src/query-logging.extension.ts) example on GitHub.