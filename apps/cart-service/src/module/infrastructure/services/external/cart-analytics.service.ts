/**
 * CartAnalyticsService — async analytics event publisher
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { AnalyticsQueue } from '../../queues/analytics.queue.js';

export const CART_ANALYTICS_SERVICE = Symbol('CART_ANALYTICS_SERVICE');

@Injectable()
export class CartAnalyticsService {
  private readonly logger = new Logger(CartAnalyticsService.name);

  constructor(private readonly analyticsQueue: AnalyticsQueue) {}

  async track(
    eventName: string,
    aggregateId: string,
    data: Readonly<Record<string, unknown>> = {},
  ): Promise<void> {
    try {
      await this.analyticsQueue.enqueueEvent({ eventName, aggregateId, data });
      this.logger.debug(`Tracked: ${eventName} [${aggregateId}]`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Analytics track failed: ${msg.slice(0, 100)}`);
    }
  }

  async trackCartCreated(cartId: string, type: string): Promise<void> {
    await this.track('cart.created', cartId, { type });
  }

  async trackItemAdded(cartId: string, productId: string, quantity: number): Promise<void> {
    await this.track('cart.item.added', cartId, { productId, quantity });
  }

  async trackCheckout(cartId: string, orderId: string, total: number): Promise<void> {
    await this.track('cart.checkout', cartId, { orderId, total });
  }

  async trackAbandoned(cartId: string, itemCount: number, cartValue: number): Promise<void> {
    await this.track('cart.abandoned', cartId, { itemCount, cartValue });
  }

  async trackRecovered(abandonedCartId: string, orderId: string): Promise<void> {
    await this.track('cart.recovered', abandonedCartId, { orderId });
  }
}
