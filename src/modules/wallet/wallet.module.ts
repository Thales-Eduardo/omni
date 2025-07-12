import { Module } from '@nestjs/common';
import { WalletRepository } from '../../repository/walletRepository';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
})
export class WalletModule {}
