import { Injectable } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';

@Injectable()
export class SignatureService {
  sign(payload: string, secret: string): string {
    return createHmac('sha256', secret).update(payload).digest('hex');
  }

  verify(payload: string, signature: string, secret: string): boolean {
    const expected = this.sign(payload, secret);
    try {
      return timingSafeEqual(
        Buffer.from(expected, 'utf8'),
        Buffer.from(signature, 'utf8'),
      );
    } catch {
      return false;
    }
  }

  verifyTimestamped(
    payload: string,
    signature: string,
    secret: string,
    timestamp: number,
    toleranceMs = 5 * 60 * 1000,
  ): boolean {
    if (Math.abs(Date.now() - timestamp) > toleranceMs) return false;
    return this.verify(`${timestamp}.${payload}`, signature, secret);
  }
}
