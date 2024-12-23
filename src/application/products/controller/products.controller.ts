import { Controller, Get, Res } from '@nestjs/common';

import { Response } from 'express';

import { DynamoDBAdapter } from '../../../infrastructure/dynamodb/dynamodb.adapter';
import { DynamoDBProductRespository } from '../../../infrastructure/product/dynamoDBProductRepository.adapter';
import { GetAllProductsInteractor } from '../interactors';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly dynamoDbAdapter: DynamoDBAdapter) {}

  @Get('getAll')
  async getAll(@Res() res: Response) {
    try {
      const productRepository = new DynamoDBProductRespository(
        this.dynamoDbAdapter,
      );
      const response = await new GetAllProductsInteractor(
        productRepository,
      ).execute();
      return res.status(response?.['code'] || 200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
