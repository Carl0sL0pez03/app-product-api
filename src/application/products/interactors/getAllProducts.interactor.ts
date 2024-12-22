import { InternalServerErrorException } from '@nestjs/common';

import { ScanOutput } from '@aws-sdk/client-dynamodb';

import { IProductRepository } from '../ports/productRepository.ports';

export class GetAllProductsInteractor {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<ScanOutput[]> {
    try {
      return await this.productRepository.getAllProducts();
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message ||
          error?.desc?.message ||
          'Ha ocurrido un error al obtener todos los productos',
      );
    }
  }
}
