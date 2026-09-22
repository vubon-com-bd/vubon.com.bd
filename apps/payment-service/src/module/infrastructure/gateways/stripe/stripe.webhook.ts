import { Injectable } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { StripeConfig } from './stripe.config';
import type { StripeWebhookEvent } from './stripe.types';

@Injectable()
export class StripeWebhook {
  constructor(private readonly config: StripeConfig) {}

  verifySignature(rawBody: string, signatureHeader: string): boolean {
    const parts = signatureHeader.split(',').reduce<Record<string, string>>(
      (acc, part) => {
        const [k, v] = part.split('=');
        if (k && v) acc[k] = v;
        return acc;
      },
      {},
    );
    const timestamp = parts['t'];
    const signature = parts['v1'];
    if (!timestamp || !signature) return false;

    const payload = `${timestamp}.${rawBody}`;
    const expected = createHmac('sha256', this.config.webhookSecret)
      .update(payload)
      .digest('hex');

    try {
      return timingSafeEqual(
        Buffer.from(expected, 'utf8'),
        Buffer.from(signature, 'utf8'),
      );
    } catch {
      return false;
    }
  }

  parse(rawBody: string): StripeWebhookEvent {
    return JSON.parse(rawBody) as StripeWebhookEvent;
  }
}
