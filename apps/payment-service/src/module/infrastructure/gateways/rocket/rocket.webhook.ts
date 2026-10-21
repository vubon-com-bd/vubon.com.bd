/**
 * RocketWebhookVerifier
 * @module payment-service/infrastructure/gateways/rocket
 */
import { Injectable } from '@nestjs/common';
import type { GatewayWebhookVerification } from '../base/gateway.types.js';
import type { RocketWebhookPayload } from './rocket.types.js';

@Injectable()
export class RocketWebhookVerifier {
  verify(input: {
    headers: Readonly<Record<string, string>>;
    payload: Readonly<Record<string, unknown>>;
  }): GatewayWebhookVerification {
    const p = input.payload as RocketWebhookPayload;
    if (!p || typeof p !== 'object') {
      return { valid: false, reason: 'payload must be an object' };
    }
    if (!p.orderId || !p.rocketPaymentId || !p.status) {
      return { valid: false, reason: 'missing required fields' };
    }
    return {
      valid: true,
      eventType: p.status,
      externalId: p.rocketPaymentId,
      paymentId: p.orderId,
    };
  }
}
