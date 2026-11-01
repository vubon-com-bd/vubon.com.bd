/**
 * PaymentRefundedHandler — react to refund by clearing/detaching cart
 * @module cart-service/application/events/external
 *
 * When payment.refunded:
 *   - Log for tracking
 *   - Cart remains in converted state
 *   - User can start fresh cart
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PAYMENT_REFUNDED_EVENT = 'payment.payment.refunded';

interface PaymentRefundedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly amount: number;
  readonly currency: string;
}

@Injectable()
export class PaymentRefundedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentRefundedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_REFUNDED_EVENT, async (event) => {
      await this.handle(event as unknown as { payload: PaymentRefundedPayload });
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_REFUNDED_EVENT}"`);
  }

  private async handle(event: { payload: PaymentRefundedPayload }): Promise<void> {
    const { orderId, userId, amount, currency } = event.payload;
    this.logger.log(
      `📥 payment.refunded → orderId=${orderId} userId=${userId} amount=${amount} ${currency}`,
    );
    this.logger.log(`Cart remains converted — user can start new cart`);
  }
}
