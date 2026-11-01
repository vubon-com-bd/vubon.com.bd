/**
 * PaymentFailedHandler — Puts shipment on hold when payment fails
 * @module logistics-service/application/events/external
 *
 * Strategy:
 *  - Listens to `payment.payment.failed`
 *  - Finds shipments for orderId
 *  - Puts each pending/confirmed shipment on hold (payment issue)
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  SHIPMENT_SERVICE,
  type IShipmentService,
} from '@application/services/interfaces/shipment.service.interface';

export const PAYMENT_FAILED_EVENT = 'payment.payment.failed';

interface PaymentFailedPayload {
  readonly paymentId: string;
  readonly orderId?: string;
  readonly reason: string;
  readonly failureCode?: string;
  readonly failedAt: string;
}

interface PaymentFailedEvent {
  readonly id: string;
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: PaymentFailedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class PaymentFailedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentFailedHandler.name);

  constructor(
    @Inject(SHIPMENT_SERVICE)
    private readonly shipmentService: IShipmentService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_FAILED_EVENT, async (event) => {
      try {
        await this.handle(event as unknown as PaymentFailedEvent);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`PaymentFailedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_FAILED_EVENT}"`);
  }

  private async handle(event: PaymentFailedEvent): Promise<void> {
    const p = event.payload;
    if (!p?.orderId) {
      this.logger.warn(
        `payment.failed payload missing orderId (paymentId=${p?.paymentId}) — skipping`,
      );
      return;
    }

    this.logger.log(
      `Received payment.failed — paymentId=${p.paymentId}, orderId=${p.orderId}, reason=${p.reason}`,
    );

    try {
      const shipments = await this.shipmentService.listByOrder(p.orderId);
      if (!shipments.items || shipments.items.length === 0) {
        this.logger.warn(`No shipments for order ${p.orderId} — skipping`);
        return;
      }

      for (const shipment of shipments.items) {
        try {
          await this.shipmentService.putOnHold(
            {
              shipmentId: shipment.id,
              reason: `Payment failed: ${p.reason}${p.failureCode ? ` (${p.failureCode})` : ''}`,
            },
            'system:payment-service',
          );
          this.logger.log(
            `⏸️  Shipment ${shipment.id} put on hold (payment failed for order ${p.orderId})`,
          );
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(
            `Failed to put shipment ${shipment.id} on hold: ${msg} (may be final state)`,
          );
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Shipments list failed for order ${p.orderId}: ${msg}`);
    }
  }
}
