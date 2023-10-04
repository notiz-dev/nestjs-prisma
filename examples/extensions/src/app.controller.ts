import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  users() {
    return this.appService.users();
  }

  @Get('page')
  usersPage() {
    return this.appService.usersPage();
  }

  /**
   *
   * http://localhost:3000/ham@burger.dev
   *
   * @param email
   * @returns
   */
  @Get(':email')
  user(@Param('email') email: string) {
    return this.appService.user(email);
  }
}
