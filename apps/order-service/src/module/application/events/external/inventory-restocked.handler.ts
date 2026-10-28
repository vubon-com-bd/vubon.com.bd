/**
 * InventoryRestockedHandler — confirms restock (returns)
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const INVENTORY_RESTOCKED_EVENT = 'product.inventory.restocked';

@Injectable()
export class InventoryRestockedHandler implements OnModuleInit {
  private readonly logger = new Logger(InventoryRestockedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(INVENTORY_RESTOCKED_EVENT, async (event) => {
      const p = (event as { payload?: { orderId?: string; returnId?: string } }).payload;
      this.logger.log(`📥 Inventory restocked for return: ${p?.returnId ?? p?.orderId}`);
    });
    this.logger.log(`✅ Registered handler for "${INVENTORY_RESTOCKED_EVENT}"`);
  }
}
