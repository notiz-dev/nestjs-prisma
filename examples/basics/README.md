# Basics

NestJS app with Express, Prisma and nestjs-prisma.

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

Use `PrismaService` to access the type-safe generated `PrismaClient`.

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
