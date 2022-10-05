# Fastify

NestJS app with Fastify, Prisma and nestjs-prisma.

```sh
npm i

npm run start:dev
```

Adjust `prisma/schema.prisma` and perform a migration:

```sh
npx prisma migrate dev
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
