# PrismaClient Extension

NestJS app with PrismaClient Extension and nestjs-prisma.

Adjust `prisma/schema.prisma` and perform a migration:

```sh
npx prisma migrate dev
```

Seed the example database:

```sh
npx prisma db seed
```

Start the Nest app and open [localhost:3000](http://localhost:3000).

```sh
npm i

npm run start:dev
```

Use `CustomPrismaService` to access the type-safe generated `PrismaClient` and use the extensions.

```ts
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { type ExtendedPrismaClient } from './prisma.extension';

@Injectable()
export class AppService {
  constructor(
    // ✅ use `ExtendedPrismaClient` from extension for correct type-safety
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  users() {
    return this.prismaService.client.user.findMany();
  }

  async usersPage() {
    const [users, meta] = await this.prismaService.client.user
      .paginate()
      .withPages({
        limit: 10,
        page: 1,
        includePageCount: true,
      });

    return {
      users,
      meta,
    };
  }

  user(email: string) {
    // 🦾 use new `findByEmail`
    return this.prismaService.client.user.findByEmail(email);
  }
}
```

Open users page endpoint [localhost:3000/page](http://localhost:3000/page).