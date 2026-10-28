/**
 * PricingDiscountAppliedHandler — recalculate cart with new discount
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PRICING_DISCOUNT_APPLIED_EVENT = 'product.pricing.discount_applied';

@Injectable()
export class PricingDiscountAppliedHandler implements OnModuleInit {
  private readonly logger = new Logger(PricingDiscountAppliedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRICING_DISCOUNT_APPLIED_EVENT, async (event) => {
      const p = (event as { payload?: { productId?: string; discountPercent?: number } }).payload;
      this.logger.log(`📥 Discount applied: ${p?.productId} → ${p?.discountPercent}%`);
      // TODO: Recalculate affected cart totals
    });
    this.logger.log(`✅ Registered handler for "${PRICING_DISCOUNT_APPLIED_EVENT}"`);
  }
}
