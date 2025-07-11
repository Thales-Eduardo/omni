import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { User } from '../../entity/User';
import { UserRepository } from '../../repository/userRepository';
import { RegisterDtos } from './dtos/register.dtos';

@Injectable()
export class UsersService {
  private readonly userRepository: UserRepository;

  constructor(database: UserRepository) {
    this.userRepository = database;
  }

  async create(user: RegisterDtos): Promise<void> {
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists) {
      throw new BadRequestException('Email already exists');
    }

    const password = await hash(user.password, 8);
    user.password = password;

    await this.userRepository.createUser({
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }

  async findOneAuth(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async delete(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepository.delete(userId);
  }
}
