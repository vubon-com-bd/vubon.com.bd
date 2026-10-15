/**
 * PricingChangedHandler — reacts to product.pricing.changed
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import type { ProductPriceChangedEvent } from './external-event.types.js';

import {
  CART_ITEM_REPOSITORY,
  type CartItemRepository,
} from '../../../domain/repositories/cart-item.repository.interface.js';

export const PRICING_CHANGED_EVENT = 'product.pricing.changed';

@Injectable()
export class PricingChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(PricingChangedHandler.name);

  constructor(
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRICING_CHANGED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductPriceChangedEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRICING_CHANGED_EVENT}"`);
  }

  private async handle(event: ProductPriceChangedEvent): Promise<void> {
    const { productId, oldPrice, newPrice, currency } = event.payload;
    this.logger.log(`Price changed: product=${productId} ${oldPrice} → ${newPrice} ${currency}`);
    try {
      const items = await this.itemRepo.findByProductId(productId);
      let updated = 0;
      for (const item of items) {
        if (item.unitPrice !== newPrice) {
          item.updateUnitPrice(newPrice);
          await this.itemRepo.save(item);
          updated++;
        }
      }
      this.logger.log(`Product ${productId} — ${updated} items price-synced`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`PricingChangedHandler failed: ${msg}`);
    }
  }
}
