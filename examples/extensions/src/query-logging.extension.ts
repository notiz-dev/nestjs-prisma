import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const queryLoggingExtension = (logger: Logger) =>
  Prisma.defineExtension({
    name: 'prisma-extension-query-logger',
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          const start = performance.now();
          const result = await query(args);
          const end = performance.now();
          const time = Math.ceil((end - start) * 100) / 100;
          logger.log(`Prisma Query ${model}.${operation} took ${time}ms`);
          return result;
        },
      },
    },
  });
