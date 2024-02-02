import { Inject, Injectable } from '@nestjs/common';
import { PrismaClientLike } from './custom-prisma-options';
import { CUSTOM_PRISMA_CLIENT } from './custom-prisma.constants';

@Injectable()
export class CustomPrismaService<Client extends PrismaClientLike> {
  constructor(
    @Inject(CUSTOM_PRISMA_CLIENT)
    public client: Client,
  ) {}
}
