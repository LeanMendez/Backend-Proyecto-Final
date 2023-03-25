import { IOrderDocument } from 'src/orders/schemas/order.schema';
import { IUserDocument } from 'src/users/schemas/user.schema';

export interface ICart {
  order: IOrderDocument['_id'];
  user: IUserDocument['_id'];
}
