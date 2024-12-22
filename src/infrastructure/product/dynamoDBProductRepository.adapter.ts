import { ScanOutput } from '@aws-sdk/client-dynamodb';

import { IProductRepository } from 'src/application/products/ports/productRepository.ports';
import { DynamoDBAdapter } from '../dynamodb/dynamodb.adapter';
import { UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';

export class DynamoDBProductRespository implements IProductRepository {
  constructor(private dynamoDBAdapter: DynamoDBAdapter) {}

  async getAllProducts(): Promise<ScanOutput[]> {
    return await this.dynamoDBAdapter.getAllItems('Products');
  }

  async updateStock(
    idProduct: string,
    newStock: number,
  ): Promise<UpdateCommandOutput> {
    return await this.dynamoDBAdapter.updateItem(
      { _id: idProduct },
      'Products',
      'SET #stock = :newStock',
      { ':newStock': newStock },
      { '#stock': 'stock' },
    );
  }
}
