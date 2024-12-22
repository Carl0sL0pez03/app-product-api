import { Module } from '@nestjs/common';

import { ProductsService } from './service/products.service';
import { ProductsController } from './controller/products.controller';
import { DynamoDBAdapter } from 'src/infrastructure/dynamodb/dynamodb.adapter';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, DynamoDBAdapter],
})
export class ProductsModule {}
