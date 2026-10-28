/**
 * ReturnReplacedHandler — reacts to order.order-return.replaced
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
import { renderReturnReplacedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const RETURN_REPLACED_EVENT = 'order.order-return.replaced';

interface ReturnReplacedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly name?: string;
  readonly locale?: string;
}

interface ReturnReplacedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-return.replaced';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ReturnReplacedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ReturnReplacedHandler implements OnModuleInit {
  private readonly logger = new Logger(ReturnReplacedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(RETURN_REPLACED_EVENT, async (event) => {
      await this.handle(event as unknown as ReturnReplacedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${RETURN_REPLACED_EVENT}"`);
  }

  private async handle(event: ReturnReplacedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order-return.replaced — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderReturnReplacedEmail({
          name,
          orderId: payload.orderId,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`পণ্য প্রতিস্থাপিত - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: subject,
        body: `আপনার পণ্য প্রতিস্থাপন করা হয়েছে।`,
        data: {
          html,
          eventType: 'order.order-return.replaced',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `return-replaced-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ReturnReplacedHandler failed: ${msg}`);
    }
  }
}
