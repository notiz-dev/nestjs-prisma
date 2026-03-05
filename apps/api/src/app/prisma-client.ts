import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { Prisma, PrismaClient } from './generated/prisma/client';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });

export const prismaClient = new PrismaClient({
  adapter,
  log: ['query'],
}).$extends({
  model: {
    $allModels: {
      async exists<T>(this: T, where: Prisma.Args<T, 'findFirst'>['where']) {
        const context = Prisma.getExtensionContext(this);

        const result = await (context as any).findFirst({ where });
        return result !== null;
      },
    },
    user: {
      findByEmail: async (email: string) => {
        return prismaClient.user.findFirstOrThrow({
          where: { email },
        });
      },
    },
  },
});

export type BasePrismaClient = typeof prismaClient;
