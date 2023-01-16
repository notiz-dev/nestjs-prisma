import { PrismaClient } from '@prisma/client';

export const extendedPrismaClient = new PrismaClient().$extends({
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
