/**
 * OrderCompletedHandler — cart remains cleared after order completed
 * @module cart-service/application/events/external
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const ORDER_COMPLETED_EVENT = 'order.order.completed';

@Injectable()
export class OrderCompletedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderCompletedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_COMPLETED_EVENT, async (event) => {
      const payload = (event as unknown as { payload: { orderId?: string; userId?: string } }).payload;
      this.logger.log(`📥 order.completed → orderId=${payload.orderId} userId=${payload.userId}`);
      this.logger.log(`Cart lifecycle complete — user can start fresh cart`);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_COMPLETED_EVENT}"`);
  }
}
