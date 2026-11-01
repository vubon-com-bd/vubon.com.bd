/**
 * NotificationClient — HTTP client for notification-service
 * @module vendor-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';

export interface NotifyInput {
  readonly userId: string;
  readonly channel: 'email' | 'sms' | 'push' | 'in-app';
  readonly template: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface NotifyResult {
  readonly sent: boolean;
}

@Injectable()
export class NotificationClient {
  private readonly logger = new Logger(NotificationClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = process.env['NOTIFICATION_SERVICE_URL'] ?? 'http://localhost:3005';
    this.timeoutMs = Number(process.env['NOTIFICATION_SERVICE_TIMEOUT'] ?? '5000');
  }

  async send(input: NotifyInput): Promise<NotifyResult> {
    try {
      const res = await fetch(`${this.baseUrl}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      return { sent: res.ok };
    } catch (err) {
      this.logger.warn(`notification dispatch failed: ${err instanceof Error ? err.message : 'unknown'}`);
      return { sent: false };
    }
  }
}
