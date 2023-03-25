import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IProduct } from '../interface/products.interface';

export type ProductDocument = HydratedDocument<Product>;
export interface IProductDocument extends IProduct, mongoose.Document {}

@Schema()
export class Product implements IProduct {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  photoURL: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
