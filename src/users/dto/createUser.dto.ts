import {
  IsEmail,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/auth/roles/roles';
import { ICartDocument } from 'src/carts/schemas/cart.schema';
import { IUser } from '../interface/users.interface';

export class CreateUserDto implements IUser {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  @IsIn(['admin', 'user'])
  @IsNotEmpty()
  role: Role;

  @IsMongoId()
  @IsOptional()
  cart?: ICartDocument['_id'];
}
