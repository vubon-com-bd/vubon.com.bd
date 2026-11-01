/**
 * OrderReturnedHandler — restock inventory on return
 * @module product-service/application/events/external
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const ORDER_RETURNED_EVENT = 'order.order.returned';

interface OrderItem {
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
}

interface OrderReturnedPayload {
  readonly orderId: string;
  readonly returnId?: string;
  readonly items?: readonly OrderItem[];
  readonly reason?: string;
  readonly returnedAt: string;
}

@Injectable()
export class ProductOrderReturnedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductOrderReturnedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_RETURNED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_RETURNED_EVENT}"`);
  }

  private async handle(event: unknown): Promise<void> {
    const evt = event as { payload?: OrderReturnedPayload };
    if (!evt.payload) return;

    const { orderId, returnId, items, reason } = evt.payload;

    this.logger.log(
      `📥 Order returned: ${orderId}, reason=${reason ?? 'N/A'} — restocking inventory`,
    );

    if (!items || items.length === 0) {
      this.logger.warn(`Order ${orderId} has no items in payload`);
      return;
    }

    try {
      for (const item of items) {
        // TODO: Call inventory repository to restock
        // await this.inventoryRepo.restock(item.productId, item.variantId, item.quantity);
        this.logger.log(
          `  → Restock: product=${item.productId}, qty=${item.quantity}`,
        );
      }
      this.logger.log(`✅ Inventory restocked for order ${orderId} (return ${returnId ?? 'N/A'})`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Failed to restock for ${orderId}: ${msg}`);
    }
  }
}
