import { Injectable } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { RocketConfig } from './rocket.config';
import type { RocketWebhookBody } from './rocket.types';

@Injectable()
export class RocketWebhook {
  constructor(private readonly config: RocketConfig) {}

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

  parse(rawBody: string): RocketWebhookBody {
    return JSON.parse(rawBody) as RocketWebhookBody;
  }
}
