import { IUserDocument } from 'src/users/schemas/user.schema';
import { IProductDocument } from 'src/products/schemas/product.schema';

export interface IOrder {
  user: IUserDocument['_id'];

  products: IProductDocument['_id'];
}
