import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { BcryptService } from './bcrypt.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [BcryptService],
})
export class BcryptModule {}
