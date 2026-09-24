import { Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';

@Injectable()
export class WebhookSignerService {
  sign(payload: string, secret: string): string {
    return createHmac('sha256', secret).update(payload).digest('hex');
  }

  signObject(obj: Record<string, unknown>, secret: string): string {
    return this.sign(JSON.stringify(obj), secret);
  }
}
