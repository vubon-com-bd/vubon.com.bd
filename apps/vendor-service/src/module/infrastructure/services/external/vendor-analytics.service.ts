/**
 * VendorAnalyticsService — enqueue analytics events
 * @module vendor-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';

export const VENDOR_ANALYTICS_SERVICE = Symbol('VENDOR_ANALYTICS_SERVICE');

@Injectable()
export class VendorAnalyticsService {
  private readonly logger = new Logger(VendorAnalyticsService.name);

  async track(
    vendorId: string,
    eventType: string,
    data?: Readonly<Record<string, unknown>>,
  ): Promise<void> {
    // Fire-and-forget — real impl would enqueue to analytics queue
    this.logger.debug(
      `[analytics] ${eventType} → vendor=${vendorId} data=${JSON.stringify(data ?? {})}`,
    );
  }

  async trackBatch(
    events: readonly {
      readonly vendorId: string;
      readonly eventType: string;
      readonly data?: Readonly<Record<string, unknown>>;
    }[],
  ): Promise<void> {
    for (const e of events) {
      await this.track(e.vendorId, e.eventType, e.data);
    }
  }
}
