/**
 * OrderCancelledHandler — Cancels shipments when order is cancelled
 * @module logistics-service/application/events/external
 *
 * Strategy:
 *  - Listens to `order.order.cancelled`
 *  - Finds all shipments for orderId
 *  - Cancels each (skip if already delivered/returned/cancelled)
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  SHIPMENT_SERVICE,
  type IShipmentService,
} from '@application/services/interfaces/shipment.service.interface';

export const ORDER_CANCELLED_EVENT = 'order.order.cancelled';

interface OrderCancelledPayload {
  readonly orderId: string;
  readonly cancelId: string;
  readonly reason: string;
  readonly cancelledBy: string;
  readonly cancelledAt: string;
}

interface OrderCancelledEvent {
  readonly id: string;
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderCancelledPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderCancelledHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderCancelledHandler.name);

  constructor(
    @Inject(SHIPMENT_SERVICE)
    private readonly shipmentService: IShipmentService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CANCELLED_EVENT, async (event) => {
      try {
        await this.handle(event as unknown as OrderCancelledEvent);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`OrderCancelledHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CANCELLED_EVENT}"`);
  }

  private async handle(event: OrderCancelledEvent): Promise<void> {
    const p = event.payload;
    if (!p?.orderId) {
      this.logger.warn('order.cancelled payload missing orderId — skipping');
      return;
    }

    this.logger.log(
      `Received order.cancelled — orderId=${p.orderId}, reason=${p.reason}`,
    );

    try {
      const shipments = await this.shipmentService.listByOrder(p.orderId);
      if (!shipments.items || shipments.items.length === 0) {
        this.logger.warn(`No shipments found for order ${p.orderId} — skipping`);
        return;
      }

      for (const shipment of shipments.items) {
        try {
          await this.shipmentService.cancel(
            {
              shipmentId: shipment.id,
              reason: `Order cancelled: ${p.reason}`,
            },
            'system:order-service',
          );
          this.logger.log(
            `✅ Shipment ${shipment.id} cancelled for order ${p.orderId}`,
          );
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(
            `Failed to cancel shipment ${shipment.id}: ${msg} (may be final state)`,
          );
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Shipments list failed for order ${p.orderId}: ${msg}`);
    }
  }
}
