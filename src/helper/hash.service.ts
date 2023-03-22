import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(password: string, hash: any) {
    return await bcrypt.compare(password, hash);
  }
}
