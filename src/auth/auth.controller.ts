import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signin')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('local/signup')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
