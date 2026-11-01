/**
 * InventoryOutOfStockHandler — reacts to product.inventory.out_of_stock
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import type { InventoryOutOfStockEvent } from './external-event.types.js';

import {
  CART_ITEM_REPOSITORY,
  type CartItemRepository,
} from '../../../domain/repositories/cart-item.repository.interface.js';

export const INVENTORY_OUT_OF_STOCK_EVENT = 'product.inventory.out_of_stock';

@Injectable()
export class InventoryOutOfStockHandler implements OnModuleInit {
  private readonly logger = new Logger(InventoryOutOfStockHandler.name);

  constructor(
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(INVENTORY_OUT_OF_STOCK_EVENT, async (event) => {
      await this.handle(event as unknown as InventoryOutOfStockEvent);
    });
    this.logger.log(`✅ Registered handler for "${INVENTORY_OUT_OF_STOCK_EVENT}"`);
  }

  private async handle(event: InventoryOutOfStockEvent): Promise<void> {
    const { productId } = event.payload;
    this.logger.warn(`Out of stock: product=${productId}`);
    try {
      const items = await this.itemRepo.findByProductId(productId);
      let updated = 0;
      for (const item of items) {
        if (item.isActive()) {
          item.markOutOfStock();
          await this.itemRepo.save(item);
          updated++;
        }
      }
      this.logger.log(`Product ${productId} — ${updated} items marked out_of_stock`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`InventoryOutOfStockHandler failed: ${msg}`);
    }
  }
}
