/**
 * PaymentFailedHandler — cart stays active when payment fails
 * @module cart-service/application/events/external
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const PAYMENT_FAILED_EVENT = 'payment.payment.failed';

@Injectable()
export class PaymentFailedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentFailedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_FAILED_EVENT, async (event) => {
      const payload = (event as unknown as { payload: { orderId?: string; userId?: string; reason?: string } }).payload;
      this.logger.log(
        `📥 payment.failed → orderId=${payload.orderId} reason=${payload.reason}`,
      );
      this.logger.log(`Cart remains active — user can retry payment`);
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_FAILED_EVENT}"`);
  }
}
