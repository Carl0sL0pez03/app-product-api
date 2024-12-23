import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';

import { Response } from 'express';

import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { DynamoDBAdapter } from '../../../infrastructure/dynamodb/dynamodb.adapter';
import { DynamoDBTransactionRepository } from '../../../infrastructure/transactions/dynamoDBClientTransactionRepository.adapter';
import { CreateTransactionInteractor } from '../interactor/ensureTransaction.interactor';
import { CreateClientInterceptor } from '../../../application/clients/interceptor/create-client.interceptor';

@Controller('api/transactions')
export class TransactionsController {
  constructor(private readonly dynamoDbAdapter: DynamoDBAdapter) {}

  @Post('create')
  @UseInterceptors(CreateClientInterceptor)
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
