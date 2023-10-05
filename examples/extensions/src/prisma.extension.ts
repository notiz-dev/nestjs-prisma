import { Prisma, PrismaClient } from '@prisma/client';
import pagination from 'prisma-extension-pagination';
// used for Read Replicas example
import { readReplicas } from '@prisma/extension-read-replicas';

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
})
  // FIXME - `$on()` returns void
  // .$on('error', (e) => {})
  .$extends({
    model: {
      user: {
        findByEmail: async (email: string) => {
          console.log('extension findByEmail');
          return extendedPrismaClient.user.findFirstOrThrow({
            where: { email },
          });
        },
      },
    },
  })
  .$extends(pagination());
// Read Replicas example, change datasource prodiver (prisma/schema.prisma) to a supported database
// More details in the blog - https://www.prisma.io/blog/read-replicas-prisma-client-extension-f66prwk56wow
// .$extends(
//   readReplicas({
//     url: 'postgres://localhost:5432/prisma',
//   }),
// );

export type ExtendedPrismaClient = typeof extendedPrismaClient;
