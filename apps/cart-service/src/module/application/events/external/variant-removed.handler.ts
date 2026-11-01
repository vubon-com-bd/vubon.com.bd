/**
 * VariantRemovedHandler — remove variant items from cart
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VARIANT_REMOVED_EVENT = 'product.variant.removed';

@Injectable()
export class VariantRemovedHandler implements OnModuleInit {
  private readonly logger = new Logger(VariantRemovedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VARIANT_REMOVED_EVENT, async (event) => {
      const p = (event as { payload?: { variantId?: string } }).payload;
      this.logger.warn(`📥 Variant removed: ${p?.variantId} — removing from carts`);
      // TODO: Remove cart items referencing this variant
    });
    this.logger.log(`✅ Registered handler for "${VARIANT_REMOVED_EVENT}"`);
  }
}
