/**
 * OrderShippedHandler — marks shipment in_transit when order is shipped
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  SHIPMENT_SERVICE,
  type IShipmentService,
} from '@application/services/interfaces/shipment.service.interface';

export const ORDER_SHIPPED_EVENT = 'order.order.shipped';

interface OrderShippedPayload {
  readonly orderId: string;
  readonly fromStatus?: string;
  readonly toStatus: string;
}

interface OrderEvent {
  readonly id: string;
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderShippedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderShippedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderShippedHandler.name);
  constructor(
    @Inject(SHIPMENT_SERVICE) private readonly shipmentService: IShipmentService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_SHIPPED_EVENT, async (event) => {
      try { await this.handle(event as unknown as OrderEvent); }
      catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`OrderShippedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${ORDER_SHIPPED_EVENT}"`);
  }

  private async handle(event: OrderEvent): Promise<void> {
    const orderId = event.payload?.orderId;
    if (!orderId) return;
    this.logger.log(`Received order.shipped — orderId=${orderId}`);
    try {
      const shipments = await this.shipmentService.listByOrder(orderId);
      for (const shipment of shipments.items ?? []) {
        try {
          await this.shipmentService.startTransit(
            { shipmentId: shipment.id, currentLocation: 'in-transit' },
            'system:order-service',
          );
          this.logger.log(`✅ Shipment ${shipment.id} in_transit for order ${orderId}`);
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(`Shipment ${shipment.id} transit transition failed: ${msg}`);
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Shipments lookup failed for order ${orderId}: ${msg}`);
    }
  }
}
