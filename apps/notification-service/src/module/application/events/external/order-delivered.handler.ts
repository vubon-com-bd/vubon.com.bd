/**
 * OrderDeliveredHandler — reacts to order-service.order.delivered
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderDeliveryEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
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

export const ORDER_DELIVERED_EVENT = 'order.order.delivered';

interface OrderDeliveredHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
}

interface OrderDeliveredHandlerEvent {
  readonly id: string;
  readonly type: 'order.order.delivered';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderDeliveredHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderDeliveredHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderDeliveredHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_DELIVERED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderDeliveredHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_DELIVERED_EVENT}"`);
  }

  private async handle(event: OrderDeliveredHandlerEvent): Promise<void> {
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
    this.logger.log(`Received order-service.order.delivered — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        

        

        ;
const html = renderDeliveryEmail({
          name: (payload as unknown as { name?: string }).name ?? 'Customer',
          orderId: (payload as unknown as { orderId?: string }).orderId ?? '',
          status: 'delivered',
          locale: ((payload as unknown as { locale?: 'en' | 'bn' }).locale ?? 'bn'),
        });

const resolved = resolveTemplate(
          this.i18n,
          'ORDER_DELIVERED',
          locale,
          {
            orderId: (payload as any).orderId
          },
          {
            subject: 'Order Delivered',
            body: html || 'Your order #{{orderId}} has been delivered. Thank you!',
          },
        );

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
          eventType: 'order.order.delivered',
          eventId: event.id,
          ...payload,
          html,
        },
        idempotencyKey: `orderdelivered-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderDeliveredHandler failed: ${msg}`);
    }
  }
}
