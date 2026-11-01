/**
 * CartItemMovedHandler — reacts to cart.cart_item.moved_to_cart
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
import { renderCartItemMovedToCartEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const CART_ITEM_MOVED_EVENT = 'cart.cart_item.moved_to_cart';

interface CartItemMovedHandlerPayload {
  readonly userId?: string;
  readonly cartId?: string;
  readonly itemId?: string;
  readonly [key: string]: unknown;
}

interface CartItemMovedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.cart_item.moved_to_cart';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartItemMovedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartItemMovedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartItemMovedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_ITEM_MOVED_EVENT, async (event) => {
      await this.handle(event as unknown as CartItemMovedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_ITEM_MOVED_EVENT}"`);
  }

  private async handle(event: CartItemMovedHandlerEvent): Promise<void> {
    const payload = event.payload;
    const userId = payload.userId ?? event.aggregateId;

    this.logger.log(`Received cart.cart_item.moved_to_cart — userId=${userId}`);

    try {
      // ─── Render Bengali HTML ───
      let html = '';
      try {
        html = renderCartItemMovedToCartEmail({
          name: ((payload.name as string) ?? (typeof payload.firstName === 'string' ? payload.firstName as string : 'গ্রাহক')),
          locale: (((payload.locale as 'en' | 'bn') ?? 'bn')),
          ...payload,
        } as any);
      } catch (err) {
        this.logger.warn(`Template render failed: ${err}`);
      }

      const isBn = ((payload.locale as string) ?? 'bn') === 'bn';

      await this.notificationService.send({
        userId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? 'Moved To Cart' : 'Moved To Cart',
        body: html || 'Notification sent',
        data: { eventType: 'cart.cart_item.moved_to_cart' , html },
        idempotencyKey: 'cart.cart_item.moved_to_cart-' + (event as { id: string }).id,
      });
      this.logger.log(`✅ Notification sent for ${userId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartItemMovedHandler failed: ${msg}`);
    }
  }
}
