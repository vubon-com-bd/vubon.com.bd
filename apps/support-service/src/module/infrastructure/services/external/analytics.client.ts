import { Injectable, Logger } from '@nestjs/common';
import type { ExternalClient, ClientResponse } from './http-client.types';

export interface TrackEventInput {
  readonly eventType: string;
  readonly entityId: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class AnalyticsClient {
  private readonly logger = new Logger(AnalyticsClient.name);

  constructor(private readonly http: ExternalClient) {}

  async track(input: TrackEventInput): Promise<boolean> {
    try {
      const res: ClientResponse<{ success: boolean }> =
        await this.http.post<{ success: boolean }>('/analytics/track', input);
      return res.data.success;
    } catch (error) {
      this.logger.warn(
        `Failed to track event: ${error instanceof Error ? error.message : 'unknown'}`,
      );
      return false;
    }
  }
}
