/**
 * Hash Service
 * @module shared-kernel/infrastructure/security
 *
 * Values আসে shared-config/auth/password থেকে।
 */
import { Injectable } from '@nestjs/common';
import { BCRYPT_CONFIG } from '@vubon/shared-config/auth';

@Injectable()
export class HashService {
  async hash(plainPassword: string): Promise<string> {
    const bcrypt = await import('bcryptjs');
    return bcrypt.hash(plainPassword, BCRYPT_CONFIG.rounds);
  }

  async compare(plainPassword: string, hash: string): Promise<boolean> {
    const bcrypt = await import('bcryptjs');
    return bcrypt.compare(plainPassword, hash);
  }
}
