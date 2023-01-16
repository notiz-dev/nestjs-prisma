import { PrismaClientLike } from './custom-prisma-options';
import { INestApplicationContext, Inject, Injectable } from '@nestjs/common';
import { CUSTOM_PRISMA_CLIENT } from './custom-prisma.constants';

@Injectable()
export class CustomPrismaService<Client extends PrismaClientLike> {
  constructor(
    @Inject(CUSTOM_PRISMA_CLIENT)
    public client: Client,
  ) {}

  async enableShutdownHooks(app: INestApplicationContext) {
    this.client.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
