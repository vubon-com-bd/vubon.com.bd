/**
 * RecoveryCodeGeneratorService — cryptographically random recovery codes
 * @module identity-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { AUTH_MFA } from '@vubon/shared-constants/auth';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

@Injectable()
export class RecoveryCodeGeneratorService {
  generate(
    count: number = AUTH_MFA.BACKUP_CODES_COUNT,
    length: number = AUTH_MFA.BACKUP_CODE_LENGTH,
  ): readonly string[] {
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

  generateOne(length: number): string {
    const bytes = randomBytes(length);
    let out = '';
    for (let i = 0; i < length; i++) {
      out += ALPHABET[bytes[i] % ALPHABET.length];
    }
    return out;
  }

  normalize(code: string): string {
    return code.trim().toUpperCase().replace(/\s|-/g, '');
  }

  isLow(remaining: number): boolean {
    return remaining <= 2;
  }

  isExhausted(remaining: number): boolean {
    return remaining === 0;
  }
}
