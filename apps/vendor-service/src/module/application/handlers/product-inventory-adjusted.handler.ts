/**
 * ProductInventoryAdjustedHandler — reacts to product.inventory.adjusted
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_INVENTORY_ADJUSTED_EVENT = 'product.inventory.adjusted';

@Injectable()
export class ProductInventoryAdjustedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductInventoryAdjustedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_INVENTORY_ADJUSTED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log(`📥 product.inventory.adjusted: ${JSON.stringify(p)}`);
      // TODO: alert vendor of stock adjustment
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_INVENTORY_ADJUSTED_EVENT}"`);
  }
}
