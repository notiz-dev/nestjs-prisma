import { PrismaClientLike } from './custom-prisma-options';
import { INestApplicationContext, Injectable } from '@nestjs/common';

@Injectable()
export class CustomPrismaService<Client extends PrismaClientLike> {
  constructor(public client: Client) {}

  async enableShutdownHooks(app: INestApplicationContext) {
    this.client.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
