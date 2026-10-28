/**
 * CheckoutCompletedHandler — reacts to order.checkout.completed
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
import { renderCheckoutCompletedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const CHECKOUT_COMPLETED_EVENT = 'order.checkout.completed';

interface CheckoutCompletedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly total?: number;
  readonly currency?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface CheckoutCompletedHandlerEvent {
  readonly id: string;
  readonly type: 'order.checkout.completed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CheckoutCompletedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CheckoutCompletedHandler implements OnModuleInit {
  private readonly logger = new Logger(CheckoutCompletedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CHECKOUT_COMPLETED_EVENT, async (event) => {
      await this.handle(event as unknown as CheckoutCompletedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CHECKOUT_COMPLETED_EVENT}"`);
  }

  private async handle(event: CheckoutCompletedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.checkout.completed — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderCheckoutCompletedEmail({
          name,
          orderId: payload.orderId,
          total: payload.total,
          currency: payload.currency,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`চেকআউট সম্পূর্ণ - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: subject,
        body: `আপনার চেকআউট সম্পূর্ণ হয়েছে।`,
        data: {
          html,
          eventType: 'order.checkout.completed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `checkout-completed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CheckoutCompletedHandler failed: ${msg}`);
    }
  }
}
