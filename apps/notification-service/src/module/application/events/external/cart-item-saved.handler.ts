/**
 * CartItemSavedHandler — reacts to cart.cart_item.saved_for_later
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

export const CART_ITEM_SAVED_EVENT = 'cart.cart_item.saved_for_later';

interface CartItemSavedHandlerPayload {
  readonly userId?: string;
  readonly cartId?: string;
  readonly itemId?: string;
  readonly [key: string]: unknown;
}

interface CartItemSavedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.cart_item.saved_for_later';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartItemSavedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartItemSavedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartItemSavedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_ITEM_SAVED_EVENT, async (event) => {
      await this.handle(event as unknown as CartItemSavedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_ITEM_SAVED_EVENT}"`);
  }

  private async handle(event: CartItemSavedHandlerEvent): Promise<void> {
    const payload = event.payload;
    const userId = payload.userId ?? event.aggregateId;

    this.logger.log(`Received cart.cart_item.saved_for_later — userId=${userId}`);

    try {
      await this.notificationService.send({
        userId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'Item Saved for Later',
        body: 'An item has been saved for later.',
        data: {
          eventType: 'cart.cart_item.saved_for_later',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart-item-saved-${event.id}`,
      });

      this.logger.log(`✅ Notification sent for ${userId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartItemSavedHandler failed: ${msg}`);
    }
  }
}
