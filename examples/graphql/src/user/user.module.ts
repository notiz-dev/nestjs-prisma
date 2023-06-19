import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserResolver, UserService],
})
export class UserModule {}
