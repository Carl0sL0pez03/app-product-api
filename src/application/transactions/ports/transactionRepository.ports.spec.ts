import { DynamoDBTransactionRepository } from '../../../infrastructure/transactions/dynamoDBClientTransactionRepository.adapter';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

describe('DynamoDBTransactionRepository', () => {
  let repository: DynamoDBTransactionRepository;
  const mockDynamoDbAdapter = {
    createTransaction: jest.fn(),
  };

  beforeEach(() => {
    repository = new DynamoDBTransactionRepository(mockDynamoDbAdapter as any);
  });

  it('should create a transaction successfully', async () => {
    const transactionDto: CreateTransactionDto = {
      creatorName: 'CC',
      products: [{}],
      valueProducts: 0,
      numberTransaction: '02312',
      wasSuccessfulPayment: false,
      state: 'PENDIENTE',
      createdAt: new Date(),
    };
    const expectedOutput: PutItemCommandOutput = {
      $metadata: {},
    };
    jest
      .spyOn(repository, 'createTransaction')
      .mockResolvedValue(expectedOutput);

    const result = await repository.createTransaction(transactionDto);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle errors when transaction creation fails', async () => {
    const transactionDto: CreateTransactionDto = {
      creatorName: 'CC',
      products: [{}],
      valueProducts: 0,
      numberTransaction: '02312',
      wasSuccessfulPayment: false,
      state: 'PENDIENTE',
      createdAt: new Date(),
    };
    const error = new Error('Failed to create transaction');
    jest.spyOn(repository, 'createTransaction').mockRejectedValue(error);

    await expect(
      repository.createTransaction(transactionDto),
    ).rejects.toThrowError(error);
  });
});
