import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

@Injectable()
export class AnalyticsClient {
  private readonly logger = new Logger(AnalyticsClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.ANALYTICS_SERVICE_URL ?? 'http://localhost:3007';
    this.http = axios.create({ baseURL, timeout: 5000 });
  }

  async track(event: string, data: Record<string, unknown>): Promise<void> {
    try {
      await this.http.post('/events', { event, data, timestamp: new Date().toISOString() });
    } catch (error) {
      this.logger.warn(`Analytics track failed: ${String(error)}`);
    }
  }
}
