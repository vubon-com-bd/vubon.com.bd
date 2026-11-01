/**
 * OrderConfirmedHandler — Confirms shipment when order is confirmed
 * @module logistics-service/application/events/external
 *
 * Strategy:
 *  - Listens to `order.order.confirmed` AND `order.order.status_changed` (with toStatus='confirmed')
 *  - Finds shipments by orderId
 *  - Confirms each pending shipment
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  SHIPMENT_SERVICE,
  type IShipmentService,
} from '@application/services/interfaces/shipment.service.interface';

export const ORDER_CONFIRMED_EVENT = 'order.order.confirmed';
export const ORDER_STATUS_CHANGED_EVENT = 'order.order.status_changed';

interface OrderStatusChangedPayload {
  readonly orderId: string;
  readonly fromStatus?: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

interface OrderEventWrapper {
  readonly id: string;
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderStatusChangedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderConfirmedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderConfirmedHandler.name);

  constructor(
    @Inject(SHIPMENT_SERVICE)
    private readonly shipmentService: IShipmentService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    // Direct order.order.confirmed
    this.eventBus.registerHandler(ORDER_CONFIRMED_EVENT, async (event) => {
      try {
        await this.handle(event as unknown as OrderEventWrapper, 'confirmed');
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`OrderConfirmedHandler failed: ${msg}`);
      }
    });

    // Filter order.order.status_changed with toStatus='confirmed'
    this.eventBus.registerHandler(ORDER_STATUS_CHANGED_EVENT, async (event) => {
      try {
        const wrapper = event as unknown as OrderEventWrapper;
        if (wrapper.payload?.toStatus !== 'confirmed') return;
        await this.handle(wrapper, 'confirmed');
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`OrderConfirmedHandler (via status_changed) failed: ${msg}`);
      }
    });

    this.logger.log(`✅ Registered handler for "${ORDER_CONFIRMED_EVENT}"`);
  }

  private async handle(event: OrderEventWrapper, targetStatus: string): Promise<void> {
    const orderId = event.payload?.orderId;
    if (!orderId) {
      this.logger.warn('order.confirmed payload missing orderId — skipping');
      return;
    }

    this.logger.log(`Received order.confirmed for orderId=${orderId}`);

    try {
      const shipments = await this.shipmentService.listByOrder(orderId);
      if (!shipments.items || shipments.items.length === 0) {
        this.logger.warn(`No shipments found for order ${orderId} — skipping`);
        return;
      }

      for (const shipment of shipments.items) {
        try {
          await this.shipmentService.confirm(
            { shipmentId: shipment.id },
            'system:order-service',
          );
          this.logger.log(
            `✅ Shipment ${shipment.id} confirmed for order ${orderId}`,
          );
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(
            `Failed to confirm shipment ${shipment.id}: ${msg} (may already be confirmed)`,
          );
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Shipments list failed for order ${orderId}: ${msg}`);
    }
  }
}
