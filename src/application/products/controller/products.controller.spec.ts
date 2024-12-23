import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { DynamoDBAdapter } from '../../../infrastructure/dynamodb/dynamodb.adapter';
import { DynamoDBProductRespository } from '../../../infrastructure/product/dynamoDBProductRepository.adapter';
import { GetAllProductsInteractor } from '../interactors';
import { Response } from 'express';

jest.mock('../../../infrastructure/dynamodb/dynamodb.adapter');
jest.mock('../../../infrastructure/product/dynamoDBProductRepository.adapter');
jest.mock('../interactors');

describe('ProductsController', () => {
  let controller: ProductsController;
  let response: Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [DynamoDBAdapter, DynamoDBProductRespository],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
  });

  it('should return all products successfully', async () => {
    const getAllProductsInteractor = new GetAllProductsInteractor(
      expect.any(DynamoDBProductRespository),
    );
    getAllProductsInteractor.execute = jest.fn().mockResolvedValue(undefined);

    await controller.getAll(response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(undefined);
  });

  it('should handle errors properly', async () => {
    const getAllProductsInteractor = new GetAllProductsInteractor(
      expect.any(DynamoDBProductRespository),
    );
    getAllProductsInteractor.execute = jest
      .fn()
      .mockRejectedValue(new Error('Error'));

    await controller.getAll(response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(undefined);
  });
});
