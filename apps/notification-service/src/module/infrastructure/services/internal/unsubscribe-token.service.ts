import { Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';

@Injectable()
export class UnsubscribeTokenService {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.UNSUBSCRIBE_SECRET ?? 'dev-unsubscribe-secret';
  }

  generate(userId: string, channel: string): string {
    const raw = `${userId}:${channel}`;
    return createHmac('sha256', this.secret).update(raw).digest('hex');
  }

  verify(userId: string, channel: string, token: string): boolean {
    return this.generate(userId, channel) === token;
  }
}
