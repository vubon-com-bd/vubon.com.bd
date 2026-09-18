/**
 * Hash Service
 * @module shared-kernel/infrastructure/security
 *
 * Values আসে shared-config/auth/password থেকে।
 *
 * ⚠️ Hash library (bcrypt/argon2) inject করতে হবে বা import করতে হবে।
 */
import { Injectable } from '@nestjs/common';
import { BCRYPT_CONFIG } from '@vubon/shared-config/auth';

@Injectable()
export class HashService {
  /**
   * Hash a plain password. Uses bcrypt with configured rounds.
   *
   * ⚠️ Requires `bcrypt` package installed in the host application.
   */
  async hash(plainPassword: string): Promise<string> {
    const bcrypt = await import('bcrypt');
    return bcrypt.hash(plainPassword, BCRYPT_CONFIG.rounds);
  }

  async compare(plainPassword: string, hash: string): Promise<boolean> {
    const bcrypt = await import('bcrypt');
    return bcrypt.compare(plainPassword, hash);
  }
}
