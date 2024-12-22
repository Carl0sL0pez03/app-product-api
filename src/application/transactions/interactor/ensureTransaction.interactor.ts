import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { ITransactionRepository } from '../ports/transactionRepository.ports';

export class CreateTransactionInteractor {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(
    transactionDto: CreateTransactionDto,
  ): Promise<PutItemCommandOutput> {
    return await this.transactionRepository.createTransaction(transactionDto);
  }
}
