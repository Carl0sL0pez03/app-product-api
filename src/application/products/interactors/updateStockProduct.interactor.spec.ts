import { InternalServerErrorException } from '@nestjs/common';
import { IProductRepository } from '../ports/productRepository.ports';
import { UpdateStockProduct } from './updateStockProduct.interactor';
import { UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';

describe('UpdateStockProduct', () => {
  let updateStockProduct: UpdateStockProduct;
  let mockProductRepository: IProductRepository;

  beforeEach(() => {
    mockProductRepository = {
      getAllProducts: jest.fn(),
      updateStock: jest.fn(),
    };
    updateStockProduct = new UpdateStockProduct(mockProductRepository);
  });

  it('should update product stock successfully', async () => {
    const idProduct = '123';
    const newStock = 50;
    const mockOutput: UpdateCommandOutput = {
      $metadata: {
        requestId: '12312321',
      },
      Attributes: { id: idProduct, stock: newStock },
    };
    jest
      .spyOn(mockProductRepository, 'updateStock')
      .mockResolvedValue(mockOutput);

    const result = await updateStockProduct.execute(idProduct, newStock);
    expect(result).toEqual(mockOutput);
    expect(mockProductRepository.updateStock).toHaveBeenCalledWith(
      idProduct,
      newStock,
    );
  });

  it('should throw an InternalServerErrorException when an error occurs in the repository', async () => {
    const idProduct = '123';
    const newStock = 50;
    const mockError = new Error('Database failure');
    jest
      .spyOn(mockProductRepository, 'updateStock')
      .mockRejectedValue(mockError);

    await expect(
      updateStockProduct.execute(idProduct, newStock),
    ).rejects.toThrow(InternalServerErrorException);
    expect(mockProductRepository.updateStock).toHaveBeenCalledWith(
      idProduct,
      newStock,
    );
  });

  it('should use a default error message when the error object does not contain a message', async () => {
    const idProduct = '123';
    const newStock = 50;
    jest.spyOn(mockProductRepository, 'updateStock').mockImplementation(() => {
      throw { desc: { message: undefined } }; // Simulating an error without a message property
    });

    await expect(
      updateStockProduct.execute(idProduct, newStock),
    ).rejects.toThrow(
      new InternalServerErrorException(
        'Ha ocurrido un error al actualizar el stock del producto.',
      ),
    );
  });
});
