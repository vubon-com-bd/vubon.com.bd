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
  private async loadBcrypt(): Promise<{
    hash: (plain: string, rounds: number) => Promise<string>;
    compare: (plain: string, hash: string) => Promise<boolean>;
  }> {
    const mod = await import('bcryptjs');
    // bcryptjs v3+ ESM default export
    const bcrypt = (mod as unknown as { default: typeof mod }).default ?? mod;
    return bcrypt as unknown as {
      hash: (plain: string, rounds: number) => Promise<string>;
      compare: (plain: string, hash: string) => Promise<boolean>;
    };
  }

  async hash(plainPassword: string): Promise<string> {
    const bcrypt = await this.loadBcrypt();
    return bcrypt.hash(plainPassword, BCRYPT_CONFIG.rounds);
  }

  async compare(plainPassword: string, hash: string): Promise<boolean> {
    const bcrypt = await this.loadBcrypt();
    return bcrypt.compare(plainPassword, hash);
  }
}
