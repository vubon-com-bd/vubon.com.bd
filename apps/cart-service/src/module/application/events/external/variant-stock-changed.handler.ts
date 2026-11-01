/**
 * VariantStockChangedHandler — update cart when variant stock changes
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VARIANT_STOCK_CHANGED_EVENT = 'product.variant.stock_changed';

@Injectable()
export class VariantStockChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(VariantStockChangedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VARIANT_STOCK_CHANGED_EVENT, async (event) => {
      const p = (event as { payload?: { variantId?: string; newStock?: number } }).payload;
      this.logger.warn(`📥 Variant stock: ${p?.variantId} → ${p?.newStock}`);
      // TODO: Update cart item availability
    });
    this.logger.log(`✅ Registered handler for "${VARIANT_STOCK_CHANGED_EVENT}"`);
  }
}
