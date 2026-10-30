/**
 * CartStatusChangedHandler — reacts to cart.cart.status_changed
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
import { renderCartStatusChangedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { UserClient } from '@infrastructure/services/external/user.client.js';

export const CART_STATUS_CHANGED_EVENT = 'cart.cart.status_changed';

interface CartStatusChangedHandlerPayload {
  readonly name?: string;
  readonly locale?: string;
  readonly [key: string]: unknown;
}

interface CartStatusChangedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.cart.status_changed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartStatusChangedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartStatusChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartStatusChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_STATUS_CHANGED_EVENT, async (event) => {
      await this.handle(event as unknown as CartStatusChangedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_STATUS_CHANGED_EVENT}"`);
  }

  private async handle(event: CartStatusChangedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.cart.status_changed — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as Record<string, unknown>);
      // ─── HTML template (rendered first) ───
      let html = '';
      try {
        html = renderCartStatusChangedEmail({
          name: (payload as any).name ?? 'Customer',
          fromStatus: (payload as any).fromStatus ?? 'active',
          toStatus: (payload as any).toStatus ?? 'active',
          locale: (payload as any).locale ?? 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);

      }

            const resolved = resolveTemplate(
        this.i18n,
        'cart.cart.status_changed',
        locale,
        payload as Record<string, unknown>,
        {
          subject: 'Cart Status Changed',
          body: html,
        },
      );


      // ─── Fetch user email for real delivery ───
      let userEmail: string | undefined;
      try {
        const userId = (payload as { userId?: string }).userId;
        if (userId) {
          const user = await this.userClient.getById(userId);
          userEmail = user?.email ?? (payload as { email?: string }).email;
        } else {
          userEmail = (payload as { email?: string }).email;
        }
      } catch (err) {
        this.logger.warn(`UserClient email fetch failed: ${err}`);
        userEmail = (payload as { email?: string }).email;
      }


      

      const channels = userEmail
        ? [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL]
        : [NOTIFICATION_CHANNEL.IN_APP];
            const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.SYSTEM,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels,
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          html,
          eventType: 'cart.cart.status_changed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart-cart-status-changed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartStatusChangedHandler failed: ${msg}`);
    }
  }
}
