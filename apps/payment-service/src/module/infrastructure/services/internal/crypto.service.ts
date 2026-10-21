/**
 * PaymentCryptoService — payment-specific crypto helpers
 * @module payment-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import {
  hmacSha256,
  hashSha256,
  constantTimeEqual,
  randomBytes,
} from '@vubon/shared-utils/infrastructure';

@Injectable()
export class PaymentCryptoService {
  /** Hash a value for payload fingerprinting */
  async fingerprint(input: string): Promise<string> {
    return hashSha256(input);
  }

  /** HMAC-sign a value (webhook, callback) */
  async sign(payload: string, secret: string): Promise<string> {
    return hmacSha256(payload, secret);
  }

  /** Constant-time compare (signatures, tokens) */
  compare(a: string, b: string): boolean {
    return constantTimeEqual(a, b);
  }

  /** Cryptographically-secure hex token */
  generateToken(bytes = 32): string {
    return Array.from(randomBytes(bytes), (b) => b.toString(16).padStart(2, '0')).join('');
  }

  /** Idempotency fingerprint — determinism across retries */
  async idempotencyFingerprint(payload: Record<string, unknown>): Promise<string> {
    const canonical = JSON.stringify(payload, Object.keys(payload).sort());
    return hashSha256(canonical);
  }
}
