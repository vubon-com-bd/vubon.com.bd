/**
 * CartAbandonedHandler — reacts to cart.cart.abandoned
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderAbandonedCartEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
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

export const CART_ABANDONED_EVENT = 'cart.cart.abandoned';

interface CartAbandonedHandlerPayload {
  readonly cartId: string;
  readonly abandonedAt: string;
  readonly itemCount: number;
}

interface CartAbandonedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.cart.abandoned';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartAbandonedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartAbandonedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartAbandonedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_ABANDONED_EVENT, async (event) => {
      await this.handle(event as unknown as CartAbandonedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_ABANDONED_EVENT}"`);
  }

  private async handle(event: CartAbandonedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.cart.abandoned — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        const resolved = resolveTemplate(
          this.i18n,
          'CART_ABANDONED',
          locale,
          {
            itemCount: (payload as any).itemCount
          },
          {
            subject: 'Items Waiting in Your Cart',
            body: 'You have {{itemCount}} item(s) in your cart.',
          },
        );

              let html = '';
      try {
        html = renderAbandonedCartEmail({
          name: (payload as any).name ?? 'Customer',
          cartId: (payload as any).cartId ?? '',
          itemCount: (payload as any).itemCount ?? 0,
          locale: (payload as any).locale ?? 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.REMINDER,
        category: NOTIFICATION_CATEGORY.REMINDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          html,
          eventType: 'cart.cart.abandoned',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cartabandoned-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartAbandonedHandler failed: ${msg}`);
    }
  }
}
