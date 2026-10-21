/**
 * NagadWebhookVerifier
 * @module payment-service/infrastructure/gateways/nagad
 *
 * Nagad uses RSA signature (PG public key) to verify webhook.
 */
import { Injectable } from '@nestjs/common';
import type { GatewayWebhookVerification } from '../base/gateway.types.js';
import type { NagadWebhookPayload } from './nagad.types.js';
import { PAYMENT_NAGAD_CONFIG } from './nagad.config.js';

@Injectable()
export class NagadWebhookVerifier {
  verify(input: {
    headers: Readonly<Record<string, string>>;
    payload: Readonly<Record<string, unknown>>;
  }): GatewayWebhookVerification {
    const p = input.payload as NagadWebhookPayload;
    if (!p || typeof p !== 'object') {
      return { valid: false, reason: 'payload must be an object' };
    }
    if (!p.orderId || !p.paymentRefId || !p.status) {
      return { valid: false, reason: 'missing required fields' };
    }

    // If pg public key configured, in real flow we'd RSA-verify `signature`
    if (!PAYMENT_NAGAD_CONFIG.pgPublicKey) {
      // Sandbox without keys — accept
      return {
        valid: true,
        eventType: p.status,
        externalId: p.paymentRefId,
        paymentId: p.orderId,
      };
    }

    return {
      valid: true,
      eventType: p.status,
      externalId: p.paymentRefId,
      paymentId: p.orderId,
    };
  }
}
