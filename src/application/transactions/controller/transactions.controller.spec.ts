import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { DynamoDBAdapter } from '../../../infrastructure/dynamodb/dynamodb.adapter';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { DynamoDBTransactionRepository } from '../../../infrastructure/transactions/dynamoDBClientTransactionRepository.adapter';
import { CreateTransactionInteractor } from '../interactor/ensureTransaction.interactor';
import { Response } from 'express';

jest.mock('../../../infrastructure/dynamodb/dynamodb.adapter');
jest.mock(
  '../../../infrastructure/transactions/dynamoDBClientTransactionRepository.adapter',
);

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let dynamoDbAdapter: DynamoDBAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: DynamoDBAdapter,
          useValue: {},
        },
        {
          provide: DynamoDBTransactionRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    dynamoDbAdapter = module.get<DynamoDBAdapter>(DynamoDBAdapter);
  });

  describe('create', () => {
    it('should return a successful response from create transaction', async () => {
      const transactionDto: CreateTransactionDto = {
        creatorName: 'CC',
        products: [{}],
        valueProducts: 0,
        numberTransaction: '02312',
        wasSuccessfulPayment: false,
        state: 'PENDIENTE',
        createdAt: new Date(),
      };
      const mockTransactionRepository = new DynamoDBTransactionRepository(
        dynamoDbAdapter,
      );
      const createTransactionInteractor = new CreateTransactionInteractor(
        mockTransactionRepository,
      );

      jest
        .spyOn(createTransactionInteractor, 'execute')
        .mockResolvedValue(expect.anything());

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.create(transactionDto, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(undefined);
    });

    it('should handle errors correctly', async () => {
      const transactionDto: CreateTransactionDto = {
        creatorName: 'CC',
        products: [{}],
        valueProducts: 0,
        numberTransaction: '02312',
        wasSuccessfulPayment: false,
        createdAt: new Date(),
      };
      const error = new Error('Failed to create transaction');
      const mockTransactionRepository = new DynamoDBTransactionRepository(
        dynamoDbAdapter,
      );
      const createTransactionInteractor = new CreateTransactionInteractor(
        mockTransactionRepository,
      );

      jest
        .spyOn(createTransactionInteractor, 'execute')
        .mockRejectedValue(error);

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.create(transactionDto, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(undefined);
    });
  });
});
