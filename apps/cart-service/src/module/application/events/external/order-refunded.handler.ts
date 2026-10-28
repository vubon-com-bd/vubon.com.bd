/**
 * OrderRefundedHandler — cart state update on order refund
 * @module cart-service/application/events/external
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const ORDER_REFUNDED_EVENT = 'order.order.refunded';

@Injectable()
export class OrderRefundedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderRefundedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_REFUNDED_EVENT, async (event) => {
      const payload = (event as unknown as { payload: { orderId?: string; userId?: string; amount?: number } }).payload;
      this.logger.log(`📥 order.refunded → orderId=${payload.orderId} amount=${payload.amount}`);
      this.logger.log(`User can start new cart after refund`);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_REFUNDED_EVENT}"`);
  }
}
