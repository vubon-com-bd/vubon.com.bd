/**
 * InventoryReleasedHandler — confirms inventory release
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const INVENTORY_RELEASED_EVENT = 'product.inventory.released';

@Injectable()
export class InventoryReleasedHandler implements OnModuleInit {
  private readonly logger = new Logger(InventoryReleasedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(INVENTORY_RELEASED_EVENT, async (event) => {
      const p = (event as { payload?: { orderId?: string } }).payload;
      this.logger.log(`📥 Inventory released for order: ${p?.orderId}`);
    });
    this.logger.log(`✅ Registered handler for "${INVENTORY_RELEASED_EVENT}"`);
  }
}
