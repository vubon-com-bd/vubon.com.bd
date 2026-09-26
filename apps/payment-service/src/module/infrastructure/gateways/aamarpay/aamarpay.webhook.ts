import { Injectable } from '@nestjs/common';
import { createHash, timingSafeEqual } from 'node:crypto';
import { AamarpayConfig } from './aamarpay.config';
import type { AamarpayWebhookBody } from './aamarpay.types';

@Injectable()
export class AamarpayWebhook {
  constructor(private readonly config: AamarpayConfig) {}

  verifySignature(body: AamarpayWebhookBody): boolean {
    const verifyString =
      `${body.mer_txnid}${body.pg_txnid}${body.amount}${body.pay_status}` +
      this.config.signatureKey;
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

  parse(rawBody: string): AamarpayWebhookBody {
    const params = new URLSearchParams(rawBody);
    const obj: Record<string, string> = {};
    for (const [k, v] of params.entries()) obj[k] = v;
    return obj as unknown as AamarpayWebhookBody;
  }
}
