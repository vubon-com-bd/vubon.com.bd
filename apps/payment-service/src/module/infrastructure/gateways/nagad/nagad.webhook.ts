import { Injectable } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { NagadConfig } from './nagad.config';
import type { NagadWebhookBody } from './nagad.types';

@Injectable()
export class NagadWebhook {
  constructor(private readonly config: NagadConfig) {}

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

  parse(rawBody: string): NagadWebhookBody {
    return JSON.parse(rawBody) as NagadWebhookBody;
  }
}
