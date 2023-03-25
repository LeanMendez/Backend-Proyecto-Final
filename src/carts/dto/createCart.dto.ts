import { IOrderDocument } from 'src/orders/schemas/order.schema';
import { IsNotEmpty, IsMongoId } from 'class-validator';

import { IUserDocument } from 'src/users/schemas/user.schema';
import { ICart } from '../interface/cart.interface';

export class CreateCartDto implements ICart {
  @IsMongoId()
  @IsNotEmpty()
  order: IOrderDocument['_id'];

  @IsMongoId()
  @IsNotEmpty()
  user: IUserDocument['_id'];
}
