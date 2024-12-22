import { Body, Controller, Post, Res } from '@nestjs/common';

import { Response } from 'express';

import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { DynamoDBAdapter } from 'src/infrastructure/dynamodb/dynamodb.adapter';
import { DynamoDBTransactionRepository } from 'src/infrastructure/transactions/dynamoDBClientTransactionRepository.adapter';
import { CreateTransactionInteractor } from '../interactor/ensureTransaction.interactor';

@Controller('api/transactions')
export class TransactionsController {
  constructor(private readonly dynamoDbAdapter: DynamoDBAdapter) {}

  @Post('create')
  async create(
    @Body() transaction: CreateTransactionDto,
    @Res() res: Response,
  ) {
    try {
      const transactionRepository = new DynamoDBTransactionRepository(
        this.dynamoDbAdapter,
      );

      const response = await new CreateTransactionInteractor(
        transactionRepository,
      ).execute(transaction);
      return res.status(response?.['code'] || 200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
