import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SECURITY } from '@vubon/shared-constants/security';
import type { PasswordHasherPort } from '../../../application/ports/password-hasher.port';

@Injectable()
export class PasswordHasherService implements PasswordHasherPort {
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, SECURITY.BCRYPT_ROUNDS);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
