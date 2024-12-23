import { DynamoDBAdapter } from '../dynamodb/dynamodb.adapter';
import { CreateTransactionDto } from '../../application/transactions/dto/create-transaction.dto';
import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { StateTransactions } from '../../constant/stateTransactions.constant';
import { DynamoDBTransactionRepository } from './dynamoDBClientTransactionRepository.adapter';

jest.mock('../dynamodb/dynamodb.adapter');
jest.mock('../../function/dateFunction', () => ({
  dateFunctionSave: jest
    .fn()
    .mockImplementation(() => new Date('2021-01-01T00:00:00Z')),
}));

describe('DynamoDBTransactionRepository', () => {
  let repository: DynamoDBTransactionRepository;
  let mockDynamoDBAdapter: jest.Mocked<DynamoDBAdapter>;

  beforeEach(() => {
    mockDynamoDBAdapter = new DynamoDBAdapter() as jest.Mocked<DynamoDBAdapter>;
    repository = new DynamoDBTransactionRepository(mockDynamoDBAdapter);
  });

  describe('createTransaction', () => {
    it('should create a transaction and return the DynamoDB output', async () => {
      const transactionDto: CreateTransactionDto = {
        products: [{ _id: '1', name: 'TRest1' }],
        valueProducts: 300,
        creatorName: 'John Doe',
        createdAt: new Date(),
        numberTransaction: '123123',
        wasSuccessfulPayment: false,
      };
      const expectedOutput: PutItemCommandOutput = {
        $metadata: {},
        Attributes: {},
      };
      mockDynamoDBAdapter.putItem.mockResolvedValue(expectedOutput);

      const result = await repository.createTransaction(transactionDto);
      expect(result).toEqual(expectedOutput);
      expect(mockDynamoDBAdapter.putItem).toHaveBeenCalledWith(
        expect.any(Object),
        'Transactions',
      );
      expect(mockDynamoDBAdapter.putItem.mock.calls[0][0]).toMatchObject({
        _id: expect.any(String),
        numberTransaction: expect.any(String),
        creatorName: 'John Doe',
        createdAt: '2021-01-01T00:00:00.000Z',
        state: StateTransactions.PENDING,
        wasSuccessfulPayment: false,
      });
    });
  });
});
