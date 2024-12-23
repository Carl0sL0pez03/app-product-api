import { GetAllProductsInteractor } from './getAllProducts.interactor';
import { IProductRepository } from '../ports/productRepository.ports';
import { InternalServerErrorException } from '@nestjs/common';
import { ScanOutput } from '@aws-sdk/client-dynamodb';

describe('GetAllProductsInteractor', () => {
  let interactor: GetAllProductsInteractor;
  let mockProductRepository: IProductRepository;

  beforeEach(() => {
    mockProductRepository = {
      getAllProducts: jest.fn(),
      updateStock: jest.fn(),
    };
    interactor = new GetAllProductsInteractor(mockProductRepository);
  });

  it('should return all products when there are no errors', async () => {
    const mockProducts: ScanOutput = {
      Items: [
        {
          id: {
            S: '1',
          },
          name: {
            S: 'Test Product',
          },
        },
      ],
    };
    jest
      .spyOn(mockProductRepository, 'getAllProducts')
      .mockResolvedValue(mockProducts.Items);

    const result = await interactor.execute();
    expect(result).toEqual(mockProducts.Items);
    expect(mockProductRepository.getAllProducts).toHaveBeenCalled();
  });

  it('should throw an InternalServerErrorException when an error occurs in the repository', async () => {
    const mockError = new Error('Database failure');
    jest
      .spyOn(mockProductRepository, 'getAllProducts')
      .mockRejectedValue(mockError);

    await expect(interactor.execute()).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(mockProductRepository.getAllProducts).toHaveBeenCalled();
  });

  it('should provide a default error message when the error lacks a message', async () => {
    jest
      .spyOn(mockProductRepository, 'getAllProducts')
      .mockImplementation(() => {
        throw { desc: { message: undefined } };
      });

    await expect(interactor.execute()).rejects.toThrow(
      new InternalServerErrorException(
        'Ha ocurrido un error al obtener todos los productos',
      ),
    );
  });
});
