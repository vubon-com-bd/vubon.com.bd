/**
 * ProductCreatedHandler — audit-only placeholder (product info caching)
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_CREATED_EVENT = 'product.product.created';

interface ProductCreatedPayload {
  readonly productId: string;
  readonly name?: string;
  readonly sku?: string;
  readonly createdAt: string;
}

interface ProductEvent {
  readonly id: string;
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductCreatedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCreatedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_CREATED_EVENT, async (event) => {
      try {
        const p = (event as unknown as ProductEvent).payload;
        if (p?.productId) {
          this.logger.log(`Received product.created — productId=${p.productId}, sku=${p.sku ?? 'N/A'}`);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`ProductCreatedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_CREATED_EVENT}"`);
  }
}
