import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { MailerService } from 'src/mailer/mailer.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto';
import { Role } from './roles/roles';

@Injectable()
export class AuthService {
  @Inject(forwardRef(() => UsersService)) private usersService: UsersService;
  @Inject(forwardRef(() => BcryptService)) private bcryptService: BcryptService;
  constructor(
    private mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (!user)
      throw new UnauthorizedException('Incorrect credentials user not found');
    if (user.password !== dto.password)
      throw new UnauthorizedException('Incorrect credentials wrong pass');
    return this.signUser(user.id, user.email, user.role);
  }

  async register(dto: RegisterDto) {
    try {
      const password = await this.bcryptService.hashPass(dto.password);
      await this.usersService.createUser({
        ...dto,
        password,
      });
      await this.mailerService.sendEmailTo(dto.email);

      return { message: 'User registered succesfully' };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  signUser(id: string, email: string, role: Role) {
    return this.jwtService.sign({
      id,
      email,
      role,
    });
  }
}
