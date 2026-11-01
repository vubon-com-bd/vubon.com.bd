/**
 * CartAbandonedHandler — reacts to cart.cart.abandoned
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderAbandonedCartEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { REMINDER_CHAIN_SERVICE, type ReminderChainService } from '../../services/impl/reminder-chain.service.js';
import { UserClient } from '@infrastructure/services/external/user.client.js';
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
    @Inject(REMINDER_CHAIN_SERVICE)
    private readonly reminderChain: ReminderChainService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_ABANDONED_EVENT, async (event) => {
      await this.handle(event as unknown as CartAbandonedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_ABANDONED_EVENT}"`);
  }

  private async handle(event: CartAbandonedHandlerEvent): Promise<void> {
    const payload = event.payload;

    // ─── Fetch user profile for email/name/locale ───
    const _userId = (payload as any).userId ?? (payload as any).customerId ?? event.aggregateId;
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
    this.logger.log(`Received cart.cart.abandoned — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        // ─── HTML template (rendered first) ───
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

        const resolved = resolveTemplate(
          this.i18n,
          'CART_ABANDONED',
          locale,
          { itemCount: (payload as any).itemCount },
          {
            subject: locale === 'bn' ? 'আপনার কার্টে অপেক্ষা করছে' : 'Items Waiting in Your Cart',
            body: html,
          },
        );
            const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.REMINDER,
        category: NOTIFICATION_CATEGORY.REMINDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
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

      // 📅 Schedule reminder chain (1h, 24h, 72h)
      try {
        await this.reminderChain.scheduleAbandonedCartReminders({
          cartId: (payload as any).cartId ?? event.aggregateId,
          userId: (payload as any).userId ?? '',
          itemCount: (payload as any).itemCount ?? 0,
        });
      } catch (reminderErr) {
        const msg = reminderErr instanceof Error ? reminderErr.message : 'unknown';
        this.logger.warn(`Reminder chain scheduling failed: ${msg}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartAbandonedHandler failed: ${msg}`);
    }
  }
}
