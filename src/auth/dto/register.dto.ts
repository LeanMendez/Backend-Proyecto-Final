import { IsNotEmpty, IsEmail, IsString, IsIn } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { Role } from 'src/auth/roles/roles';

export class RegisterDto extends PartialType(CreateUserDto) {
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
  @IsNotEmpty()
  @IsIn(['admin', 'user'])
  role: Role;
}
