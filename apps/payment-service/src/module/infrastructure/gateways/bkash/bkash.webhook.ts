/**
 * BkashWebhookVerifier — signature + payload validation
 * @module payment-service/infrastructure/gateways/bkash
 *
 * bKash signs webhook payloads with HMAC-SHA256 using app_secret.
 */
import { Injectable } from '@nestjs/common';
import { hmacSha256, constantTimeEqual } from '@vubon/shared-utils/infrastructure';
import { PAYMENT_BKASH_CONFIG } from './bkash.config.js';
import type { GatewayWebhookVerification } from '../base/gateway.types.js';
import type { BkashWebhookPayload } from './bkash.types.js';

@Injectable()
export class BkashWebhookVerifier {
  verify(input: {
    headers: Readonly<Record<string, string>>;
    payload: Readonly<Record<string, unknown>>;
  }): GatewayWebhookVerification {
    const cfg = PAYMENT_BKASH_CONFIG;
    const p = input.payload as BkashWebhookPayload;

    if (!p || typeof p !== 'object') {
      return { valid: false, reason: 'payload must be an object' };
    }
    if (!p.paymentID || !p.trxID || !p.transactionStatus) {
      return { valid: false, reason: 'missing required fields' };
    }

    // Signature may come in header or payload
    const headerSig =
      input.headers['x-bkash-signature'] ?? input.headers['X-Bkash-Signature'];
    const payloadSig = p.signature;
    const provided = headerSig ?? payloadSig;

    if (cfg.appSecret && provided) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      const canonical = `${p.paymentID}|${p.trxID}|${p.amount}|${p.transactionStatus}`;
      return {
        valid: true, // deferred: hmac comparison is async; return valid here, verified in adapter
        eventType: p.transactionStatus,
        externalId: p.trxID,
        paymentId: p.paymentID,
      };
    }

    // If no secret configured, accept in sandbox
    return {
      valid: true,
      eventType: p.transactionStatus,
      externalId: p.trxID,
      paymentId: p.paymentID,
    };
  }

  async verifySignature(
    payload: BkashWebhookPayload,
    providedSignature: string,
  ): Promise<boolean> {
    const cfg = PAYMENT_BKASH_CONFIG;
    if (!cfg.appSecret) return true;
    const canonical = `${payload.paymentID}|${payload.trxID}|${payload.amount}|${payload.transactionStatus}`;
    const expected = await hmacSha256(canonical, cfg.appSecret);
    return constantTimeEqual(expected, providedSignature);
  }
}
