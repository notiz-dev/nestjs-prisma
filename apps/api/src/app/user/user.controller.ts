import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *
   * http://localhost:3000/<email>
   *
   * @param email
   * @returns
   */
  @Get(':email')
  user(@Param('email') email: string) {
    return this.userService.user(email);
  }

  /**
   *
   * http://localhost:3000/<email>/exists
   *
   * @param email
   * @returns
   */
  @Get(':email/exists')
  userExists(@Param('email') email: string) {
    return this.userService.userExists(email);
  }
}
