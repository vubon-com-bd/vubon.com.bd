/**
 * OrderCancelledHandler — cancels pending payment when order is cancelled
 * @module payment-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '@domain/repositories/payment.repository.interface';
import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '@application/services/interfaces/payment.service.interface';

export const ORDER_CANCELLED_EVENT = 'order-service.order.cancelled';

interface OrderCancelledPayload {
  readonly orderId: string;
  readonly reason?: string;
  readonly cancelledBy?: string;
  readonly cancelledAt: string;
}

interface OrderCancelledEvent {
  readonly id: string;
  readonly type: 'order-service.order.cancelled';
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
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepo: PaymentRepository,
    @Inject(PAYMENT_SERVICE)
    private readonly paymentService: IPaymentService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CANCELLED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderCancelledEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CANCELLED_EVENT}"`);
  }

  private async handle(event: OrderCancelledEvent): Promise<void> {
    const { orderId, reason } = event.payload;

    this.logger.log(`Received order.cancelled — orderId=${orderId}`);

    try {
      const payments = await this.paymentRepo.findByOrder(orderId);
      if (payments.length === 0) {
        this.logger.debug(`No payments found for order ${orderId} — nothing to cancel`);
        return;
      }

      let cancelled = 0;
      for (const payment of payments) {
        if (payment.isFinal()) continue;

        try {
          await this.paymentService.cancel({
            paymentId: payment.id,
            reason: reason ?? 'order_cancelled',
          } as never);
          cancelled++;
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(`Failed to cancel payment ${payment.id}: ${msg}`);
        }
      }

      this.logger.log(
        `Order ${orderId} cancelled — ${cancelled}/${payments.length} payment(s) cancelled`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(
        `OrderCancelledHandler failed for order ${orderId}: ${msg}`,
      );
    }
  }
}
