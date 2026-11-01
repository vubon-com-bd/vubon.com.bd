/**
 * ProductCategoryDeactivatedHandler — reacts to product.category.deactivated
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_CATEGORY_DEACTIVATED_EVENT = 'product.category.deactivated';

@Injectable()
export class ProductCategoryDeactivatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCategoryDeactivatedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_CATEGORY_DEACTIVATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log(`📥 product.category.deactivated: ${JSON.stringify(p)}`);
      // TODO: disable cart items in deactivated category
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_CATEGORY_DEACTIVATED_EVENT}"`);
  }
}
