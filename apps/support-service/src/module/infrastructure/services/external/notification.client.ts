/**
 * NotificationClient — sends notifications via notification-service
 * @module support-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';

export interface SendNotificationInput {
  readonly recipientId: string;
  readonly channel: 'email' | 'sms' | 'push' | 'in_app';
  readonly template: string;
  readonly data: Readonly<Record<string, unknown>>;
}

@Injectable()
export class NotificationClient {
  private readonly logger = new Logger(NotificationClient.name);
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:3005';
  }

  async send(input: SendNotificationInput): Promise<void> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(`${this.baseUrl}/notifications/send`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(input),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!response.ok) {
        this.logger.warn(
          `NotificationClient.send failed: ${response.status}`,
        );
      }
    } catch (error) {
      this.logger.warn(
        `NotificationClient.send error: ${(error as Error).message}`,
      );
    }
  }
}
