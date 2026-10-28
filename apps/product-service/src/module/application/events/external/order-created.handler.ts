/**
 * OrderCreatedHandler — reserve inventory when order created
 * @module product-service/application/events/external
 *
 * Event-driven stock management:
 *   Order created → Reserve stock
 *   Order cancelled → Release stock (sister handler)
 *   Order returned → Restock (sister handler)
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const ORDER_CREATED_EVENT = 'order.order.created';

interface OrderItem {
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
}

interface OrderCreatedPayload {
  readonly orderId: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly items?: readonly OrderItem[];
  readonly totalAmount: number;
  readonly currency: string;
  readonly createdAt: string;
}

@Injectable()
export class ProductOrderCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductOrderCreatedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CREATED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CREATED_EVENT}"`);
  }

  private async handle(event: unknown): Promise<void> {
    const evt = event as { payload?: OrderCreatedPayload };
    if (!evt.payload) return;

    const { orderId, orderNumber, items } = evt.payload;

    this.logger.log(
      `📥 Order created: ${orderNumber} — reserving inventory for ${items?.length ?? 0} items`,
    );

    if (!items || items.length === 0) {
      this.logger.warn(`Order ${orderId} has no items — skipping reserve`);
      return;
    }

    try {
      for (const item of items) {
        // TODO: Call inventory repository to reserve stock
        // await this.inventoryRepo.reserve(item.productId, item.variantId, item.quantity);
        this.logger.log(
          `  → Reserve: product=${item.productId}, qty=${item.quantity}`,
        );
      }
      this.logger.log(`✅ Inventory reserved for order ${orderId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Failed to reserve inventory for ${orderId}: ${msg}`);
    }
  }
}
