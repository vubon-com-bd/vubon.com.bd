/**
 * ProductStockChangedHandler — update cart when stock changes
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_STOCK_CHANGED_EVENT = 'product.product.stock_changed';

@Injectable()
export class ProductStockChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductStockChangedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_STOCK_CHANGED_EVENT, async (event) => {
      const p = (event as { payload?: { productId?: string; newStock?: number } }).payload;
      this.logger.warn(`📥 Product stock: ${p?.productId} → ${p?.newStock}`);
      // TODO: Warn cart items if stock is 0 or below item quantity
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_STOCK_CHANGED_EVENT}"`);
  }
}
