import { ScanOutput } from '@aws-sdk/client-dynamodb';
import { UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';
import { DynamoDBProductRespository } from '../../../infrastructure/product/dynamoDBProductRepository.adapter';

describe('DynamoDBProductRepository', () => {
  let repository: DynamoDBProductRespository;
  const mockDynamoDbAdapter = {
    getAllProducts: jest.fn(),
    updateStock: jest.fn(),
  };

  beforeEach(() => {
    repository = new DynamoDBProductRespository(mockDynamoDbAdapter as any);
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const scanOutput: ScanOutput = {
        Items: [
          {
            id: {
              S: '1',
            },
            name: {
              S: 'Product 1',
            },
          },
        ],
        Count: 2,
        ScannedCount: 2,
      };
      jest
        .spyOn(repository, 'getAllProducts')
        .mockResolvedValue(scanOutput.Items);

      const result = await repository.getAllProducts();
      expect(result).toEqual(scanOutput.Items);
    });

    it('should handle errors', async () => {
      const error = new Error('Failed to scan');
      jest.spyOn(repository, 'getAllProducts').mockRejectedValue(error);

      await expect(repository.getAllProducts()).rejects.toThrow(error);
    });
  });

  describe('updateStock', () => {
    it('should update the stock of a product', async () => {
      const updateCommandOutput: UpdateCommandOutput = {
        $metadata: {
          requestId: '123',
        },
        Attributes: { id: '1', stock: 100 },
      };
      jest
        .spyOn(repository, 'updateStock')
        .mockResolvedValue(updateCommandOutput);

      const result = await repository.updateStock('1', 100);
      expect(result).toEqual(updateCommandOutput);
      expect(result.Attributes.stock).toBe(100);
    });

    it('should handle errors during stock update', async () => {
      const error = new Error('Failed to update');
      jest.spyOn(repository, 'updateStock').mockRejectedValue(error);

      await expect(repository.updateStock('1', 50)).rejects.toThrow(error);
    });
  });
});
