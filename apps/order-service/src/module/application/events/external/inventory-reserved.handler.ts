/**
 * InventoryReservedHandler — confirms inventory reservation
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const INVENTORY_RESERVED_EVENT = 'product.inventory.reserved';

@Injectable()
export class InventoryReservedHandler implements OnModuleInit {
  private readonly logger = new Logger(InventoryReservedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(INVENTORY_RESERVED_EVENT, async (event) => {
      const p = (event as { payload?: { orderId?: string; productId?: string } }).payload;
      this.logger.log(`📥 Inventory reserved for order: ${p?.orderId}`);
      // TODO: Mark order's inventory as reserved
    });
    this.logger.log(`✅ Registered handler for "${INVENTORY_RESERVED_EVENT}"`);
  }
}
