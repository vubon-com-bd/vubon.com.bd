/**
 * OrderShippedHandler — reacts to order-service.order.shipped
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderDeliveryEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
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

export const ORDER_SHIPPED_EVENT = 'order.order.shipped';

interface OrderShippedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly trackingNumber: string | undefined;
}

interface OrderShippedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order.shipped';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderShippedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderShippedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderShippedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_SHIPPED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderShippedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_SHIPPED_EVENT}"`);
  }

  private async handle(event: OrderShippedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order-service.order.shipped — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        const resolved = resolveTemplate(
          this.i18n,
          'ORDER_SHIPPED',
          locale,
          {
            orderId: (payload as any).orderId, trackingNumber: (payload as any).trackingNumber
          },
          {
            subject: 'Order Shipped',
            body: 'Your order #{{orderId}} has been shipped. Tracking: {{trackingNumber}}',
          },
        );

        const html = renderDeliveryEmail({
          name: (payload as unknown as { name?: string }).name ?? 'Customer',
          orderId: (payload as unknown as { orderId?: string }).orderId ?? '',
          status: 'shipped',
          trackingNumber: (payload as unknown as { trackingNumber?: string }).trackingNumber,
          locale: ((payload as unknown as { locale?: 'en' | 'bn' }).locale ?? 'bn'),
        });

        const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          eventType: 'order.order.shipped',
          eventId: event.id,
          ...payload,
          html,
        },
        idempotencyKey: `ordershipped-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderShippedHandler failed: ${msg}`);
    }
  }
}
