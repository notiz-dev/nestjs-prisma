import { Inject, Injectable } from '@nestjs/common';
import { PrismaClientLike } from './prisma-options';
import { PRISMA_CLIENT } from './prisma.constants';

@Injectable()
export class PrismaService<Client extends PrismaClientLike> {
  constructor(
    @Inject(PRISMA_CLIENT)
    public client: Client,
  ) {}
}
