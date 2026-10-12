/**
 * InventoryEventsHandler — cross-service consumer for inventory events
 * @module cart-service/infrastructure/handlers
 *
 * Strategy: LAZY INVALIDATION (mirrors ProductEventsHandler).
 * Stock-related changes mark the productId stale so cart recalculation
 * (or availability re-check) can happen on next read.
 *
 * Events consumed:
 *   - inventory.out_of_stock  → mark stale (items should show unavailable)
 *   - inventory.low_stock     → mark stale (warning)
 *   - inventory.back_in_stock → mark stale (clear unavailable)
 *   - inventory.adjusted      → mark stale
 *   - inventory.stock.restocked → mark stale
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const STALE_SET_KEY = 'cart:stale-products';
const STALE_TTL_SECONDS = 86400;

interface InventoryEventPayload {
  readonly productId: string;
  readonly variantId?: string;
}

interface DomainEventEnvelope {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
}

@Injectable()
export class InventoryEventsHandler implements OnModuleInit {
  private readonly logger = new Logger(InventoryEventsHandler.name);

  constructor(
    private readonly eventBus: EventBusService,
    private readonly redis: RedisService,
  ) {}

  onModuleInit(): void {
    const inventoryEvents = [
      'inventory.out_of_stock',
      'inventory.low_stock',
      'inventory.back_in_stock',
      'inventory.adjusted',
      'inventory.stock.restocked',
    ];

    for (const type of inventoryEvents) {
      this.eventBus.registerHandler(type, async (event) => {
        const env = event as unknown as DomainEventEnvelope;
        const payload = env.payload as InventoryEventPayload;
        await this.markStale(payload.productId, type);
      });
    }

    this.logger.log(
      `🔗 InventoryEventsHandler subscribed to inventory.* events on domain-events queue`,
    );
  }

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
    }
  }
}
