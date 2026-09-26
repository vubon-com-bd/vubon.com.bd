import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface NotificationPayload {
  readonly userId: string;
  readonly channel: 'email' | 'sms' | 'push';
  readonly template: string;
  readonly variables: Readonly<Record<string, string>>;
}

@Injectable()
export class NotificationClient {
  private readonly logger = new Logger(NotificationClient.name);
  private readonly baseUrl = getOptionalEnv('NOTIFICATION_SERVICE_URL', 'http://localhost:3007/api/v1');

  constructor(private readonly http: HttpService) {}

  async send(payload: NotificationPayload): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(`${this.baseUrl}/notifications`, payload),
      );
    } catch (error) {
      this.logger.warn(`Notification failed: ${(error as Error).message}`);
    }
  }
}
