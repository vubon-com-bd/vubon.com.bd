/**
 * InventoryLowStockHandler — reacts to product.inventory.low_stock
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import type { InventoryLowStockEvent } from './external-event.types.js';

import {
  CART_ITEM_REPOSITORY,
  type CartItemRepository,
} from '../../../domain/repositories/cart-item.repository.interface.js';

export const INVENTORY_LOW_STOCK_EVENT = 'product.inventory.low_stock';

@Injectable()
export class InventoryLowStockHandler implements OnModuleInit {
  private readonly logger = new Logger(InventoryLowStockHandler.name);

  constructor(
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(INVENTORY_LOW_STOCK_EVENT, async (event) => {
      await this.handle(event as unknown as InventoryLowStockEvent);
    });
    this.logger.log(`✅ Registered handler for "${INVENTORY_LOW_STOCK_EVENT}"`);
  }

  private async handle(event: InventoryLowStockEvent): Promise<void> {
    const { productId, available, threshold } = event.payload;
    this.logger.warn(`Low stock: product=${productId} available=${available} threshold=${threshold}`);
    try {
      const items = await this.itemRepo.findByProductId(productId);
      this.logger.log(`Product ${productId} low stock — affects ${items.length} cart items`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`InventoryLowStockHandler failed: ${msg}`);
    }
  }
}
