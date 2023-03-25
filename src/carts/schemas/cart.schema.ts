import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/orders/schemas/order.schema';
import { User } from 'src/users/schemas/user.schema';
import { ICart } from '../interface/cart.interface';

export type CartDocument = HydratedDocument<Cart>;
export interface ICartDocument extends ICart, mongoose.Document {}

@Schema()
export class Cart implements ICart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Order;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
