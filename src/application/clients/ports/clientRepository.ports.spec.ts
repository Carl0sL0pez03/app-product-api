import { CreateClientDto } from '../dto/create-client.dto';
import { DynamoDBClientRepository } from '../../../infrastructure/client/dynamoDBClientRepository.adapter';

describe('DynamoDBClientRepository', () => {
  let repository: DynamoDBClientRepository;
  const mockDynamoDbAdapter = {
    getItem: jest.fn(),
    putItem: jest.fn(),
  };
  let clientDto: CreateClientDto;

  beforeEach(() => {
    mockDynamoDbAdapter.getItem.mockResolvedValue([
      { id: '123', name: 'Test Client' },
    ]);
    repository = new DynamoDBClientRepository(mockDynamoDbAdapter as any);
    clientDto = {
      nameClient: 'New Client',
    };
  });

  it('should return client data if found', async () => {
    const mockClientData = [{ id: '123', name: 'Test Client' }];
    mockDynamoDbAdapter.getItem.mockResolvedValue(mockClientData);

    const result = await repository.findClientByName('Test Client');
    expect(result).toEqual(mockClientData);
    expect(mockDynamoDbAdapter.getItem).toHaveBeenCalledWith(
      expect.anything(),
      'Customers',
    );
  });

  it('should call DynamoDB to create a client', async () => {
    const mockPutItemOutput = { Attributes: {} };
    mockDynamoDbAdapter.putItem.mockResolvedValue(mockPutItemOutput);

    const result = await repository.createClient(clientDto);

    expect(result).toEqual(mockPutItemOutput);
    expect(mockDynamoDbAdapter.putItem).toHaveBeenCalledWith(
      {
        _id: expect.any(String),
        createdAt: expect.any(String),
        nameClient: clientDto.nameClient,
      },
      'Customers',
    );
  });
});
