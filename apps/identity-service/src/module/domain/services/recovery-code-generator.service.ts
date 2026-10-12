/**
 * RecoveryCodeGeneratorService
 * @module identity-service/domain/services
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class RecoveryCodeGeneratorService {
  private static readonly ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  private static readonly DEFAULT_COUNT = 10;
  private static readonly DEFAULT_LENGTH = 10;
  private static readonly MAX_GENERATE = 20;

  static generate(
    count: number = this.DEFAULT_COUNT,
    length: number = this.DEFAULT_LENGTH,
  ): readonly string[] {
    if (count < 1 || count > this.MAX_GENERATE) {
      throw new ValidationError(
        `count must be between 1 and ${this.MAX_GENERATE}`,
        'count',
      );
    }
    if (length < 8 || length > 32) {
      throw new ValidationError('length must be 8-32', 'length');
    }

    const seen = new Set<string>();
    const codes: string[] = [];

    while (codes.length < count) {
      const code = this.generateOne(length);
      if (!seen.has(code)) {
        seen.add(code);
        codes.push(code);
      }
    }
    return codes;
  }

  static generateOne(length: number = this.DEFAULT_LENGTH): string {
    let out = '';
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * this.ALPHABET.length);
      out += this.ALPHABET[idx];
    }
    return out;
  }

  static normalize(code: string): string {
    return code.trim().toUpperCase().replace(/\s|-/g, '');
  }

  static formatForDisplay(code: string): string {
    // Format as XXXX-XXXX-XX for readability
    const normalized = this.normalize(code);
    if (normalized.length < 8) return normalized;
    const mid = Math.ceil(normalized.length / 2);
    return `${normalized.slice(0, mid)}-${normalized.slice(mid)}`;
  }
}
