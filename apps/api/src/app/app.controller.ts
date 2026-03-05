import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './generated/prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  users(): Promise<User[]> {
    return this.appService.users();
  }

  @Get(':email')
  userByEmail(@Param('email') email: string) {
    return this.appService.userByEmail(email);
  }
}
