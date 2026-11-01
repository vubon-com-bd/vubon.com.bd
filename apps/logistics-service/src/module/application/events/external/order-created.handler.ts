/**
 * OrderCreatedHandler — auto-creates shipment on order.created
 * @module logistics-service/application/events/external
 *
 * ⚠️ Order service-এর OrderCreatedPayload-এ items/shippingAddress নেই।
 * Available: orderId, orderNumber, customerId, totalAmount, currency, itemCount.
 *
 * Strategy: Generic placeholder item তৈরি করি (order.totalAmount থেকে),
 * shippingAddress = TBD (পর্যায়ক্রমে order.get API call বা enrichment হবে)।
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  SHIPMENT_SERVICE,
  type IShipmentService,
} from '@application/services/interfaces/shipment.service.interface';

export const ORDER_CREATED_EVENT = 'order.order.created';

interface OrderCreatedPayload {
  readonly orderId: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly customerEmail?: string;
  readonly customerName?: string;
  readonly totalAmount: number;
  readonly currency: string;
  readonly itemCount: number;
  readonly createdAt: string;
}

interface OrderCreatedEvent {
  readonly id: string;
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderCreatedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderCreatedHandler.name);

  constructor(
    @Inject(SHIPMENT_SERVICE)
    private readonly shipmentService: IShipmentService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CREATED_EVENT, async (event) => {
      try {
        await this.handle(event as unknown as OrderCreatedEvent);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`OrderCreatedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CREATED_EVENT}"`);
  }

  private async handle(event: OrderCreatedEvent): Promise<void> {
    const p = event.payload;
    if (!p?.orderId) {
      this.logger.warn('order.created payload missing orderId — skipping');
      return;
    }

    this.logger.log(
      `Received order.created — orderId=${p.orderId} (${p.orderNumber}), items=${p.itemCount}`,
    );

    try {
      // Payload-এ items নেই — placeholder item বানাই
      // এটা পরবর্তীতে order API call বা event enrichment দিয়ে fix হবে
      const placeholderItem = {
        sku: `ORDER-${p.orderNumber}`,
        name: `Order ${p.orderNumber} contents`,
        quantity: p.itemCount || 1,
        unitPrice: p.totalAmount / (p.itemCount || 1),
        currency: p.currency,
      };

      await this.shipmentService.create(
        {
          orderId: p.orderId,
          userId: p.customerId,
          type: 'standard',
          priority: 'normal',
          shippingAddress: `TBD — Order #${p.orderNumber} (customerId: ${p.customerId})`,
          items: [placeholderItem],
          currency: p.currency,
        },
        'system',
      );

      this.logger.log(
        `✅ Shipment auto-created for order ${p.orderId} (placeholder — needs enrichment)`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Shipment auto-create failed for order ${p.orderId}: ${msg}`);
    }
  }
}
