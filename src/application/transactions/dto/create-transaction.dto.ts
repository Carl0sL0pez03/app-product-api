import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { IProduct } from 'src/application/products/interface/product.interface';
import { IPaymentDetails } from '../interface/transaction.interface';

export class CreateTransactionDto {
  @IsOptional()
  _id?: string;

  @IsArray()
  @IsNotEmpty()
  products: IProduct[];

  @IsNumber()
  @IsNotEmpty()
  valueProducts: number;

  @IsString()
  @IsOptional()
  numberTransaction: string;

  @IsString()
  @IsNotEmpty()
  creatorName: string;

  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsString()
  @IsOptional()
  state: number;

  @IsBoolean()
  @IsOptional()
  wasSuccessfulPayment: boolean;

  @IsOptional()
  paymentDetails?: IPaymentDetails;
}
