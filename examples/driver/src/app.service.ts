import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma/dist/custom';
import { PrismaClientType } from './prisma.extension';

@Injectable()
export class AppService {
  constructor(
    // ✅ use `ExtendedPrismaClient` from extension for correct type-safety
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<PrismaClientType>,
  ) {}

  users() {
    return this.prismaService.client.user.findMany();
  }
}
