/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionsRepository } from '../../repository/transactionsRepository';
import { WalletRepository } from '../../repository/walletRepository';
import { TransactionsDtos } from './dtos/transactions.dtos';

@Injectable()
export class TransactionsService {
  private readonly transactionsRepository: TransactionsRepository;
  private readonly walletRepository: WalletRepository;

  constructor(
    database: TransactionsRepository,
    walletRepository: WalletRepository,
  ) {
    this.transactionsRepository = database;
    this.walletRepository = walletRepository;
  }

  private compareDecimals(a: string | number, b: unknown): boolean {
    const numA = Number(parseFloat(String(a)).toFixed(4));
    const numB = Number(parseFloat(String(b)).toFixed(4));
    return numA < numB;
  }

  async createTrasaction(data: TransactionsDtos): Promise<any> {
    const [walletFrom, walletTo] = await Promise.all([
      this.walletRepository.findById(data.wallet_id_from),
      this.walletRepository.findById(data.wallet_id_to),
    ]);
    if (!walletFrom) {
      throw new BadRequestException('Carteira de origem não encontrada');
    }
    if (!walletTo) {
      throw new BadRequestException('Carteira de destino não encontrada');
    }

    if (this.compareDecimals(walletFrom.amount, data.amount)) {
      throw new BadRequestException('Saldo insuficiente');
    }

    return await this.transactionsRepository.createTransaction(data);
  }
}
