/**
 * OrderItemUpdatedHandler — reacts to order.order-item.updated
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
import { renderOrderItemUpdatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const ORDER_ITEM_UPDATED_EVENT = 'order.order-item.updated';

interface OrderItemUpdatedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly productName?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface OrderItemUpdatedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-item.updated';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderItemUpdatedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderItemUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderItemUpdatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_ITEM_UPDATED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderItemUpdatedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_ITEM_UPDATED_EVENT}"`);
  }

  private async handle(event: OrderItemUpdatedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order-item.updated — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderOrderItemUpdatedEmail({
          name,
          orderId: payload.orderId,
          productName: payload.productName,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`অর্ডার আইটেম আপডেট - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: subject,
        body: `অর্ডার আইটেম আপডেট হয়েছে।`,
        data: {
          html,
          eventType: 'order.order-item.updated',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `order-item-updated-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderItemUpdatedHandler failed: ${msg}`);
    }
  }
}
