import { IProduct } from '../interface/products.interface';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto implements IProduct {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  photoURL: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
