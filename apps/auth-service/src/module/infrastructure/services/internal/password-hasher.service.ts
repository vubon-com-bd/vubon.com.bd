/**
 * PasswordHasherService — bcrypt-based password hashing
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import type { PasswordHasherServiceInterface } from '../../../application/services/interfaces/password-hasher.service.interface';

const BCRYPT_ROUNDS = 12;
const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$/;

@Injectable()
export class PasswordHasherService implements PasswordHasherServiceInterface {
  readonly name = 'PasswordHasherService';

  async hash(plain: string): Promise<string> {
    if (!plain || plain.length === 0) {
      throw new Error('Password cannot be empty');
    }
    return bcrypt.hash(plain, BCRYPT_ROUNDS);
  }

  async verify(plain: string, hash: string): Promise<boolean> {
    if (!plain || !hash) return false;
    if (!BCRYPT_HASH_PATTERN.test(hash)) return false;
    try {
      return await bcrypt.compare(plain, hash);
    } catch {
      return false;
    }
  }

  needsRehash(hash: string): boolean {
    if (!hash) return true;
    if (!BCRYPT_HASH_PATTERN.test(hash)) return true;
    try {
      const rounds = bcrypt.getRounds(hash);
      if (!Number.isFinite(rounds)) return true;
      return rounds < BCRYPT_ROUNDS;
    } catch {
      return true;
    }
  }
}
