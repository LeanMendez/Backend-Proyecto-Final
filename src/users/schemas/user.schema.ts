import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/roles/roles';
import { Cart } from 'src/carts/schemas/cart.schema';
import { IUser } from '../interface/users.interface';

export type UserDocument = HydratedDocument<User>;
export interface IUserDocument extends IUser, mongoose.Document {}

@Schema()
export class User implements IUser {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
  cart?: Cart;
}

export const UserSchema = SchemaFactory.createForClass(User);
