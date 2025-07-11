import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDtos {
  @ApiProperty({
    example: 'usuario@exemplo.com',
  })
  @IsNotEmpty({ message: 'Necessário informar email' })
  @IsString({ message: 'O email deve ser string' })
  email: string;

  @ApiProperty({
    example: 'changeme',
  })
  @IsNotEmpty({ message: 'Necessário informar senha' })
  @IsString({ message: 'A senha deve ser string' })
  password: string;
}
