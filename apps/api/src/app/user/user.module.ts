import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { prismaClient } from '../prisma-client';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      name: 'PrismaService',
      useFactory: () => {
        return prismaClient;
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
