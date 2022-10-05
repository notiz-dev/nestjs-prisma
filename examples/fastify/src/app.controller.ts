import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto)
  }

  @Get()
  users(): Promise<User[]> {
    return this.appService.users();
  }

  @Get(':userId')
  user(@Param('userId') userId: string): Promise<User> {
    return this.appService.user(userId);
  }
}
