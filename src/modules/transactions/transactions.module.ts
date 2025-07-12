import { Module } from '@nestjs/common';
import { TransactionsRepository } from '../../repository/transactionsRepository';
import { WalletRepository } from '../../repository/walletRepository';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  providers: [TransactionsService, TransactionsRepository, WalletRepository],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
