/**
 * ProductUpdatedHandler — audit-only placeholder
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_UPDATED_EVENT = 'product.product.updated';

interface ProductUpdatedPayload {
  readonly productId: string;
  readonly updatedFields?: readonly string[];
}

interface ProductEvent {
  readonly payload: ProductUpdatedPayload;
}

@Injectable()
export class ProductUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductUpdatedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_UPDATED_EVENT, async (event) => {
      try {
        const p = (event as unknown as ProductEvent).payload;
        if (p?.productId) {
          this.logger.log(`Received product.updated — productId=${p.productId}`);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`ProductUpdatedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_UPDATED_EVENT}"`);
  }
}
