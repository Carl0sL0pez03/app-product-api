import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DynamoDBAdapter } from 'src/infrastructure/dynamodb/dynamodb.adapter';

@Injectable()
export class ProductsService {
  constructor(private readonly dynamoDBAdapter: DynamoDBAdapter) {}

  async getAllProducts() {
    try {
      return await this.dynamoDBAdapter.getAllItems('Products');
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message ||
          error?.desc?.message ||
          'Ha ocurrido un error al obtener todos los productos',
      );
    }
  }
}
