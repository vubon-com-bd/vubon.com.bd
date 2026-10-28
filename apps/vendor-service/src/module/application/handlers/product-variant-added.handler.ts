/**
 * ProductVariantAddedHandler — reacts to product.variant.added
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRODUCT_VARIANT_ADDED_EVENT = 'product.variant.added';

@Injectable()
export class ProductVariantAddedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductVariantAddedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_VARIANT_ADDED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log(`📥 product.variant.added: ${JSON.stringify(p)}`);
      // TODO: notify vendor of new variant
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_VARIANT_ADDED_EVENT}"`);
  }
}
