/**
 * SignatureService — HMAC-SHA256 webhook signature helpers
 * @module logistics-service/infrastructure/services/internal
 *
 * ⚠️ Uses Node.js crypto (no external dep)
 */
import { Injectable, Logger } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';

export type SignatureAlgorithm = 'sha256' | 'sha512';

@Injectable()
export class SignatureService {
  private readonly logger = new Logger(SignatureService.name);

  /**
   * Compute HMAC signature (hex).
   */
  sign(payload: string | Buffer, secret: string, algorithm: SignatureAlgorithm = 'sha256'): string {
    if (!secret) throw new Error('SignatureService: secret is required');
    return createHmac(algorithm, secret).update(payload).digest('hex');
  }

  /**
   * Constant-time verification of a signature.
   */
  verify(
    payload: string | Buffer,
    signatureHex: string,
    secret: string,
    algorithm: SignatureAlgorithm = 'sha256',
  ): boolean {
    try {
      const expected = this.sign(payload, secret, algorithm);
      const a = Buffer.from(expected, 'hex');
      const b = Buffer.from(signatureHex, 'hex');
      if (a.length !== b.length) return false;
      return timingSafeEqual(a, b);
    } catch (err) {
      this.logger.warn(`signature verify error: ${this.errMsg(err)}`);
      return false;
    }
  }

  private errMsg(err: unknown): string {
    return err instanceof Error ? err.message : 'unknown';
  }
}
