import { Injectable } from '@nestjs/common';
import { prismaClient } from '../database';
import { User } from '../entity/User';

interface CreateUserDtos {
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: { email },
    });
    if (!user) {
      return null;
    }
    return new User({
      userId: user.id,
      username: user.name,
      email: user.email,
      password: user.password,
    });
  }

  async createUser(user: CreateUserDtos): Promise<void> {
    await prismaClient.user.create({
      data: {
        name: user.username,
        email: user.email,
        password: user.password,
      },
    });
  }

  async delete(userId: string): Promise<void> {
    await prismaClient.user.delete({
      where: { id: userId },
    });
  }

  async findById(userId: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return null;
    }
    return new User({
      userId: user.id,
      username: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
