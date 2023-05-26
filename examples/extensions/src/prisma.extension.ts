import { Prisma, PrismaClient } from '@prisma/client';

export const extendedPrismaClient = new PrismaClient<
  Prisma.PrismaClientOptions,
  'query' | 'info' | 'warn' | 'error'
>({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
}).$extends({
  model: {
    user: {
      findByEmail: async (email: string) => {
        console.log('extension findByEmail');
        return extendedPrismaClient.user.findFirstOrThrow({ where: { email } });
      },
    },
  },
});

export type extendedPrismaClient = typeof extendedPrismaClient;
