/**
 * OrderReturnedHandler — cart state update on order return
 * @module cart-service/application/events/external
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const ORDER_RETURNED_EVENT = 'order.order.returned';

@Injectable()
export class OrderReturnedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderReturnedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_RETURNED_EVENT, async (event) => {
      const payload = (event as unknown as { payload: { orderId?: string; userId?: string; returnId?: string } }).payload;
      this.logger.log(`📥 order.returned → orderId=${payload.orderId} returnId=${payload.returnId}`);
      this.logger.log(`Return processed — user can start new cart`);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_RETURNED_EVENT}"`);
  }
}
