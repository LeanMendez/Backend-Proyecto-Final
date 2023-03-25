import { Role } from 'src/auth/roles/roles';
import { ICartDocument } from 'src/carts/schemas/cart.schema';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  cart?: ICartDocument['_id'];
}
