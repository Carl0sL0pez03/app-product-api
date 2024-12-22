import { Module } from '@nestjs/common';

import { ProductsController } from './controller/products.controller';
import { DynamoDBAdapter } from 'src/infrastructure/dynamodb/dynamodb.adapter';
import { GetAllProductsInteractor } from './interactors';

@Module({
  controllers: [ProductsController],
  providers: [DynamoDBAdapter, GetAllProductsInteractor],
})
export class ProductsModule {}
