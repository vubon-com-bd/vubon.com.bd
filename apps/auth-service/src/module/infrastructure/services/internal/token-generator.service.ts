/**
 * TokenGeneratorService — Opaque token generation (not JWT)
 * @module auth-service/infrastructure/services/internal
 *
 * Used for session tokens, verification codes, password reset tokens.
 */
import { Injectable } from '@nestjs/common';
import { randomBytes, randomInt } from 'node:crypto';

@Injectable()
export class TokenGeneratorService {
  readonly name = 'TokenGeneratorService';

  /** URL-safe opaque token (e.g. session tokens). */
  generateOpaque(bytes = 32): string {
    return randomBytes(bytes).toString('base64url');
  }

  /** Numeric OTP code, 4–8 digits. */
  generateOtp(digits = 6): string {
    const max = 10 ** digits;
    return randomInt(0, max).toString().padStart(digits, '0');
  }

  /** Human-friendly recovery code: XXXX-XXXX (uppercase, no 0/O/1/I). */
  generateRecoveryCode(): string {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const block = (): string => {
      let out = '';
      for (let i = 0; i < 4; i += 1) {
        out += alphabet[randomInt(0, alphabet.length)];
      }
      return out;
    };
    return `${block()}-${block()}`;
  }
}
