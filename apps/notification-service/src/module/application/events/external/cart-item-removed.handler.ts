/**
 * CartItemRemovedHandler — reacts to cart.cart_item.removed
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
import { renderCartItemRemovedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';

export const CART_ITEM_REMOVED_EVENT = 'cart.cart_item.removed';

interface CartItemRemovedHandlerPayload {
  readonly name?: string;
  readonly locale?: string;
  readonly [key: string]: unknown;
}

interface CartItemRemovedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.cart_item.removed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartItemRemovedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartItemRemovedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartItemRemovedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_ITEM_REMOVED_EVENT, async (event) => {
      await this.handle(event as unknown as CartItemRemovedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_ITEM_REMOVED_EVENT}"`);
  }

  private async handle(event: CartItemRemovedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.cart_item.removed — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as Record<string, unknown>);
      // ─── HTML template (rendered first) ───
      let html = '';
      try {
        html = renderCartItemRemovedEmail({
          name: (payload as any).name ?? 'Customer',
          productName: (payload as any).productName ?? 'Product',
          locale: (payload as any).locale ?? 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }


      const resolved = resolveTemplate(
        this.i18n,
        'cart.cart_item.removed',
        locale,
        payload as Record<string, unknown>,
        {
          subject: 'Item Removed',
          body: html,
        },
      );

      // ─── HTML template ───

            const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SYSTEM,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          html,
          eventType: 'cart.cart_item.removed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart-cart-item-removed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartItemRemovedHandler failed: ${msg}`);
    }
  }
}
