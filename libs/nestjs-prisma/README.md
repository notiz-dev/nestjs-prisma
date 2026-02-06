# nestjs-prisma

The nestjs-prisma library simplifies the usage of Prisma within NestJS applications.

1. Install nestjs-prisma

```bash
# npm
npm install nestjs-prisma

# pnpm
pnpm add nestjs-prisma

# yarn
yarn add nestjs-prisma
```

[Prerequisites](https://nestjs-prisma.dev/getting-started/installation/#prerequisites) is to install [Prisma](https://www.prisma.io/docs/getting-started) and choose a database [adapter](https://www.prisma.io/docs/getting-started#-already-have-your-own-database).

2. Create a `src/app/prisma-client.ts` file and create an instance of the Prisma Client.

```ts
// src/app/prisma-client.ts
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { Prisma, PrismaClient } from './generated/prisma/client';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
export const prismaClient = new PrismaClient({ adapter });

export type BasePrismaClient = typeof prismaClient;
```

3. Configure the `PrismaModule` in your `AppModule` imports and import `prisma-client` from `prisma-client.ts`.

```ts
// src/app/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { prismaClient } from './prisma-client';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      name: 'PrismaService', // 👈 must be unique for each PrismaClient
      useFactory: () => {
        return prismaClient;
      },
    }),
  ],
})
export class AppModule {}
```

4. Inject `PrismaService` into your controllers or services providing the `BasePrismaClient` type from step 2.

```ts
//
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import type { BasePrismaClient } from './prisma-client';

@Injectable()
export class AppService {
  constructor(
    @Inject('PrismaService') // 👈 use unique name to reference
    // Use `BasePrismaClient` for correct type-safety
    private prisma: PrismaService<BasePrismaClient>,
  ) {}

  users() {
    // access prisma.client.* for your queries
    return this.prisma.client.user.findMany();
  }
}
```