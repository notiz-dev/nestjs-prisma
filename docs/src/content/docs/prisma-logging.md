---
title: Prisma Event-based logging
---

To use Prisma [event-based logging](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/logging#event-based-logging) first specify the log level in `prismaOptions` of your `PrismaModule`:

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        prismaOptions: {
          log: [
            {
              emit: 'event',
              level: 'query',
            },
          ],
        },
      },
    }),
  ],
})
export class AppModule {}
```

Now use `$on()` via the `PrismaService` in `main.ts` to subscribe to all events.

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // log query events
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.$on('query', (event) => {
    console.log(event);
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```
