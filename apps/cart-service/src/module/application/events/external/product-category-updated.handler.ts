/**
 * ProductCategoryUpdatedHandler — reacts to product.category.updated
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_CATEGORY_UPDATED_EVENT = 'product.category.updated';

@Injectable()
export class ProductCategoryUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCategoryUpdatedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_CATEGORY_UPDATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log(`📥 product.category.updated: ${JSON.stringify(p)}`);
      // TODO: refresh cart item category info
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_CATEGORY_UPDATED_EVENT}"`);
  }
}
