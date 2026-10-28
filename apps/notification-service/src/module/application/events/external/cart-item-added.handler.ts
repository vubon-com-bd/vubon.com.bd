/**
 * CartItemAddedHandler — reacts to cart.cart_item.added
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
import { I18nService } from '../../../domain/services/i18n.service.js';
import { renderCartItemAddedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';

export const CART_ITEM_ADDED_EVENT = 'cart.cart_item.added';

interface CartItemAddedHandlerPayload {
  readonly name?: string;
  readonly locale?: string;
  readonly [key: string]: unknown;
}

interface CartItemAddedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.cart_item.added';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartItemAddedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartItemAddedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartItemAddedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_ITEM_ADDED_EVENT, async (event) => {
      await this.handle(event as unknown as CartItemAddedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_ITEM_ADDED_EVENT}"`);
  }

  private async handle(event: CartItemAddedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.cart_item.added — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as Record<string, unknown>);
      const resolved = resolveTemplate(
        this.i18n,
        'cart.cart_item.added',
        locale,
        payload as Record<string, unknown>,
        {
          subject: 'Item Added',
          body: '{{productName}} has been added to your cart.',
        },
      );

      // ─── HTML template ───
      let html = '';
      try {
        html = renderCartItemAddedEmail({
          name: (payload as any).name ?? 'Customer',
          productName: (payload as any).productName ?? 'Product',
          locale: (payload as any).locale ?? 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SYSTEM,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          html,
          eventType: 'cart.cart_item.added',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart-cart-item-added-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartItemAddedHandler failed: ${msg}`);
    }
  }
}
