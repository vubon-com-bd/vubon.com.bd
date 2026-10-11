/**
 * AnalyticsCollectorService — fire-and-forget event tracking
 * @module notification-service/infrastructure/services/external
 *
 * Facade pattern (like PaymentAnalyticsService). Real sink (Mixpanel/GA) plugs in
 * via this adapter. Non-blocking: errors never break the send path.
 */
import { Injectable, Logger } from '@nestjs/common';

export const ANALYTICS_COLLECTOR_SERVICE = Symbol('ANALYTICS_COLLECTOR_SERVICE');

export interface IAnalyticsCollector {
  track(event: string, properties?: Readonly<Record<string, unknown>>): Promise<void>;
  identify(userId: string, traits?: Readonly<Record<string, unknown>>): Promise<void>;
}

@Injectable()
export class AnalyticsCollectorService implements IAnalyticsCollector {
  private readonly logger = new Logger(AnalyticsCollectorService.name);

  async track(event: string, properties?: Readonly<Record<string, unknown>>): Promise<void> {
    try {
      this.logger.debug(`track ${event} ${JSON.stringify(properties ?? {})}`);
    } catch {
      /* never throw */
    }
  }

  async identify(userId: string, traits?: Readonly<Record<string, unknown>>): Promise<void> {
    try {
      this.logger.debug(`identify ${userId} ${JSON.stringify(traits ?? {})}`);
    } catch {
      /* never throw */
    }
  }
}
