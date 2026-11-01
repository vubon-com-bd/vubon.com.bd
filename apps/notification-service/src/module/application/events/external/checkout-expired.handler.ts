/**
 * CheckoutExpiredHandler — reacts to order.checkout.expired
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
import { renderCheckoutExpiredEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const CHECKOUT_EXPIRED_EVENT = 'order.checkout.expired';

interface CheckoutExpiredHandlerPayload {
  readonly userId: string;
  readonly name?: string;
  readonly locale?: string;
}

interface CheckoutExpiredHandlerEvent {
  readonly id: string;
  readonly type: 'order.checkout.expired';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CheckoutExpiredHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CheckoutExpiredHandler implements OnModuleInit {
  private readonly logger = new Logger(CheckoutExpiredHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CHECKOUT_EXPIRED_EVENT, async (event) => {
      await this.handle(event as unknown as CheckoutExpiredHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CHECKOUT_EXPIRED_EVENT}"`);
  }

  private async handle(event: CheckoutExpiredHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.checkout.expired — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderCheckoutExpiredEmail({
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
        priority: NOTIFICATION_PRIORITY.LOW,
        subject: `চেকআউট মেয়াদ শেষ`,
        body: html || `আপনার চেকআউট সেশন মেয়াদ শেষ হয়েছে।`,
        data: {
          html,
          eventType: 'order.checkout.expired',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `checkout-expired-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CheckoutExpiredHandler failed: ${msg}`);
    }
  }
}
