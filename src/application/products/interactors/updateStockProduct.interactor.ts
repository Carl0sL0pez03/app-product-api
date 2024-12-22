import { InternalServerErrorException } from '@nestjs/common';

import { UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';

import { IProductRepository } from '../ports/productRepository.ports';

export class UpdateStockProduct {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    idProduct: string,
    newStock: number,
  ): Promise<UpdateCommandOutput> {
    try {
      return await this.productRepository.updateStock(idProduct, newStock);
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message ||
          error?.desc?.message ||
          'Ha ocurrido un error al actualizar el stock del producto.',
      );
    }
  }
}
