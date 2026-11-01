/**
 * ProductCategoryActivatedHandler — reacts to product.category.activated
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_CATEGORY_ACTIVATED_EVENT = 'product.category.activated';

@Injectable()
export class ProductCategoryActivatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCategoryActivatedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_CATEGORY_ACTIVATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log(`📥 product.category.activated: ${JSON.stringify(p)}`);
      // TODO: re-enable cart items in newly active category
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_CATEGORY_ACTIVATED_EVENT}"`);
  }
}
