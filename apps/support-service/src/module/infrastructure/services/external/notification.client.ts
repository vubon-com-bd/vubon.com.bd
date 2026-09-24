import { Injectable, Logger } from '@nestjs/common';
import type { ExternalClient, ClientResponse } from './http-client.types';

export interface SendNotificationInput {
  readonly userId: string;
  readonly template: string;
  readonly variables: Readonly<Record<string, string>>;
}

@Injectable()
export class NotificationClient {
  private readonly logger = new Logger(NotificationClient.name);

  constructor(private readonly http: ExternalClient) {}

  async send(input: SendNotificationInput): Promise<boolean> {
    try {
      const res: ClientResponse<{ success: boolean }> =
        await this.http.post<{ success: boolean }>(
          '/notifications/send',
          input,
        );
      return res.data.success;
    } catch (error) {
      this.logger.warn(
        `Failed to send notification: ${error instanceof Error ? error.message : 'unknown'}`,
      );
      return false;
    }
  }
}
