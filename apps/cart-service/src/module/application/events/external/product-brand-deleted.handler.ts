/**
 * ProductBrandDeletedHandler — reacts to product.brand.deleted
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_BRAND_DELETED_EVENT = 'product.brand.deleted';

@Injectable()
export class ProductBrandDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductBrandDeletedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_BRAND_DELETED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log(`📥 product.brand.deleted: ${JSON.stringify(p)}`);
      // TODO: hide cart items from deleted brand
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_BRAND_DELETED_EVENT}"`);
  }
}
