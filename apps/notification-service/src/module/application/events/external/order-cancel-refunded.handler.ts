/**
 * OrderCancelRefundedHandler — reacts to order.order-cancel.refunded
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
import { UserClient } from '@infrastructure/services/external/user.client.js';
import { renderOrderCancelRefundedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const ORDER_CANCEL_REFUNDED_EVENT = 'order.order-cancel.refunded';

interface OrderCancelRefundedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly amount?: number;
  readonly currency?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface OrderCancelRefundedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-cancel.refunded';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderCancelRefundedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderCancelRefundedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderCancelRefundedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CANCEL_REFUNDED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderCancelRefundedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CANCEL_REFUNDED_EVENT}"`);
  }

  private async handle(event: OrderCancelRefundedHandlerEvent): Promise<void> {
    const payload = event.payload;

    // ─── Fetch user profile for email/name/locale ───
    const _userId = (payload as any).userId ?? event.aggregateId;
    let userEmail = (payload as any).email as string | undefined;
    let userName = (payload as any).name as string | undefined;
    let userLocale = (payload as any).locale as string | undefined;
    if (!userEmail && _userId) {
      try {
        const profile = await this.userClient.getById(_userId);
        if (profile) {
          userEmail = userEmail ?? profile.email;
          userName = userName ?? (profile as any).name ?? (profile as any).firstName;
          userLocale = userLocale ?? ((profile as any).locale as string | undefined);
        }
      } catch (err) {
        this.logger.warn(`User fetch failed for ${_userId}: ${err}`);
      }
    }

    this.logger.log(`Received order.order-cancel.refunded — ${JSON.stringify(payload)}`);

    const locale = userLocale ?? 'bn';
    const name = userName ?? 'Customer';

    try {
      // ─── HTML template ───
      let html = '';
      try {
        html = renderOrderCancelRefundedEmail({
          name,
          orderId: payload.orderId,
          amount: payload.amount,
          currency: payload.currency,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`রিফান্ড সম্পন্ন - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: subject,
        body: html || `আপনার রিফান্ড সম্পন্ন হয়েছে।`,
        data: {
          html,
          eventType: 'order.order-cancel.refunded',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `order-cancel-refunded-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderCancelRefundedHandler failed: ${msg}`);
    }
  }
}
