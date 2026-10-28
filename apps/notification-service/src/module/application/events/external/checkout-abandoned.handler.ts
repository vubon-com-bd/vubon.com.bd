/**
 * CheckoutAbandonedHandler — reacts to order.checkout.abandoned
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
import { renderCheckoutAbandonedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const CHECKOUT_ABANDONED_EVENT = 'order.checkout.abandoned';

interface CheckoutAbandonedHandlerPayload {
  readonly userId: string;
  readonly name?: string;
  readonly locale?: string;
}

interface CheckoutAbandonedHandlerEvent {
  readonly id: string;
  readonly type: 'order.checkout.abandoned';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CheckoutAbandonedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CheckoutAbandonedHandler implements OnModuleInit {
  private readonly logger = new Logger(CheckoutAbandonedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CHECKOUT_ABANDONED_EVENT, async (event) => {
      await this.handle(event as unknown as CheckoutAbandonedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CHECKOUT_ABANDONED_EVENT}"`);
  }

  private async handle(event: CheckoutAbandonedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.checkout.abandoned — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderCheckoutAbandonedEmail({
          name,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.REMINDER,
        category: NOTIFICATION_CATEGORY.REMINDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: `চেকআউট সম্পূর্ণ করুন`,
        body: `আপনার কার্টে পণ্য অপেক্ষা করছে।`,
        data: {
          html,
          eventType: 'order.checkout.abandoned',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `checkout-abandoned-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CheckoutAbandonedHandler failed: ${msg}`);
    }
  }
}
