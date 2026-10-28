/**
 * ReturnRefundedHandler — reacts to order.order-return.refunded
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
import { renderReturnRefundedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const RETURN_REFUNDED_EVENT = 'order.order-return.refunded';

interface ReturnRefundedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly amount?: number;
  readonly currency?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface ReturnRefundedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-return.refunded';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ReturnRefundedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ReturnRefundedHandler implements OnModuleInit {
  private readonly logger = new Logger(ReturnRefundedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(RETURN_REFUNDED_EVENT, async (event) => {
      await this.handle(event as unknown as ReturnRefundedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${RETURN_REFUNDED_EVENT}"`);
  }

  private async handle(event: ReturnRefundedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order-return.refunded — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderReturnRefundedEmail({
          name,
          orderId: payload.orderId,
          amount: payload.amount,
          currency: payload.currency,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`রিটার্ন রিফান্ড সম্পন্ন - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: subject,
        body: `আপনার রিটার্ন রিফান্ড সম্পন্ন হয়েছে।`,
        data: {
          html,
          eventType: 'order.order-return.refunded',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `return-refunded-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ReturnRefundedHandler failed: ${msg}`);
    }
  }
}
