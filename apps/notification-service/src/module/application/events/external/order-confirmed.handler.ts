/**
 * OrderConfirmedHandler — reacts to order-service.order.confirmed
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderOrderConfirmationEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
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

export const ORDER_CONFIRMED_EVENT = 'order.order.confirmed';

interface OrderConfirmedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
}

interface OrderConfirmedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order.confirmed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderConfirmedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderConfirmedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderConfirmedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CONFIRMED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderConfirmedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CONFIRMED_EVENT}"`);
  }

  private async handle(event: OrderConfirmedHandlerEvent): Promise<void> {
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
    this.logger.log(`Received order-service.order.confirmed — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        const resolved = resolveTemplate(
          this.i18n,
          'ORDER_CONFIRMED',
          locale,
          {
            orderId: (payload as any).orderId
          },
          {
            subject: 'Order Confirmed',
            body: 'Your order #{{orderId}} has been confirmed.',
          },
        );

        const html = renderOrderConfirmationEmail({
          name: (payload as unknown as { name?: string }).name ?? 'Customer',
          orderId: (payload as unknown as { orderId?: string }).orderId ?? '',
          total: 0,
          currency: 'BDT',
          locale: ((payload as unknown as { locale?: 'en' | 'bn' }).locale ?? 'bn'),
        });

        const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          eventType: 'order.order.confirmed',
          eventId: event.id,
          ...payload,
          html,
        },
        idempotencyKey: `orderconfirmed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderConfirmedHandler failed: ${msg}`);
    }
  }
}
