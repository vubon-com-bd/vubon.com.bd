/**
 * SslcommerzWebhookVerifier
 * @module payment-service/infrastructure/gateways/sslcommerz
 *
 * SSLCommerz uses `verify_sign` + `verify_key` computed from store credentials.
 * Verification is done via the /validator API by val_id lookup.
 */
import { Injectable, Logger } from '@nestjs/common';
import { SslcommerzClient } from './sslcommerz.client.js';
import type { GatewayWebhookVerification } from '../base/gateway.types.js';
import type { SslcommerzWebhookPayload } from './sslcommerz.types.js';

@Injectable()
export class SslcommerzWebhookVerifier {
  private readonly logger = new Logger(SslcommerzWebhookVerifier.name);

  constructor(private readonly client: SslcommerzClient) {}

  verify(input: {
    headers: Readonly<Record<string, string>>;
    payload: Readonly<Record<string, unknown>>;
  }): GatewayWebhookVerification {
    const p = input.payload as SslcommerzWebhookPayload;
    if (!p || typeof p !== 'object') {
      return { valid: false, reason: 'payload must be an object' };
    }
    if (!p.tran_id || !p.status) {
      return { valid: false, reason: 'missing tran_id or status' };
    }
    return {
      valid: true,
      eventType: p.status,
      externalId: p.val_id,
      paymentId: p.tran_id,
    };
  }

  async verifyWithGateway(
    payload: SslcommerzWebhookPayload,
  ): Promise<boolean> {
    try {
      const res = await this.client.validateTransaction(payload.val_id);
      const ok = res.status === 'VALID' || res.status === 'VALIDATED';
      if (!ok) this.logger.warn(`SSLCommerz invalid: ${res.status}`);
      return ok;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`SSLCommerz validation error: ${msg}`);
      return false;
    }
  }
}
