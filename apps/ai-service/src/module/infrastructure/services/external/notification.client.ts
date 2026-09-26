import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

interface NotifyInput {
  readonly userId: string;
  readonly type: string;
  readonly title: string;
  readonly body: string;
  readonly metadata?: Record<string, unknown>;
}

@Injectable()
export class NotificationClient {
  private readonly logger = new Logger(NotificationClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: getOptionalEnv('NOTIFICATION_SERVICE_URL', 'http://localhost:3007'),
      timeout: getOptionalEnvInt('NOTIFICATION_SERVICE_TIMEOUT_MS', 5000),
    });
  }

  async send(input: NotifyInput): Promise<boolean> {
    try {
      await this.http.post('/notifications', input);
      return true;
    } catch (error) {
      this.logger.warn(`Notification send failed for ${input.userId}`, error);
      return false;
    }
  }
}
