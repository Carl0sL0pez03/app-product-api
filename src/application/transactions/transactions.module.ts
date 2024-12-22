import { Module } from '@nestjs/common';

import { TransactionsController } from './controller/transactions.controller';
import { DynamoDBAdapter } from 'src/infrastructure/dynamodb/dynamodb.adapter';

@Module({
  controllers: [TransactionsController],
  providers: [DynamoDBAdapter],
})
export class TransactionsModule {}
