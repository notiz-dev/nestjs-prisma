import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
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

  async usersPage() {
    const [users, meta] = await this.prismaService.client.user
      .paginate()
      .withPages({
        limit: 10,
        page: 1,
        includePageCount: true,
      });

    return {
      users,
      meta,
    };
  }

  user(email: string) {
    // 🦾 use new `findByEmail`
    return this.prismaService.client.user.findByEmail(email);
  }
}
