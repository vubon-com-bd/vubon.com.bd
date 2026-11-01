/**
 * Crypto Service
 * @module shared-kernel/infrastructure/security
 *
 * Values আসে shared-utils ও shared-constants থেকে।
 */
import { Injectable } from '@nestjs/common';
import { randomBytes, constantTimeEqual } from '@vubon/shared-utils/infrastructure';
import { SECURITY } from '@vubon/shared-constants/security';

@Injectable()
export class CryptoService {
  generateRandomBytes(length: number): Uint8Array {
    return randomBytes(length);
  }

  generateHexToken(byteLength: number = SECURITY.ENCRYPTION_KEY_LENGTH): string {
    const bytes = randomBytes(byteLength);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  }

  timingSafeEqual(a: string, b: string): boolean {
    return constantTimeEqual(a, b);
  }
}
