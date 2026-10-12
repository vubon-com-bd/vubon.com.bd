/**
 * BackupCodeService
 * @module identity-service/domain/services
 */
import { AUTH_MFA } from '@vubon/shared-constants/auth';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class BackupCodeService {
  private static readonly ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0,1,I,O

  static count(): number {
    return AUTH_MFA.BACKUP_CODES_COUNT;
  }

  static length(): number {
    return AUTH_MFA.BACKUP_CODE_LENGTH;
  }

  /**
   * Generate N unique backup codes.
   * NOTE: uses Math.random — infra concern to swap with crypto.
   */
  static generate(count: number = this.count()): readonly string[] {
    if (count < 1 || count > 30) {
      throw new ValidationError('count must be between 1 and 30', 'count');
    }
    const seen = new Set<string>();
    const codes: string[] = [];
    while (codes.length < count) {
      const code = this.generateOne();
      if (!seen.has(code)) {
        seen.add(code);
        codes.push(code);
      }
    }
    return codes;
  }

  static generateOne(): string {
    let out = '';
    for (let i = 0; i < this.length(); i++) {
      const idx = Math.floor(Math.random() * this.ALPHABET.length);
      out += this.ALPHABET[idx];
    }
    return out;
  }

  static normalize(code: string): string {
    return code.trim().toUpperCase().replace(/\s|-/g, '');
  }

  static isLow(remaining: number): boolean {
    return remaining <= 2;
  }

  static isExhausted(remaining: number): boolean {
    return remaining === 0;
  }
}
