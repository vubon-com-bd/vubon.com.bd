/**
 * ProductCategoryDeletedHandler — reacts to product.category.deleted
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_CATEGORY_DELETED_EVENT = 'product.category.deleted';

@Injectable()
export class ProductCategoryDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCategoryDeletedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_CATEGORY_DELETED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log(`📥 product.category.deleted: ${JSON.stringify(p)}`);
      // TODO: hide cart items from deleted category
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_CATEGORY_DELETED_EVENT}"`);
  }
}
