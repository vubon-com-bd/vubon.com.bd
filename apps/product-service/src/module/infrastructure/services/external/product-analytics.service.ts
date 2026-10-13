/**
 * ProductAnalyticsService — emits product analytics events
 * @module product-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';

export const PRODUCT_ANALYTICS_SERVICE = Symbol('PRODUCT_ANALYTICS_SERVICE');

export interface ProductAnalyticsEvent {
  readonly aggregateId: string;
  readonly eventName: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
}

export interface IProductAnalyticsService {
  record(event: Omit<ProductAnalyticsEvent, 'occurredAt'>): Promise<boolean>;
}

@Injectable()
export class ProductAnalyticsService implements IProductAnalyticsService {
  private readonly logger = new Logger(ProductAnalyticsService.name);

  async record(event: Omit<ProductAnalyticsEvent, 'occurredAt'>): Promise<boolean> {
    const occurredAt = new Date().toISOString();
    this.logger.debug(
      `[analytics] ${event.eventName} ← ${event.aggregateId} @ ${occurredAt}`,
    );
    return true;
  }
}
