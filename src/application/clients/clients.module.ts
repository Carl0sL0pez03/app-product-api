import { Module } from '@nestjs/common';

import { DynamoDBAdapter } from 'src/infrastructure/dynamodb/dynamodb.adapter';

@Module({
  providers: [DynamoDBAdapter],
})
export class ClientsModule {}
