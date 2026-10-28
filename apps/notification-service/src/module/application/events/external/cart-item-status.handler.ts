/**
 * CartItemStatusHandler — reacts to cart.cart_item.status_changed
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE,
  NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const CART_ITEM_STATUS_EVENT = 'cart.cart_item.status_changed';

interface CartItemStatusHandlerPayload {
  readonly userId?: string;
  readonly cartId?: string;
  readonly itemId?: string;
  readonly [key: string]: unknown;
}

interface CartItemStatusHandlerEvent {
  readonly id: string;
  readonly type: 'cart.cart_item.status_changed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartItemStatusHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartItemStatusHandler implements OnModuleInit {
  private readonly logger = new Logger(CartItemStatusHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_ITEM_STATUS_EVENT, async (event) => {
      await this.handle(event as unknown as CartItemStatusHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_ITEM_STATUS_EVENT}"`);
  }

  private async handle(event: CartItemStatusHandlerEvent): Promise<void> {
    const payload = event.payload;
    const userId = payload.userId ?? event.aggregateId;

    this.logger.log(`Received cart.cart_item.status_changed — userId=${userId}`);

    try {
      await this.notificationService.send({
        userId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'Cart Item Updated',
        body: 'Your cart item status has changed.',
        data: {
          eventType: 'cart.cart_item.status_changed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart-item-status-${event.id}`,
      });

      this.logger.log(`✅ Notification sent for ${userId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartItemStatusHandler failed: ${msg}`);
    }
  }
}
