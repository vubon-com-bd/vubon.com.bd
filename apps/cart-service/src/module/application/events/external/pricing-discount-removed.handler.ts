/**
 * PricingDiscountRemovedHandler — recalculate cart without discount
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRICING_DISCOUNT_REMOVED_EVENT = 'product.pricing.discount_removed';

@Injectable()
export class PricingDiscountRemovedHandler implements OnModuleInit {
  private readonly logger = new Logger(PricingDiscountRemovedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRICING_DISCOUNT_REMOVED_EVENT, async (event) => {
      const p = (event as { payload?: { productId?: string } }).payload;
      this.logger.log(`📥 Discount removed: ${p?.productId} — recalculating`);
      // TODO: Recalculate affected cart totals
    });
    this.logger.log(`✅ Registered handler for "${PRICING_DISCOUNT_REMOVED_EVENT}"`);
  }
}
