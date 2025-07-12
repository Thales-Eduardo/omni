import { Injectable } from '@nestjs/common';
import { prismaClient } from '../database';

@Injectable()
export class WalletRepository {
  private prismaClient: typeof prismaClient;

  constructor() {
    this.prismaClient = prismaClient;
  }

  async createWallet(user_id: string): Promise<any> {
    const result = await this.prismaClient.wallet.create({
      data: {
        user_id: user_id,
      },
    });

    return {
      user_id: user_id,
      wallet_id: result.id,
    };
  }

  async findById(wallet_id: string): Promise<any> {
    const wallet = await this.prismaClient.wallet.findUnique({
      where: { id: wallet_id },
    });
    if (!wallet) {
      return null;
    }

    return wallet;
  }
}
