import { Injectable } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { CryptoConfig } from './crypto.config';
import type { CryptoWebhookBody } from './crypto.types';

@Injectable()
export class CryptoWebhook {
  constructor(private readonly config: CryptoConfig) {}

  verifySignature(rawBody: string, signature: string): boolean {
    const expected = createHmac('sha256', this.config.rpcUrl)
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

  parse(rawBody: string): CryptoWebhookBody {
    return JSON.parse(rawBody) as CryptoWebhookBody;
  }
}
