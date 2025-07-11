import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDtos } from './dtos/register.dtos';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body(ValidationPipe) registerDtos: RegisterDtos,
  ): Promise<void> {
    await this.usersService.create(registerDtos);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:user_id')
  async delete(@Param('user_id') user_id: string): Promise<void> {
    await this.usersService.delete(user_id);
  }
}
