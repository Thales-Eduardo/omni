import { Module } from '@nestjs/common';
import { UserRepository } from '../../repository/userRepository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, UserRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
