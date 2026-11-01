/**
 * OrderCancelledHandler — release reserved inventory
 * @module product-service/application/events/external
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const ORDER_CANCELLED_EVENT = 'order.order.cancelled';

interface OrderItem {
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
}

interface OrderCancelledPayload {
  readonly orderId: string;
  readonly items?: readonly OrderItem[];
  readonly reason?: string;
  readonly cancelledAt: string;
}

@Injectable()
export class ProductOrderCancelledHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductOrderCancelledHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CANCELLED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CANCELLED_EVENT}"`);
  }

  private async handle(event: unknown): Promise<void> {
    const evt = event as { payload?: OrderCancelledPayload };
    if (!evt.payload) return;

    const { orderId, items, reason } = evt.payload;

    this.logger.log(
      `📥 Order cancelled: ${orderId}, reason=${reason ?? 'N/A'} — releasing inventory`,
    );

    if (!items || items.length === 0) {
      this.logger.warn(`Order ${orderId} has no items in payload`);
      return;
    }

    try {
      for (const item of items) {
        // TODO: Call inventory repository to release stock
        // await this.inventoryRepo.release(item.productId, item.variantId, item.quantity);
        this.logger.log(
          `  → Release: product=${item.productId}, qty=${item.quantity}`,
        );
      }
      this.logger.log(`✅ Inventory released for order ${orderId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Failed to release inventory for ${orderId}: ${msg}`);
    }
  }
}
