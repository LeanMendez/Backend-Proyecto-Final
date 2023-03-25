import { IsNotEmpty, IsEmail } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { PickType } from '@nestjs/mapped-types';

export class LoginDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
