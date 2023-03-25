import { IOrder } from 'src/orders/interface/orders.interface';
import { IsNotEmpty, IsMongoId } from 'class-validator';
import { IProductDocument } from 'src/products/schemas/product.schema';
import { IUserDocument } from 'src/users/schemas/user.schema';

export class CreateOrderDto implements IOrder {
  @IsMongoId()
  @IsNotEmpty()
  user: IUserDocument['_id'];

  @IsNotEmpty()
  @IsMongoId()
  products: IProductDocument['_id'][];
}
