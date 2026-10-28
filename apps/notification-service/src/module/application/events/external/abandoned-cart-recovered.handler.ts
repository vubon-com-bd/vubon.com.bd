/**
 * AbandonedCartRecoveredHandler — Cart Recovered - Welcome Back
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
import { renderAbandonedCartRecoveredEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { getLocale } from './_handler-helpers.js';
import { UserClient } from '../../../infrastructure/services/external/user.client.js';

export const ABANDONEDCARTRECOVERED_EVENT = 'cart.abandoned_cart.recovered';

interface AbandonedCartRecoveredHandlerPayload {
  readonly abandonedCartId: string;
  readonly orderId: string;
  readonly recoveredAt: string;
  readonly recoveredValue: number;
  readonly userId: string | undefined;
  readonly name: string | undefined;
}

interface AbandonedCartRecoveredHandlerEvent {
  readonly id: string;
  readonly type: 'cart.abandoned_cart.recovered';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: AbandonedCartRecoveredHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class AbandonedCartRecoveredHandler implements OnModuleInit {
  private readonly logger = new Logger(AbandonedCartRecoveredHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ABANDONEDCARTRECOVERED_EVENT, async (event) => {
      await this.handle(event as unknown as AbandonedCartRecoveredHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ABANDONEDCARTRECOVERED_EVENT}"`);
  }

  private async handle(event: AbandonedCartRecoveredHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.abandoned_cart.recovered — ${JSON.stringify(payload)}`);

    try {
      const rawLocale = getLocale(payload as unknown as Record<string, unknown>);
      const locale: 'en' | 'bn' = rawLocale === 'en' ? 'en' : 'bn';

      let html = '';
      try {
        html = renderAbandonedCartRecoveredEmail({
                    name: (payload as any).name ?? 'Customer',
          orderId: (payload as any).orderId ?? '',
          recoveredValue: (payload as any).recoveredValue ?? 0,
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
        subject: `Cart Recovered - Welcome Back`,
        body: `Notification: ${event.type}`,
        data: {
          html,
          eventType: event.type,
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `abandonedcartrecoveredhandler-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`AbandonedCartRecoveredHandler failed: ${msg}`);
    }
  }
}
