/**
 * OrderReturnedHandler — creates return shipments when order is returned
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  SHIPMENT_SERVICE,
  type IShipmentService,
} from '@application/services/interfaces/shipment.service.interface';

export const ORDER_RETURNED_EVENT = 'order.order.returned';

interface OrderReturnedPayload {
  readonly orderId: string;
  readonly returnId: string;
  readonly reason: string;
  readonly returnItemIds: readonly string[];
}

interface OrderEvent {
  readonly id: string;
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderReturnedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderReturnedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderReturnedHandler.name);
  constructor(
    @Inject(SHIPMENT_SERVICE) private readonly shipmentService: IShipmentService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_RETURNED_EVENT, async (event) => {
      try { await this.handle(event as unknown as OrderEvent); }
      catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`OrderReturnedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${ORDER_RETURNED_EVENT}"`);
  }

  private async handle(event: OrderEvent): Promise<void> {
    const p = event.payload;
    if (!p?.orderId) return;
    this.logger.log(`Received order.returned — orderId=${p.orderId}, returnId=${p.returnId}, reason=${p.reason}`);
    try {
      const shipments = await this.shipmentService.listByOrder(p.orderId);
      for (const shipment of shipments.items ?? []) {
        try {
          await this.shipmentService.returnShipment(
            { shipmentId: shipment.id, returnReason: p.reason },
            'system:order-service',
          );
          this.logger.log(`✅ Shipment ${shipment.id} marked returned for order ${p.orderId}`);
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(`Shipment ${shipment.id} return transition failed: ${msg}`);
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Shipments lookup failed for order ${p.orderId}: ${msg}`);
    }
  }
}
