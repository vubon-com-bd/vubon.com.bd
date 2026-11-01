/**
 * ProductDeletedHandler — audit-only placeholder
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_DELETED_EVENT = 'product.product.deleted';

interface ProductDeletedPayload {
  readonly productId: string;
  readonly deletedAt: string;
}

interface ProductEvent {
  readonly payload: ProductDeletedPayload;
}

@Injectable()
export class ProductDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductDeletedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_DELETED_EVENT, async (event) => {
      try {
        const p = (event as unknown as ProductEvent).payload;
        if (p?.productId) {
          this.logger.log(`Received product.deleted — productId=${p.productId}`);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`ProductDeletedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_DELETED_EVENT}"`);
  }
}
