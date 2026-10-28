/**
 * OrderItemStatusChangedHandler — reacts to order.order-item.status_changed
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
import { renderOrderItemStatusChangedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const ORDER_ITEM_STATUS_CHANGED_EVENT = 'order.order-item.status_changed';

interface OrderItemStatusChangedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly status?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface OrderItemStatusChangedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-item.status_changed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderItemStatusChangedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderItemStatusChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderItemStatusChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_ITEM_STATUS_CHANGED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderItemStatusChangedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_ITEM_STATUS_CHANGED_EVENT}"`);
  }

  private async handle(event: OrderItemStatusChangedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order-item.status_changed — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderOrderItemStatusChangedEmail({
          name,
          orderId: payload.orderId,
          status: payload.status,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`আইটেম স্ট্যাটাস পরিবর্তন - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: subject,
        body: `অর্ডার আইটেমের স্ট্যাটাস পরিবর্তন হয়েছে।`,
        data: {
          html,
          eventType: 'order.order-item.status_changed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `order-item-status-changed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderItemStatusChangedHandler failed: ${msg}`);
    }
  }
}
