import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface AnalyticsEvent {
  readonly eventType: string;
  readonly entityId: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class AnalyticsClient {
  private readonly logger = new Logger(AnalyticsClient.name);
  private readonly baseUrl = getOptionalEnv('ANALYTICS_SERVICE_URL', 'http://localhost:3008/api/v1');

  constructor(private readonly http: HttpService) {}

  async track(event: AnalyticsEvent): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(`${this.baseUrl}/analytics/events`, event),
      );
    } catch (error) {
      this.logger.warn(`Analytics track failed: ${(error as Error).message}`);
    }
  }
}
