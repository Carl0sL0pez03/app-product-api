import { DynamoDBAdapter } from '../dynamodb/dynamodb.adapter';
import { CreateClientDto } from '../../application/clients/dto/create-client.dto';
import { DynamoDBClientRepository } from './dynamoDBClientRepository.adapter';
import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

jest.mock('../dynamodb/dynamodb.adapter');

describe('DynamoDBClientRepository', () => {
  let repository: DynamoDBClientRepository;
  let mockDynamoDBAdapter: jest.Mocked<DynamoDBAdapter>;

  beforeEach(() => {
    mockDynamoDBAdapter = new DynamoDBAdapter() as jest.Mocked<DynamoDBAdapter>;
    repository = new DynamoDBClientRepository(mockDynamoDBAdapter);
  });

  describe('findClientByName', () => {
    it('should retrieve a client by name from the correct table', async () => {
      const mockResult = [{ name: 'John Doe', id: '1' }];
      mockDynamoDBAdapter.getItem.mockResolvedValue(mockResult);

      const result = await repository.findClientByName('John Doe');
      expect(result).toEqual(mockResult);
      expect(mockDynamoDBAdapter.getItem).toHaveBeenCalledWith(
        'John Doe',
        'Customers',
      );
    });
  });

  describe('createClient', () => {
    it('should create a client with correct parameters', async () => {
      const clientDto: CreateClientDto = {
        nameClient: 'Jane Doe',
        createdAt: new Date(),
      };
      const expectedOutput: PutItemCommandOutput = {
        $metadata: {},
        Attributes: {
          _id: {
            S: '123',
          },
        },
      };
      mockDynamoDBAdapter.putItem.mockResolvedValue(expectedOutput);

      const result = await repository.createClient(clientDto);
      expect(result).toEqual(expectedOutput);
      expect(mockDynamoDBAdapter.putItem).toHaveBeenCalled();

      const putCallArgs = mockDynamoDBAdapter.putItem.mock.calls[0][0];
      expect(putCallArgs).toHaveProperty('_id');
      expect(putCallArgs.nameClient).toBe('Jane Doe');
      expect(putCallArgs).toHaveProperty('createdAt');
    });

    it('should handle missing createdAt by using current date', async () => {
      const clientDto: CreateClientDto = { nameClient: 'John Doe' };
      const expectedOutput = {
        $metadata: {},
        Attributes: {
          _id: {
            S: '123',
          },
        },
      };
      mockDynamoDBAdapter.putItem.mockResolvedValue(expectedOutput);

      await repository.createClient(clientDto);
      const putCallArgs = mockDynamoDBAdapter.putItem.mock.calls[0][0];
      expect(putCallArgs).toHaveProperty('createdAt');
    });
  });
});
