/**
 * PaymentRefundedHandler — update order status when refund is processed
 * @module order-service/application/events/external
 */
import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  ORDER_SERVICE,
  type IOrderService,
} from '../../services/interfaces/order.service.interface.js';

export const PAYMENT_REFUNDED_EVENT = 'payment.payment.refunded';

interface PaymentRefundedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly refundId?: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason?: string;
  readonly refundedAt: string;
}

interface PaymentRefundedEvent {
  readonly id: string;
  readonly type: 'payment.payment.refunded';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: PaymentRefundedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class PaymentRefundedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentRefundedHandler.name);

  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderService: IOrderService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_REFUNDED_EVENT, async (event) => {
      await this.handle(event as unknown as PaymentRefundedEvent);
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_REFUNDED_EVENT}"`);
  }

  private async handle(event: PaymentRefundedEvent): Promise<void> {
    const { orderId, paymentId, amount, currency, refundId } = event.payload;

    this.logger.log(
      `📥 Payment refunded: orderId=${orderId}, paymentId=${paymentId}, amount=${amount} ${currency}`,
    );

    try {
      // TODO: Update order status to REFUNDED
      // Requires order service method: markRefunded(orderId, refundId)
      this.logger.log(
        `⚠️  Would mark order ${orderId} as REFUNDED (refundId=${refundId})`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Failed to process refund for order ${orderId}: ${msg}`);
    }
  }
}
