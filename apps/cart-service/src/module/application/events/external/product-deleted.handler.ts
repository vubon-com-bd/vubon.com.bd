/**
 * ProductDeletedHandler — reacts to product.product.deleted
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import type { ProductDeletedEvent } from './external-event.types.js';

import {
  CART_ITEM_REPOSITORY,
  type CartItemRepository,
} from '../../../domain/repositories/cart-item.repository.interface.js';

export const PRODUCT_DELETED_EVENT = 'product.product.deleted';

@Injectable()
export class ProductDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductDeletedHandler.name);

  constructor(
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_DELETED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductDeletedEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_DELETED_EVENT}"`);
  }

  private async handle(event: ProductDeletedEvent): Promise<void> {
    const { productId } = event.payload;
    this.logger.log(`Received ${PRODUCT_DELETED_EVENT} — productId=${productId}`);

    try {
      const items = await this.itemRepo.findByProductId(productId);
      let updated = 0;
      for (const item of items) {
        if (!item.isRemoved()) {
          item.markUnavailable();
          await this.itemRepo.save(item);
          updated++;
        }
      }
      this.logger.log(`Product ${productId} — ${updated} items marked unavailable`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductDeletedHandler failed: ${msg}`);
    }
  }
}
