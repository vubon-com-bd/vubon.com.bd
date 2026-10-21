/**
 * PaypalWebhookVerifier
 * @module payment-service/infrastructure/gateways/paypal
 *
 * PayPal requires you to POST back to /v1/notifications/verify-webhook-signature
 * for webhook signature verification (async).
 */
import { Injectable, Logger } from '@nestjs/common';
import { PaypalClient } from './paypal.client.js';
import { PAYMENT_PAYPAL_CONFIG } from './paypal.config.js';
import type { GatewayWebhookVerification } from '../base/gateway.types.js';
import type { PaypalWebhookPayload } from './paypal.types.js';

@Injectable()
export class PaypalWebhookVerifier {
  private readonly logger = new Logger(PaypalWebhookVerifier.name);

  constructor(private readonly client: PaypalClient) {}

  verify(input: {
    headers: Readonly<Record<string, string>>;
    payload: Readonly<Record<string, unknown>>;
  }): GatewayWebhookVerification {
    const p = input.payload as PaypalWebhookPayload;
    if (!p || typeof p !== 'object') {
      return { valid: false, reason: 'payload must be an object' };
    }
    if (!p.id || !p.event_type) {
      return { valid: false, reason: 'missing id or event_type' };
    }
    const resource = p.resource as { custom_id?: string; id?: string };
    return {
      valid: true,
      eventType: p.event_type,
      externalId: p.id,
      paymentId: resource?.custom_id,
    };
  }

  async verifySignature(
    input: {
      headers: Readonly<Record<string, string>>;
      payload: Readonly<Record<string, unknown>>;
    },
  ): Promise<boolean> {
    const cfg = PAYMENT_PAYPAL_CONFIG;
    if (!cfg.webhookId) return true;

    const h = input.headers;
    const authAlgo = h['paypal-auth-algo'] ?? h['PAYPAL-AUTH-ALGO'];
    const certUrl = h['paypal-cert-url'] ?? h['PAYPAL-CERT-URL'];
    const transmissionId = h['paypal-transmission-id'] ?? h['PAYPAL-TRANSMISSION-ID'];
    const transmissionSig = h['paypal-transmission-sig'] ?? h['PAYPAL-TRANSMISSION-SIG'];
    const transmissionTime = h['paypal-transmission-time'] ?? h['PAYPAL-TRANSMISSION-TIME'];

    if (!authAlgo || !certUrl || !transmissionId || !transmissionSig || !transmissionTime) {
      this.logger.warn('Missing PayPal signature headers');
      return false;
    }

    try {
      const res = await this.client.verifyWebhook({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: cfg.webhookId,
        webhook_event: input.payload,
      });
      return res.verification_status === 'SUCCESS';
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`PayPal webhook verify failed: ${msg}`);
      return false;
    }
  }
}
