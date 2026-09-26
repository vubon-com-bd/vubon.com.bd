import { Injectable } from '@nestjs/common';
import { createHash, timingSafeEqual } from 'node:crypto';
import { SslcommerzConfig } from './sslcommerz.config';
import type { SslcommerzWebhookBody } from './sslcommerz.types';

@Injectable()
export class SslcommerzWebhook {
  constructor(private readonly config: SslcommerzConfig) {}

  verifySignature(body: SslcommerzWebhookBody): boolean {
    const verifyString =
      `${body.tran_id}${body.val_id}${body.amount}${body.status}` +
      this.config.webhookSecret;
    const expected = createHash('sha256').update(verifyString).digest('hex');
    try {
      return timingSafeEqual(
        Buffer.from(expected, 'utf8'),
        Buffer.from(body.verify_sign, 'utf8'),
      );
    } catch {
      return false;
    }
  }

  parse(rawBody: string): SslcommerzWebhookBody {
    const params = new URLSearchParams(rawBody);
    const obj: Record<string, string> = {};
    for (const [k, v] of params.entries()) obj[k] = v;
    return obj as unknown as SslcommerzWebhookBody;
  }
}
