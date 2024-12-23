import { Module } from '@nestjs/common';

import { TransactionsController } from './controller/transactions.controller';
import { DynamoDBAdapter } from 'src/infrastructure/dynamodb/dynamodb.adapter';
import { EnsureClientInteractor } from '../clients/interactor/ensureClient.interactor';

@Module({
  controllers: [TransactionsController],
  providers: [DynamoDBAdapter, EnsureClientInteractor],
})
export class TransactionsModule {}
