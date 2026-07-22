/* eslint-disable */
/**
 * Password hasher adapter implementation using bcrypt
 * Implements the PasswordHasher port for password hashing operations
 */

import { Injectable } from '@nestjs/common';
import { env } from '@vubon/auth-shared-config';
import {
  PASSWORD_POLICY,
  PASSWORD_REGEX,
  PASSWORD_STRENGTH_REGEX,
} from '@vubon/auth-shared-constants';
import * as bcrypt from 'bcryptjs';

import type {
  HashedPassword,
  HasherConfig,
  PasswordHasher,
} from '../../../domain/ports/password-hasher.port';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
  private readonly saltRounds: number;
  private readonly config: HasherConfig;

  constructor() {
    this.saltRounds = parseInt(env.BCRYPT_ROUNDS || '12', 10);
    this.config = {
      saltLength: 16,
      keyLength: 60,
      iterations: this.saltRounds,
      algorithm: 'bcrypt',
    };
  }

  async hash(password: string): Promise<HashedPassword> {
    if (!password || typeof password !== 'string') {
      throw new Error('Password is required');
    }

    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return {
      hash,
      salt,
      iterations: this.saltRounds,
      keyLength: 60,
    };
  }

  async compare(password: string, hashedPassword: HashedPassword): Promise<boolean> {
    if (!password || typeof password !== 'string') {
      return false;
    }

    if (!hashedPassword || typeof hashedPassword !== 'object') {
      return false;
    }

    try {
      return await bcrypt.compare(password, hashedPassword.hash);
    } catch {
      return false;
    }
  }

  hashSync(password: string): HashedPassword {
    if (!password || typeof password !== 'string') {
      throw new Error('Password is required');
    }

    const salt = bcrypt.genSaltSync(this.saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return {
      hash,
      salt,
      iterations: this.saltRounds,
      keyLength: 60,
    };
  }

  compareSync(password: string, hashedPassword: HashedPassword): boolean {
    if (!password || typeof password !== 'string') {
      return false;
    }

    if (!hashedPassword || typeof hashedPassword !== 'object') {
      return false;
    }

    try {
      return bcrypt.compareSync(password, hashedPassword.hash);
    } catch {
      return false;
    }
  }

  generateSalt(length?: number): string {
    const saltRounds = length ? Math.min(Math.max(length, 4), 16) : this.saltRounds;
    return bcrypt.genSaltSync(saltRounds);
  }

  isStrongPassword(password: string): boolean {
    if (!password || typeof password !== 'string') {
      return false;
    }

    return PASSWORD_REGEX.test(password);
  }

  getStrengthScore(password: string): number {
    if (!password || typeof password !== 'string') {
      return 0;
    }

    let score = 0;

    if (password.length >= PASSWORD_POLICY.MIN_LENGTH) {
      score += 1;
    }

    if (password.length >= 12) {
      score += 1;
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    }

    if (/\d/.test(password)) {
      score += 1;
    }

    if (/[!@#$%^&*()_+\-=[\]{};:'",.<>/?]/.test(password)) {
      score += 1;
    }

    return score;
  }

  getStrengthLevel(password: string): 'weak' | 'medium' | 'strong' {
    if (!password || typeof password !== 'string') {
      return 'weak';
    }

    if (PASSWORD_STRENGTH_REGEX.STRONG.test(password)) {
      return 'strong';
    }

    if (PASSWORD_STRENGTH_REGEX.MEDIUM.test(password)) {
      return 'medium';
    }

    return 'weak';
  }

  isHashed(password: string): boolean {
    if (!password || typeof password !== 'string') {
      return false;
    }

    return (
      password.startsWith('$2a$') || password.startsWith('$2b$') || password.startsWith('$2y$')
    );
  }

  getHasherType(): string {
    return 'bcrypt';
  }

  getConfig(): HasherConfig {
    return { ...this.config };
  }

  validateHashFormat(hash: string): boolean {
    if (!hash || typeof hash !== 'string') {
      return false;
    }

    const bcryptRegex = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;
    return bcryptRegex.test(hash);
  }

  getSaltFromHash(hash: string): string {
    if (!this.validateHashFormat(hash)) {
      throw new Error('Invalid bcrypt hash format');
    }

    const parts = hash.split('$');
    if (parts.length < 4) {
      throw new Error('Invalid bcrypt hash format');
    }

    return parts.slice(0, 3).join('$');
  }

  getRoundsFromHash(hash: string): number {
    if (!this.validateHashFormat(hash)) {
      throw new Error('Invalid bcrypt hash format');
    }

    const parts = hash.split('$');
    if (parts.length < 4) {
      throw new Error('Invalid bcrypt hash format');
    }

    return parseInt(parts[2], 10);
  }

  needsRehash(hash: string, options?: { rounds?: number }): boolean {
    if (!this.validateHashFormat(hash)) {
      return true;
    }

    const currentRounds = this.getRoundsFromHash(hash);
    const targetRounds = options?.rounds || this.saltRounds;

    return currentRounds !== targetRounds;
  }
}

export class BcryptPasswordHasherFactory {
  public static create(): BcryptPasswordHasher {
    return new BcryptPasswordHasher();
  }
}

export const passwordHasherProvider = {
  provide: 'PASSWORD_HASHER',
  useClass: BcryptPasswordHasher,
};

export default BcryptPasswordHasher;
