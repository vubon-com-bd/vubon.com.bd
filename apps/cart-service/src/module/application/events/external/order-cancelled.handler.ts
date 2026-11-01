/**
 * OrderCancelledHandler — reopen cart when order cancelled
 * @module cart-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  CART_SERVICE,
  type ICartService,
} from '../../services/interfaces/cart.service.interface.js';

export const ORDER_CANCELLED_EVENT = 'order.order.cancelled';

@Injectable()
export class OrderCancelledHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderCancelledHandler.name);

  constructor(
    @Inject(CART_SERVICE)
    private readonly cartService: ICartService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CANCELLED_EVENT, async (event) => {
      const payload = (event as unknown as { payload: { orderId?: string; userId?: string } }).payload;
      this.logger.log(`📥 order.cancelled → orderId=${payload.orderId}`);
      this.logger.log(`Cart can be reused for new order`);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CANCELLED_EVENT}"`);
  }
}
