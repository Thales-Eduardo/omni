/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { WalletRepository } from '../../repository/walletRepository';

@Injectable()
export class WalletService {
  private readonly walletRepository: WalletRepository;

  constructor(database: WalletRepository) {
    this.walletRepository = database;
  }

  async create(user_id: string): Promise<void> {
    const wallet = await this.walletRepository.findById(user_id);

    if (wallet) {
      throw new BadRequestException('Esse usuário já tem uma carteira');
    }

    return await this.walletRepository.createWallet(user_id);
  }
}
