import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface NotificationPayload {
  readonly type: string;
  readonly recipientId: string;
  readonly title: string;
  readonly body: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class NotificationHttpClient {
  private readonly logger = new Logger(NotificationHttpClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL =
      process.env.NOTIFICATION_SERVICE_URL ?? 'http://notification-service:3000';
    this.http = axios.create({
      baseURL,
      timeout: 5000,
      headers: { 'X-Internal-Caller': 'analytics-service' },
    });
  }

  async send(payload: NotificationPayload): Promise<boolean> {
    try {
      await this.http.post('/notifications', payload);
      return true;
    } catch (error) {
      this.logger.warn(`Failed to send notification: ${String(error)}`);
      return false;
    }
  }
}
