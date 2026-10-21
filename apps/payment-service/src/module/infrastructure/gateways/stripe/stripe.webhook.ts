/**
 * StripeWebhookVerifier — official signature scheme
 * @module payment-service/infrastructure/gateways/stripe
 *
 * Stripe signature format: `t=timestamp,v1=signature`
 * HMAC-SHA256 over `${timestamp}.${payload}` using webhook secret.
 */
import { Injectable, Logger } from '@nestjs/common';
import { hmacSha256, constantTimeEqual } from '@vubon/shared-utils/infrastructure';
import { PAYMENT_STRIPE_CONFIG } from './stripe.config.js';
import type { GatewayWebhookVerification } from '../base/gateway.types.js';
import type { StripeWebhookPayload } from './stripe.types.js';

const TOLERANCE_SECONDS = 300; // 5 minutes

@Injectable()
export class StripeWebhookVerifier {
  private readonly logger = new Logger(StripeWebhookVerifier.name);

  verify(input: {
    headers: Readonly<Record<string, string>>;
    payload: Readonly<Record<string, unknown>>;
  }): GatewayWebhookVerification {
    const p = input.payload as StripeWebhookPayload;
    if (!p || typeof p !== 'object') {
      return { valid: false, reason: 'payload must be an object' };
    }
    if (!p.type || !p.id) {
      return { valid: false, reason: 'missing type or id' };
    }
    const obj = p.data?.object as
      | { metadata?: { paymentId?: string } }
      | undefined;
    return {
      valid: true,
      eventType: p.type,
      externalId: p.id,
      paymentId: obj?.metadata?.['paymentId'],
    };
  }

  /** Async signature verification with raw body */
  async verifySignature(
    rawBody: string,
    signatureHeader: string,
  ): Promise<boolean> {
    const secret = PAYMENT_STRIPE_CONFIG.webhookSecret;
    if (!secret) return true; // sandbox without secret

    const parts = signatureHeader.split(',').reduce<Record<string, string>>(
      (acc, part) => {
        const [k, v] = part.split('=');
        if (k && v) acc[k] = v;
        return acc;
      },
      {},
    );

    const timestamp = parts['t'];
    const providedSig = parts['v1'];
    if (!timestamp || !providedSig) return false;

    const nowSec = Math.floor(Date.now() / 1000);
    if (Math.abs(nowSec - Number(timestamp)) > TOLERANCE_SECONDS) {
      this.logger.warn('Signature timestamp outside tolerance');
      return false;
    }

    const signed = `${timestamp}.${rawBody}`;
    const expected = await hmacSha256(signed, secret);
    return constantTimeEqual(expected, providedSig);
  }
}
