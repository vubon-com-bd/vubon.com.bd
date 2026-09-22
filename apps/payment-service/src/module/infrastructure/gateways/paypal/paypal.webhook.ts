import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PaypalConfig } from './paypal.config';
import type { PaypalWebhookEvent } from './paypal.types';

/**
 * PayPal webhook verification requires calling their verify API.
 * This class only parses the payload and defers verification to the gateway.
 */
@Injectable()
export class PaypalWebhook {
  constructor(private readonly config: PaypalConfig) {}

  async verifySignature(
    rawBody: string,
    headers: Readonly<Record<string, string>>,
  ): Promise<boolean> {
    try {
      const { data } = await axios.post<{ verification_status: string }>(
        `${this.config.baseUrl}/v1/notifications/verify-webhook-signature`,
        {
          auth_algo: headers['paypal-auth-algo'],
          cert_url: headers['paypal-cert-url'],
          transmission_id: headers['paypal-transmission-id'],
          transmission_sig: headers['paypal-transmission-sig'],
          transmission_time: headers['paypal-transmission-time'],
          webhook_id: this.config.webhookId,
          webhook_event: JSON.parse(rawBody) as unknown,
        },
      );
      return data.verification_status === 'SUCCESS';
    } catch {
      return false;
    }
  }

  parse(rawBody: string): PaypalWebhookEvent {
    return JSON.parse(rawBody) as PaypalWebhookEvent;
  }
}
