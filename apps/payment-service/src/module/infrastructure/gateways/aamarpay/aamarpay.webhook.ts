/**
 * AamarpayWebhookVerifier
 * @module payment-service/infrastructure/gateways/aamarpay
 *
 * aamarPay IPN verification: check `pay_status` + verify via trxcheck API.
 */
import { Injectable, Logger } from '@nestjs/common';
import { AamarpayClient } from './aamarpay.client.js';
import type { GatewayWebhookVerification } from '../base/gateway.types.js';
import type { AamarpayWebhookPayload } from './aamarpay.types.js';

@Injectable()
export class AamarpayWebhookVerifier {
  private readonly logger = new Logger(AamarpayWebhookVerifier.name);

  constructor(private readonly client: AamarpayClient) {}

  verify(input: {
    headers: Readonly<Record<string, string>>;
    payload: Readonly<Record<string, unknown>>;
  }): GatewayWebhookVerification {
    const p = input.payload as AamarpayWebhookPayload;
    if (!p || typeof p !== 'object') {
      return { valid: false, reason: 'payload must be an object' };
    }
    if (!p.mer_txnid || !p.pay_status) {
      return { valid: false, reason: 'missing mer_txnid or pay_status' };
    }
    return {
      valid: true,
      eventType: p.pay_status,
      externalId: p.pg_txnid,
      paymentId: p.mer_txnid,
    };
  }

  async verifyWithGateway(payload: AamarpayWebhookPayload): Promise<boolean> {
    try {
      const res = await this.client.verifyPayment(payload.mer_txnid);
      const ok =
        res.status_code === '2' ||
        res.pay_status === 'Successful' ||
        res.pay_status === 'Success';
      if (!ok) this.logger.warn(`aamarPay invalid: ${res.status_code} / ${res.pay_status}`);
      return ok;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`aamarPay verify error: ${msg}`);
      return false;
    }
  }
}
