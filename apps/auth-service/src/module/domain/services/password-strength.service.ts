/**
 * PasswordStrengthService — Evaluates password strength beyond regex
 * @module auth-service/domain/services
 *
 * Stateless. No framework dependency.
 */
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';
import { WeakPasswordError } from '../errors/password.errors';

export interface PasswordStrengthReport {
  readonly score: number;          // 0–100
  readonly entropyBits: number;
  readonly isStrong: boolean;
  readonly missing: readonly string[];
  readonly suggestions: readonly string[];
}

const WEAK_LIST = new Set<string>([
  'password', 'password1', 'password123', '12345678', '123456789',
  'qwerty123', 'admin123', 'letmein', 'welcome1', 'iloveyou',
  'abcdef123', 'qwertyuiop', 'passw0rd',
]);

export class PasswordStrengthService {
  /**
   * Calculate Shannon entropy (bits) over the character set.
   */
  static estimateEntropyBits(password: string): number {
    if (!password) return 0;
    const charsetSize = PasswordStrengthService.charsetSize(password);
    if (charsetSize === 0) return 0;
    return Math.round(password.length * Math.log2(charsetSize));
  }

  private static charsetSize(password: string): number {
    let size = 0;
    if (/[a-z]/.test(password)) size += 26;
    if (/[A-Z]/.test(password)) size += 26;
    if (/\d/.test(password)) size += 10;
    if (/[^A-Za-z0-9]/.test(password)) size += 33;
    return size;
  }

  static score(password: string): PasswordStrengthReport {
    const missing: string[] = [];
    const suggestions: string[] = [];

    if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      missing.push(`min length ${VALIDATION.PASSWORD_MIN_LENGTH}`);
    }
    if (!/[a-z]/.test(password)) missing.push('lowercase letter');
    if (!/[A-Z]/.test(password)) missing.push('uppercase letter');
    if (!/\d/.test(password)) missing.push('digit');
    if (!/[^A-Za-z0-9]/.test(password)) missing.push('special char');
    if (!REGEX.PASSWORD_STRONG.test(password)) missing.push('regex pattern');
    if (WEAK_LIST.has(password.toLowerCase())) {
      missing.push('not in common weak list');
      suggestions.push('Avoid common passwords');
    }
    if (/(.)\1{2,}/.test(password)) {
      suggestions.push('Avoid repeated characters');
    }
    if (/^(?:abc|123|qwerty)/i.test(password)) {
      suggestions.push('Avoid keyboard sequences');
    }

    const entropyBits = PasswordStrengthService.estimateEntropyBits(password);
    let score = Math.min(100, Math.round((entropyBits / 100) * 100));
    score -= missing.length * 10;
    if (WEAK_LIST.has(password.toLowerCase())) score = Math.min(score, 20);
    score = Math.max(0, Math.min(100, score));

    return {
      score,
      entropyBits,
      isStrong: missing.length === 0 && score >= 60,
      missing,
      suggestions,
    };
  }

  static validate(password: string): void {
    const report = PasswordStrengthService.score(password);
    if (!report.isStrong) {
      throw new WeakPasswordError(report.missing);
    }
  }
}
