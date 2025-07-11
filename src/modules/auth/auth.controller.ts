/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from './auth.service';
import { AuthDtos } from './dtos/auth.dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body(ValidationPipe) signInDto: AuthDtos): Promise<any> {
    return await this.authService.signIn(signInDto);
  }

  //para pegar o id do user logado
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Request() req): Promise<any> {
    return req.user;
  }
}
