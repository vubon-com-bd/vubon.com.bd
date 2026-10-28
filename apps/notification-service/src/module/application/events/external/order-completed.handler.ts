/**
 * OrderCompletedHandler — reacts to order.order.completed
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
import { renderOrderCompletedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const ORDER_COMPLETED_EVENT = 'order.order.completed';

interface OrderCompletedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly name?: string;
  readonly locale?: string;
}

interface OrderCompletedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order.completed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderCompletedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderCompletedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderCompletedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_COMPLETED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderCompletedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_COMPLETED_EVENT}"`);
  }

  private async handle(event: OrderCompletedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order.completed — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderOrderCompletedEmail({
          name,
          orderId: payload.orderId,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`অর্ডার সম্পূর্ণ - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: subject,
        body: `আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে।`,
        data: {
          html,
          eventType: 'order.order.completed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `order-completed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderCompletedHandler failed: ${msg}`);
    }
  }
}
