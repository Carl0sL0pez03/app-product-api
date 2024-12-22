import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

import { CreateTransactionDto } from '../dto/create-transaction.dto';

export interface ITransactionRepository {
  createTransaction(
    transaction: CreateTransactionDto,
  ): Promise<PutItemCommandOutput>;
}
