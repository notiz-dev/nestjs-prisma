import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class <%= classify(name) %>Service extends PrismaClient
  implements OnModuleInit {

  constructor() {
    super();
  }

  /**
   * The onModuleInit is optional — if you leave it out, Prisma will connect lazily on its first call to the database.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Read https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks for more info.
   */
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
