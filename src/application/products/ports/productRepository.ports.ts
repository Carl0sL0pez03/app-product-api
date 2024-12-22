import { ScanOutput } from '@aws-sdk/client-dynamodb';
import { UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';

export interface IProductRepository {
  getAllProducts(): Promise<ScanOutput[]>;
  updateStock(
    idProduct: string,
    newStock: number,
  ): Promise<UpdateCommandOutput>;
}
