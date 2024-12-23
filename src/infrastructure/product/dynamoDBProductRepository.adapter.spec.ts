import { DynamoDBAdapter } from '../dynamodb/dynamodb.adapter';
import { ScanOutput } from '@aws-sdk/client-dynamodb';
import { DynamoDBProductRespository } from './dynamoDBProductRepository.adapter';
import { UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';

jest.mock('../dynamodb/dynamodb.adapter');

describe('DynamoDBProductRepository', () => {
  let repository: DynamoDBProductRespository;
  let mockDynamoDBAdapter: jest.Mocked<DynamoDBAdapter>;

  beforeEach(() => {
    mockDynamoDBAdapter = new DynamoDBAdapter() as jest.Mocked<DynamoDBAdapter>;
    repository = new DynamoDBProductRespository(mockDynamoDBAdapter as any);
  });

  describe('getAllProducts', () => {
    it('should retrieve all products', async () => {
      const expectedOutput: ScanOutput[] = [
        {
          Items: [
            {
              _id: {
                S: '1',
              },
              name: {
                S: '1',
              },
              stock: {
                N: '100',
              },
            },
          ],
        },
      ];
      mockDynamoDBAdapter.getAllItems.mockResolvedValue(expectedOutput);

      const result = await repository.getAllProducts();
      expect(result).toEqual(expectedOutput);
      expect(mockDynamoDBAdapter.getAllItems).toHaveBeenCalledWith('Products');
    });
  });

  describe('updateStock', () => {
    it('should update the stock of a product', async () => {
      const idProduct = '1';
      const newStock = 50;
      const expectedOutput: UpdateCommandOutput = {
        $metadata: {},
        Attributes: { _id: idProduct, stock: newStock },
      };
      mockDynamoDBAdapter.updateItem.mockResolvedValue(expectedOutput);

      const result = await repository.updateStock(idProduct, newStock);
      expect(result).toEqual(expectedOutput);
      expect(mockDynamoDBAdapter.updateItem).toHaveBeenCalledWith(
        { _id: idProduct },
        'Products',
        'SET #stock = :newStock',
        { ':newStock': newStock },
        { '#stock': 'stock' },
      );
    });
  });
});
