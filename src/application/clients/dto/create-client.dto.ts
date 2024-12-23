import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsOptional()
  _id?: string;

  @IsString()
  nameClient: string;

  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
