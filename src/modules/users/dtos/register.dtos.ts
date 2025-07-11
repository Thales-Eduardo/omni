import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDtos {
  @ApiProperty({
    example: 'username123',
  })
  @IsNotEmpty({ message: 'Necessário informar username' })
  @IsString({ message: 'O username deve ser string' })
  username: string;

  @ApiProperty({
    example: 'usuario@exemplo.com',
  })
  @IsNotEmpty({ message: 'Necessário informar email' })
  @IsString({ message: 'O email deve ser string' })
  @IsEmail({}, { message: 'O email deve ser válido' })
  email: string;

  @ApiProperty({
    example: 'changeme',
  })
  @IsNotEmpty({ message: 'Necessário informar senha' })
  @IsString({ message: 'A senha deve ser string' })
  @MinLength(6)
  password: string;
}
