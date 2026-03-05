import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import type { BasePrismaClient } from '../prisma-client';

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaService')
    // Use `BasePrismaClient` for correct type-safety
    private prisma: PrismaService<BasePrismaClient>,
  ) {}

  user(email: string) {
    // 🦾 use new `findByEmail`
    return this.prisma.client.user.findByEmail(email);
  }

  async userExists(email: string) {
    // 🦾 use new `exists` method on all models
    const exists = await this.prisma.client.user.exists({ email });
    return { exists };
  }
}
