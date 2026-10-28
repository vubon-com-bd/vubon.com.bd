/**
 * ProductStatusChangedHandler — update cart when product status changes
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_STATUS_CHANGED_EVENT = 'product.product.status_changed';

@Injectable()
export class ProductStatusChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductStatusChangedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_STATUS_CHANGED_EVENT, async (event) => {
      const p = (event as { payload?: { productId?: string; toStatus?: string } }).payload;
      this.logger.log(`📥 Product status changed: ${p?.productId} → ${p?.toStatus}`);
      // TODO: Update cart items availability
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_STATUS_CHANGED_EVENT}"`);
  }
}
