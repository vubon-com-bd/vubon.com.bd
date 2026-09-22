import { Injectable } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { BkashConfig } from './bkash.config';
import type { BkashWebhookBody } from './bkash.types';

@Injectable()
export class BkashWebhook {
  constructor(private readonly config: BkashConfig) {}

  verifySignature(rawBody: string, signature: string): boolean {
    const expected = createHmac('sha256', this.config.webhookSecret)
      .update(rawBody)
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

  parse(rawBody: string): BkashWebhookBody {
    return JSON.parse(rawBody) as BkashWebhookBody;
  }
}
