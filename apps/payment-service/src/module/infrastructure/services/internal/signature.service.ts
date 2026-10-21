/**
 * SignatureService — gateway webhook signature verification
 * @module payment-service/infrastructure/services/internal
 *
 * Framework-agnostic verification for common patterns:
 *   - HMAC-SHA256 (bKash, generic)
 *   - Timestamped HMAC (Stripe: `t=...,v1=...`)
 *   - Header-based (PayPal handled in adapter)
 */
import { Injectable, Logger } from '@nestjs/common';
import { hmacSha256, constantTimeEqual } from '@vubon/shared-utils/infrastructure';

const STRIPE_TOLERANCE_SECONDS = 300;

@Injectable()
export class SignatureService {
  private readonly logger = new Logger(SignatureService.name);

  /** bKash-style HMAC-SHA256 hex compare */
  async verifyHmacSha256(
    payload: string,
    expectedSignature: string,
    secret: string,
  ): Promise<boolean> {
    const computed = await hmacSha256(payload, secret);
    return constantTimeEqual(computed, expectedSignature);
  }

  /** Stripe `t=...,v1=...` timestamped HMAC */
  async verifyStripeStyle(
    rawBody: string,
    signatureHeader: string,
    secret: string,
  ): Promise<boolean> {
    const parts = signatureHeader.split(',').reduce<Record<string, string>>(
      (acc, part) => {
        const idx = part.indexOf('=');
        if (idx === -1) return acc;
        acc[part.slice(0, idx)] = part.slice(idx + 1);
        return acc;
      },
      {},
    );
    const timestamp = parts['t'];
    const providedSig = parts['v1'];
    if (!timestamp || !providedSig) return false;

    const nowSec = Math.floor(Date.now() / 1000);
    if (Math.abs(nowSec - Number(timestamp)) > STRIPE_TOLERANCE_SECONDS) {
      this.logger.warn('Signature timestamp outside tolerance window');
      return false;
    }
    const expected = await hmacSha256(`${timestamp}.${rawBody}`, secret);
    return constantTimeEqual(expected, providedSig);
  }

  /** Simple shared-secret equality (timing-safe) */
  verifySharedSecret(provided: string, expected: string): boolean {
    return constantTimeEqual(provided, expected);
  }
}
