import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransactionsDtos {
  @IsNotEmpty({ message: 'Necessário informar wallet_id_from' })
  @IsString({ message: 'A wallet_id_from deve ser string' })
  wallet_id_from: string;

  @IsNotEmpty({ message: 'Necessário informar wallet_id_to' })
  @IsString({ message: 'A wallet_id_to deve ser string' })
  wallet_id_to: string;

  @IsNotEmpty({ message: 'Necessário informar amount' })
  @IsNumber()
  amount: number;
}
