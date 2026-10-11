/**
 * SignatureService — HMAC signing for outbound webhooks
 * @module notification-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';

export const SIGNATURE_SERVICE = Symbol('SIGNATURE_SERVICE');

@Injectable()
export class SignatureService {
  private readonly logger = new Logger(SignatureService.name);

  /** Sign a webhook payload with HMAC-SHA256. */
  sign(payload: string, secret: string): string {
    return createHmac('sha256', secret).update(payload).digest('hex');
  }

  /** Build the header value (e.g. `sha256=...`). */
  buildHeader(payload: string, secret: string, algorithm = 'sha256'): string {
    const signature = this.sign(payload, secret);
    return `${algorithm}=${signature}`;
  }

  /** Verify an incoming signature in constant time. */
  verify(payload: string, header: string, secret: string): boolean {
    if (!header || !secret) return false;
    try {
      const expected = this.sign(payload, secret);
      const provided = header.replace(/^sha256=/, '');
      const a = Buffer.from(expected, 'hex');
      const b = Buffer.from(provided, 'hex');
      if (a.length !== b.length) return false;
      return timingSafeEqual(a, b);
    } catch (err) {
      this.logger.warn(`Signature verify error: ${(err as Error).message}`);
      return false;
    }
  }

  /** Generate a random secret (for new webhook registration). */
  generateSecret(bytes = 32): string {
    return randomBytes(bytes).toString('hex');
  }
}
