/**
 * SignatureService — webhook signature verification per gateway
 * @module payment-service/infrastructure/services/internal
 *
 * Strategy:
 *  - HMAC-SHA256 for stripe/sslcommerz
 *  - Plain equality (signed token) for bkash/nagad/rocket callbacks
 *  - Returns boolean + reason for logging.
 */
import { Injectable, Logger } from '@nestjs/common';
import { hmacSha256 } from '@vubon/shared-utils/infrastructure';
import { constantTimeEqual } from '@vubon/shared-utils/infrastructure';
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';

export interface SignatureVerifyInput {
  readonly gateway: string;
  readonly rawBody: string;
  readonly signature: string | undefined;
  readonly secret: string;
}

export interface SignatureVerifyResult {
  readonly verified: boolean;
  readonly reason?: string;
}

@Injectable()
export class SignatureService {
  private readonly logger = new Logger(SignatureService.name);

  async verify(input: SignatureVerifyInput): Promise<SignatureVerifyResult> {
    if (!input.signature) {
      return { verified: false, reason: 'missing signature' };
    }
    if (!input.secret) {
      return { verified: false, reason: 'missing gateway secret' };
    }

    switch (input.gateway) {
      case PAYMENT_GATEWAY.STRIPE:
      case PAYMENT_GATEWAY.SSLCOMMERZ:
        return this.verifyHmac(input);
      case PAYMENT_GATEWAY.BKASH:
      case PAYMENT_GATEWAY.NAGAD:
      case PAYMENT_GATEWAY.ROCKET:
      case PAYMENT_GATEWAY.UPAY:
      case PAYMENT_GATEWAY.PAYPAL:
        return this.verifyToken(input);
      case PAYMENT_GATEWAY.MANUAL:
        return { verified: true, reason: 'manual gateway — no signature required' };
      default:
        this.logger.warn(`Unknown gateway "${input.gateway}" — falling back to token compare`);
        return this.verifyToken(input);
    }
  }

  private async verifyHmac(input: SignatureVerifyInput): Promise<SignatureVerifyResult> {
    const expected = await hmacSha256(input.rawBody, input.secret);
    const ok = constantTimeEqual(expected, input.signature!);
    return ok
      ? { verified: true }
      : { verified: false, reason: 'hmac mismatch' };
  }

  private async verifyToken(input: SignatureVerifyInput): Promise<SignatureVerifyResult> {
    const ok = constantTimeEqual(input.secret, input.signature!);
    return ok
      ? { verified: true }
      : { verified: false, reason: 'signature mismatch' };
  }
}
