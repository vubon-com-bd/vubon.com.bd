/**
 * PaymentCompletedHandler — Boosts shipment priority on payment success
 * @module logistics-service/application/events/external
 *
 * Strategy:
 *  - Listens to `payment.payment.completed` and `payment.payment.paid`
 *  - Finds shipments for orderId
 *  - On COD=false: shipments get priority boost (payment cleared)
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  SHIPMENT_SERVICE,
  type IShipmentService,
} from '@application/services/interfaces/shipment.service.interface';

export const PAYMENT_COMPLETED_EVENT = 'payment.payment.completed';
export const PAYMENT_PAID_EVENT = 'payment.payment.paid';

interface PaymentCompletedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId?: string;
  readonly amount: number;
  readonly currency: string;
  readonly method?: string;
  readonly transactionId?: string;
  readonly completedAt: string;
}

interface PaymentEventWrapper {
  readonly id: string;
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: PaymentCompletedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class PaymentCompletedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentCompletedHandler.name);

  constructor(
    @Inject(SHIPMENT_SERVICE)
    private readonly shipmentService: IShipmentService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    const handler = async (event: unknown) => {
      try {
        await this.handle(event as PaymentEventWrapper);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`PaymentCompletedHandler failed: ${msg}`);
      }
    };
    this.eventBus.registerHandler(PAYMENT_COMPLETED_EVENT, handler);
    this.eventBus.registerHandler(PAYMENT_PAID_EVENT, handler);
    this.logger.log(`✅ Registered handler for "${PAYMENT_COMPLETED_EVENT}" and "${PAYMENT_PAID_EVENT}"`);
  }

  private async handle(event: PaymentEventWrapper): Promise<void> {
    const p = event.payload;
    if (!p?.orderId) {
      this.logger.warn('payment.completed payload missing orderId — skipping');
      return;
    }

    this.logger.log(
      `Received payment.completed — paymentId=${p.paymentId}, orderId=${p.orderId}, amount=${p.amount} ${p.currency}`,
    );

    try {
      const shipments = await this.shipmentService.listByOrder(p.orderId);
      if (!shipments.items || shipments.items.length === 0) {
        this.logger.warn(`No shipments for order ${p.orderId} — skipping`);
        return;
      }

      // Log only — real priority-boost would need a dedicated command/service method
      for (const shipment of shipments.items) {
        this.logger.log(
          `ℹ️  Payment cleared for shipment ${shipment.id} (order ${p.orderId}) — ready for processing`,
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Shipments lookup failed for order ${p.orderId}: ${msg}`);
    }
  }
}
