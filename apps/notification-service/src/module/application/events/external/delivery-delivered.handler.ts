/**
 * DeliveryDeliveredHandler — reacts to order.delivery.delivered
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
import { renderDeliveryDeliveredEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const DELIVERY_DELIVERED_EVENT = 'order.delivery.delivered';

interface DeliveryDeliveredHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly name?: string;
  readonly locale?: string;
}

interface DeliveryDeliveredHandlerEvent {
  readonly id: string;
  readonly type: 'order.delivery.delivered';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: DeliveryDeliveredHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class DeliveryDeliveredHandler implements OnModuleInit {
  private readonly logger = new Logger(DeliveryDeliveredHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(DELIVERY_DELIVERED_EVENT, async (event) => {
      await this.handle(event as unknown as DeliveryDeliveredHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${DELIVERY_DELIVERED_EVENT}"`);
  }

  private async handle(event: DeliveryDeliveredHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.delivery.delivered — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderDeliveryDeliveredEmail({
          name,
          orderId: payload.orderId,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`ডেলিভারি সম্পন্ন - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SHIPPING_UPDATE,
        category: NOTIFICATION_CATEGORY.SHIPPING,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: subject,
        body: `আপনার অর্ডার সফলভাবে ডেলিভারি হয়েছে।`,
        data: {
          html,
          eventType: 'order.delivery.delivered',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `delivery-delivered-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`DeliveryDeliveredHandler failed: ${msg}`);
    }
  }
}
