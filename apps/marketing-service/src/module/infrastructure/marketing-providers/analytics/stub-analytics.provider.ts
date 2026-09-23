import { Injectable, Logger } from '@nestjs/common';
import type { AnalyticsProvider, AnalyticsTrackOptions } from './analytics.interface';

@Injectable()
export class StubAnalyticsProvider implements AnalyticsProvider {
  private readonly logger = new Logger(StubAnalyticsProvider.name);

  async track(options: AnalyticsTrackOptions): Promise<void> {
    this.logger.log(`[STUB] Track: ${options.eventName}`);
  }
}
