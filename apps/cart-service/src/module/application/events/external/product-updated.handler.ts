/**
 * ProductUpdatedHandler — reacts to product.product.updated
 * @module cart-service/application/events/external
 *
 * Registers with kernel EventBusService (cross-service events).
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import type { ProductUpdatedEvent } from './external-event.types.js';

import {
  CART_ITEM_REPOSITORY,
  type CartItemRepository,
} from '../../../domain/repositories/cart-item.repository.interface.js';

export const PRODUCT_UPDATED_EVENT = 'product.product.updated';

@Injectable()
export class ProductUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductUpdatedHandler.name);

  constructor(
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_UPDATED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductUpdatedEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_UPDATED_EVENT}"`);
  }

  private async handle(event: ProductUpdatedEvent): Promise<void> {
    const { productId, isAvailable } = event.payload;

    this.logger.log(
      `Received ${PRODUCT_UPDATED_EVENT} — productId=${productId}, available=${isAvailable}`
    );

    try {
      const items = await this.itemRepo.findByProductId(productId);
      if (items.length === 0) return;

      let updated = 0;
      for (const item of items) {
        if (isAvailable === false && item.isActive()) {
          item.markUnavailable();
          await this.itemRepo.save(item);
          updated++;
        }
      }
      this.logger.log(`Product ${productId} — ${updated}/${items.length} items updated`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductUpdatedHandler failed: ${msg}`);
    }
  }
}
