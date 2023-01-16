import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma.extension';

@Injectable()
export class AppService {
  constructor(
    // ✅ use `extendedPrismaClient` from extension for correct type-safety
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<extendedPrismaClient>,
  ) {}

  users() {
    return this.prismaService.client.user.findMany();
  }

  user(userId: string) {
    // 🦾 use new `findByEmail`
    return this.prismaService.client.user.findByEmail(userId);
    // return this.prisma.user.findFirstOrThrow({
    //   where: { id: userId },
    // });
  }
}
