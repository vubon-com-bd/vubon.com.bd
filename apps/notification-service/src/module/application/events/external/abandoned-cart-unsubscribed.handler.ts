/**
 * AbandonedCartUnsubscribedHandler — Abandoned Cart Unsubscribed
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
import { renderAbandonedCartDetectedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { getLocale } from './_handler-helpers.js';
import { UserClient } from '../../../infrastructure/services/external/user.client.js';

export const ABANDONEDCARTUNSUBSCRIBED_EVENT = 'cart.abandoned_cart.unsubscribed';

interface AbandonedCartUnsubscribedHandlerPayload {
  readonly abandonedCartId: string;
  readonly userId: string | undefined;
  readonly cartId: string | undefined;
  readonly name: string | undefined;
}

interface AbandonedCartUnsubscribedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.abandoned_cart.unsubscribed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: AbandonedCartUnsubscribedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class AbandonedCartUnsubscribedHandler implements OnModuleInit {
  private readonly logger = new Logger(AbandonedCartUnsubscribedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ABANDONEDCARTUNSUBSCRIBED_EVENT, async (event) => {
      await this.handle(event as unknown as AbandonedCartUnsubscribedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ABANDONEDCARTUNSUBSCRIBED_EVENT}"`);
  }

  private async handle(event: AbandonedCartUnsubscribedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.abandoned_cart.unsubscribed — ${JSON.stringify(payload)}`);

    try {
      const rawLocale = getLocale(payload as unknown as Record<string, unknown>);
      const locale: 'en' | 'bn' = rawLocale === 'en' ? 'en' : 'bn';

      let html = '';
      try {
        html = renderAbandonedCartDetectedEmail({
                    name: (payload as any).name ?? 'Customer',
          cartId: (payload as any).cartId ?? '',
          itemCount: 0,
          cartValue: 0,
          locale,
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      // ─── Fetch user profile for email ───
      const _userId = (payload as any).userId ?? event.aggregateId;
      let userEmail = (payload as any).email;
      let userName = (payload as any).name;
      let userLocale = (payload as any).locale;
      if (!userEmail && _userId) {
        try {
          const profile = await this.userClient.getById(_userId);
          if (profile) {
            userEmail = userEmail ?? profile.email;
            userName = userName ?? profile.name ?? profile.firstName;
            userLocale = userLocale ?? (profile.locale as 'en' | 'bn' | undefined);
          }
        } catch (err) {
          this.logger.warn(`User fetch failed for ${_userId}: ${err}`);
        }
      }

      const result = await this.notificationService.send({
        userId: (payload as any).userId ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: `Abandoned Cart Unsubscribed`,
        body: html || `Notification: ${event.type}`,
        data: {
          html,
          eventType: event.type,
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `abandonedcartunsubscribedhandler-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`AbandonedCartUnsubscribedHandler failed: ${msg}`);
    }
  }
}
