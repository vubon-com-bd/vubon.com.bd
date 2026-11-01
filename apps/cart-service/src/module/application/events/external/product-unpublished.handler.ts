/**
 * ProductUnpublishedHandler — remove/hide unpublished product from cart
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_UNPUBLISHED_EVENT = 'product.product.unpublished';

@Injectable()
export class ProductUnpublishedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductUnpublishedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_UNPUBLISHED_EVENT, async (event) => {
      const p = (event as { payload?: { productId?: string } }).payload;
      this.logger.warn(`📥 Product unpublished: ${p?.productId} — hiding from cart`);
      // TODO: Mark cart items unavailable, notify user
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_UNPUBLISHED_EVENT}"`);
  }
}
