/**
 * ReturnPickedUpHandler — reacts to order.order-return.picked_up
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
import { renderReturnPickedUpEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const RETURN_PICKED_UP_EVENT = 'order.order-return.picked_up';

interface ReturnPickedUpHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly name?: string;
  readonly locale?: string;
}

interface ReturnPickedUpHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-return.picked_up';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ReturnPickedUpHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ReturnPickedUpHandler implements OnModuleInit {
  private readonly logger = new Logger(ReturnPickedUpHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(RETURN_PICKED_UP_EVENT, async (event) => {
      await this.handle(event as unknown as ReturnPickedUpHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${RETURN_PICKED_UP_EVENT}"`);
  }

  private async handle(event: ReturnPickedUpHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order-return.picked_up — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderReturnPickedUpEmail({
          name,
          orderId: payload.orderId,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`রিটার্ন পণ্য গৃহীত - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: subject,
        body: html || `আপনার রিটার্ন পণ্য সংগ্রহ করা হয়েছে।`,
        data: {
          html,
          eventType: 'order.order-return.picked_up',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `return-picked-up-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ReturnPickedUpHandler failed: ${msg}`);
    }
  }
}
