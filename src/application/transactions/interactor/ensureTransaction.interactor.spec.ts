import { ITransactionRepository } from '../ports/transactionRepository.ports';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { CreateTransactionInteractor } from './ensureTransaction.interactor';

describe('CreateTransactionInteractor', () => {
  let interactor: CreateTransactionInteractor;
  let mockTransactionRepository: ITransactionRepository;

  beforeEach(() => {
    mockTransactionRepository = {
      createTransaction: jest.fn(),
    };
    interactor = new CreateTransactionInteractor(mockTransactionRepository);
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
      $metadata: {
        requestId: '112',
      },
    };
    jest
      .spyOn(mockTransactionRepository, 'createTransaction')
      .mockResolvedValue(expectedOutput);

    const result = await interactor.execute(transactionDto);
    expect(result).toEqual(expectedOutput);
    expect(mockTransactionRepository.createTransaction).toHaveBeenCalledWith(
      transactionDto,
    );
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
    const error = new Error('Database error');
    jest
      .spyOn(mockTransactionRepository, 'createTransaction')
      .mockRejectedValue(error);

    await expect(interactor.execute(transactionDto)).rejects.toThrowError(
      error,
    );
  });
});
