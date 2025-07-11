/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { prismaClient } from '../database';
import { User } from '../entity/User';

interface CreateUserDtos {
  username: string;
  email: string;
  password: string;
  birthdate: string;
}

@Injectable()
export class UserRepository {
  private prismaClient: typeof prismaClient;

  constructor() {
    this.prismaClient = prismaClient;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaClient.user.findFirst({
      where: { email },
    });
    if (!user) {
      return null;
    }
    return new User({
      userId: user.id,
      username: user.name,
      email: user.email,
      birthdate: user.birthdate,
      password: user.password,
    });
  }

  async createUser(user: CreateUserDtos): Promise<string> {
    const result = await this.prismaClient.user.create({
      data: {
        name: user.username,
        email: user.email,
        birthdate: user.birthdate,
        password: user.password,
      },
    });

    return result.id;
  }

  async delete(userId: string): Promise<void> {
    await this.prismaClient.user.delete({
      where: { id: userId },
    });
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return null;
    }
    return new User({
      userId: user.id,
      username: user.name,
      email: user.email,
      birthdate: user.birthdate,
      password: user.password,
    });
  }

  async findAllUsers(): Promise<any[] | null> {
    const users = await this.prismaClient.user.findMany();
    if (!users) {
      return null;
    }
    return users.map((user) => {
      return {
        userId: user.id,
        username: user.name,
        email: user.email,
        birthdate: user.birthdate,
      };
    });
  }
}
