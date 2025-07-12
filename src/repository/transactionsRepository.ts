import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prismaClient } from '../database';

interface CreateTransactionDTOs {
  wallet_id_from: string;
  wallet_id_to: string;
  amount: number;
}

@Injectable()
export class TransactionsRepository {
  private prismaClient: typeof prismaClient;

  constructor() {
    this.prismaClient = prismaClient;
  }

  async createTransaction(data: CreateTransactionDTOs): Promise<any> {
    return this.prismaClient.$transaction(
      async (prisma: typeof prismaClient) => {
        const walletFrom = await prisma.wallet.findUnique({
          where: { id: data.wallet_id_from },
          select: { amount: true },
        });
        if (!walletFrom) {
          throw new BadRequestException('Carteira de origem não encontrada');
        }
        const walletTo = await prisma.wallet.findUnique({
          where: { id: data.wallet_id_to },
        });
        if (!walletTo) {
          throw new BadRequestException('Carteira de destino não encontrada');
        }

        const saldoAtual = new Prisma.Decimal(walletFrom.amount);
        const valorTransacao = new Prisma.Decimal(data.amount);
        if (Number(saldoAtual) < Number(valorTransacao)) {
          throw new BadRequestException('Saldo insuficiente');
        }

        //atualizar saldo da carteira
        await prisma.wallet.update({
          where: { id: data.wallet_id_from },
          data: { amount: { decrement: data.amount } },
        });
        await prisma.wallet.update({
          where: { id: data.wallet_id_to },
          data: { amount: { increment: data.amount } },
        });

        return prisma.transactions.create({
          data: {
            wallet_id_from: data.wallet_id_from,
            wallet_id_to: data.wallet_id_to,
            amount: data.amount,
          },
        });
      },
    );
  }
}
