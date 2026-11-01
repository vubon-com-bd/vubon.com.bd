/**
 * ProductVariantUpdatedHandler — validate order line references
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_VARIANT_UPDATED_EVENT = 'product.variant.updated';

@Injectable()
export class ProductVariantUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductVariantUpdatedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_VARIANT_UPDATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log(`📥 product.variant.updated: ${JSON.stringify(p)}`);
      // TODO: validate if variant is referenced in active orders
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_VARIANT_UPDATED_EVENT}"`);
  }
}
