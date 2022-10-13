import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  users() {
    return this.prisma.user.findMany();
  }

  user(userId: string) {
    // returns `null` if not found
    // return this.prisma.user.findUnique({
    //   where: { id: userId },
    // });
    // throws `Prisma.NotFoundError` if not found, use `PrismaClientExceptionFilter` to catch the exception
    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }
}
