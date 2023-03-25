import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private async genSalt(): Promise<number> {
    return parseInt(await bcrypt.genSalt(10));
  }

  async hashPass(pass: string) {
    return await bcrypt.hash(pass, await this.genSalt());
  }

  async comparePass(pass: string, hash: string) {
    return await bcrypt.compare(pass, hash);
  }
}
