import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

import { DynamoDBAdapter } from '../dynamodb/dynamodb.adapter';

import { ITransactionRepository } from '../../application/transactions/ports/transactionRepository.ports';
import { CreateTransactionDto } from '../../application/transactions/dto/create-transaction.dto';
import { dateFunctionSave } from '../../function/dateFunction';
import { StateTransactions } from '../../constant/stateTransactions.constant';

export class DynamoDBTransactionRepository implements ITransactionRepository {
  constructor(private dynamoDBAdapter: DynamoDBAdapter) {}

  async createTransaction(
    transaction: CreateTransactionDto,
  ): Promise<PutItemCommandOutput> {
    const newTransaction = {
      _id: uuidv4(),
      products: transaction.products,
      valueProducts: transaction.valueProducts,
      numberTransaction: uuidv4(),
      creatorName: transaction.creatorName,
      createdAt: dateFunctionSave(new Date())?.toISOString(),
      state: StateTransactions.PENDING,
      wasSuccessfulPayment: false,
    };

    return await this.dynamoDBAdapter.putItem(newTransaction, 'Transactions');
  }
}
