/**
 * Password Hasher Adapter
 * Implements IPasswordHasher port using bcryptjs
 */

import { Injectable } from '@nestjs/common';
import { IPasswordHasher } from '@domain/ports/password-hasher.port.js';
import {
  hashPassword,
  comparePassword,
  hashPasswordSync,
  comparePasswordSync,
} from '@vubon/auth-shared-utils';

@Injectable()
export class PasswordHasherAdapter implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return hashPassword(password);
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return comparePassword(plainPassword, hashedPassword);
  }

  hashSync(password: string): string {
    return hashPasswordSync(password);
  }

  compareSync(plainPassword: string, hashedPassword: string): boolean {
    return comparePasswordSync(plainPassword, hashedPassword);
  }

  isSecure(password: string): boolean {
    if (!password || password.length < 8) {
      return false;
    }
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    return hasUppercase && hasLowercase && hasNumber && hasSpecial;
  }

  getStrengthScore(password: string): number {
    if (!password) return 0;

    let score = 0;

    if (password.length >= 12) score += 40;
    else if (password.length >= 10) score += 30;
    else if (password.length >= 8) score += 20;

    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    if (password.length >= 12 && /[^A-Za-z0-9]/.test(password)) score += 10;

    return Math.min(score, 100);
  }

  isCommonPassword(password: string): boolean {
    const commonPasswords = [
      'password123',
      'admin123',
      'letmein',
      'welcome1',
      'iloveyou',
      '12345678',
      'qwerty123',
      'password1',
      'abc123456',
      '123456789',
    ];
    return commonPasswords.some((common) => password.toLowerCase().includes(common));
  }
}
