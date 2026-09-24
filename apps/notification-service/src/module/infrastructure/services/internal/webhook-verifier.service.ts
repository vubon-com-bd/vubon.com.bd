import { Injectable } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';

@Injectable()
export class WebhookVerifierService {
  verify(payload: string, signature: string, secret: string): boolean {
    const expected = createHmac('sha256', secret).update(payload).digest('hex');
    if (expected.length !== signature.length) return false;
    try {
      return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
    } catch {
      return false;
    }
  }
}
