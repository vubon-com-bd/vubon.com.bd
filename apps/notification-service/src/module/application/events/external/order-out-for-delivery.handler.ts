/**
 * OrderOutForDeliveryHandler — reacts to order.order.out_for_delivery
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
import { renderOrderOutForDeliveryEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const ORDER_OUT_FOR_DELIVERY_EVENT = 'order.order.out_for_delivery';

interface OrderOutForDeliveryHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly name?: string;
  readonly locale?: string;
}

interface OrderOutForDeliveryHandlerEvent {
  readonly id: string;
  readonly type: 'order.order.out_for_delivery';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderOutForDeliveryHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderOutForDeliveryHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderOutForDeliveryHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_OUT_FOR_DELIVERY_EVENT, async (event) => {
      await this.handle(event as unknown as OrderOutForDeliveryHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_OUT_FOR_DELIVERY_EVENT}"`);
  }

  private async handle(event: OrderOutForDeliveryHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order.out_for_delivery — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderOrderOutForDeliveryEmail({
          name,
          orderId: payload.orderId,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SHIPPING_UPDATE,
        category: NOTIFICATION_CATEGORY.SHIPPING,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: `অর্ডার ডেলিভারির জন্য বের হয়েছে`,
        body: `আপনার অর্ডার ডেলিভারির জন্য বের হয়েছে।`,
        data: {
          html,
          eventType: 'order.order.out_for_delivery',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `order-out-for-delivery-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderOutForDeliveryHandler failed: ${msg}`);
    }
  }
}
