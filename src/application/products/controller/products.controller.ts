import { Controller, Get, Res } from '@nestjs/common';

import { Response } from 'express';

import { ProductsService } from '../service/products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('getAll')
  async getAll(@Res() res: Response) {
    try {
      const response = await this.productsService.getAllProducts();
      return res.status(response?.['code'] || 200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
