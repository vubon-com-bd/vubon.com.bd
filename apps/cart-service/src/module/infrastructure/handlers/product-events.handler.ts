/**
 * ProductEventsHandler — cross-service consumer for product events
 * @module cart-service/infrastructure/handlers
 *
 * Strategy: LAZY INVALIDATION
 *   On product change → mark productId as "stale" in a Redis set.
 *   Cart read paths (future enhancement) check the set and trigger
 *   recalculation, keeping read latency low and avoiding cross-cart loops.
 *
 * Events consumed:
 *   - product.price.changed   → mark stale (cart totals need recalc)
 *   - product.updated         → mark stale
 *   - product.status.changed  → mark stale
 *   - product.deleted         → mark stale
 *   - product.archived        → mark stale
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const STALE_SET_KEY = 'cart:stale-products';
const STALE_TTL_SECONDS = 86400; // 24h — cart items older than this are auto-cleaned anyway

interface ProductEventPayload {
  readonly productId: string;
}

interface DomainEventEnvelope {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
}

@Injectable()
export class ProductEventsHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductEventsHandler.name);

  constructor(
    private readonly eventBus: EventBusService,
    private readonly redis: RedisService,
  ) {}

  onModuleInit(): void {
    const productEvents = [
      'product.price.changed',
      'product.updated',
      'product.status.changed',
      'product.deleted',
      'product.archived',
    ];

    for (const type of productEvents) {
      this.eventBus.registerHandler(type, async (event) => {
        const env = event as unknown as DomainEventEnvelope;
        const payload = env.payload as ProductEventPayload;
        await this.markStale(payload.productId, type);
      });
    }

    this.logger.log(
      `🔗 ProductEventsHandler subscribed to product.price.changed/updated/status.changed/deleted/archived on domain-events queue`,
    );
  }

  /** Add productId to the global stale set with rolling TTL. */
  private async markStale(productId: string, reason: string): Promise<void> {
    if (!productId) {
      this.logger.warn(`⚠️ Received ${reason} without productId — skipping`);
      return;
    }
    try {
      await this.redis.raw.sadd(STALE_SET_KEY, productId);
      await this.redis.raw.expire(STALE_SET_KEY, STALE_TTL_SECONDS);
      this.logger.log(`🚩 Marked product ${productId} stale (reason=${reason})`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`❌ Failed to mark stale product ${productId}: ${msg}`);
      // Do NOT rethrow — BullMQ worker keeps consuming
    }
  }
}
