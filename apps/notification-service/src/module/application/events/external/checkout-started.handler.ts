/**
 * CheckoutStartedHandler — reacts to order.checkout.started
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
import { renderCheckoutStartedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const CHECKOUT_STARTED_EVENT = 'order.checkout.started';

interface CheckoutStartedHandlerPayload {
  readonly checkoutId: string;
  readonly userId: string;
  readonly name?: string;
  readonly locale?: string;
}

interface CheckoutStartedHandlerEvent {
  readonly id: string;
  readonly type: 'order.checkout.started';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CheckoutStartedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CheckoutStartedHandler implements OnModuleInit {
  private readonly logger = new Logger(CheckoutStartedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CHECKOUT_STARTED_EVENT, async (event) => {
      await this.handle(event as unknown as CheckoutStartedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CHECKOUT_STARTED_EVENT}"`);
  }

  private async handle(event: CheckoutStartedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.checkout.started — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderCheckoutStartedEmail({
          name,
          checkoutId: (payload as any).checkoutId ?? '',
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: `চেকআউট শুরু হয়েছে`,
        body: `আপনার চেকআউট শুরু হয়েছে।`,
        data: {
          html,
          eventType: 'order.checkout.started',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `checkout-started-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CheckoutStartedHandler failed: ${msg}`);
    }
  }
}
