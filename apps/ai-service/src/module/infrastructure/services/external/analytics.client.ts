import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

interface AnalyticsEvent {
  readonly eventType: string;
  readonly userId?: string;
  readonly metadata?: Record<string, unknown>;
}

@Injectable()
export class AnalyticsClient {
  private readonly logger = new Logger(AnalyticsClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: getOptionalEnv('ANALYTICS_SERVICE_URL', 'http://localhost:3008'),
      timeout: getOptionalEnvInt('ANALYTICS_SERVICE_TIMEOUT_MS', 5000),
    });
  }

  async track(event: AnalyticsEvent): Promise<void> {
    try {
      await this.http.post('/analytics/track', event);
    } catch (error) {
      this.logger.warn(`Analytics track failed: ${event.eventType}`, error);
    }
  }
}
