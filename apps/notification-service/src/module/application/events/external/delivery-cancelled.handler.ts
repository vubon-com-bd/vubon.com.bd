/**
 * DeliveryCancelledHandler — reacts to order.delivery.cancelled
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
import { renderDeliveryCancelledEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const DELIVERY_CANCELLED_EVENT = 'order.delivery.cancelled';

interface DeliveryCancelledHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly reason?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface DeliveryCancelledHandlerEvent {
  readonly id: string;
  readonly type: 'order.delivery.cancelled';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: DeliveryCancelledHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class DeliveryCancelledHandler implements OnModuleInit {
  private readonly logger = new Logger(DeliveryCancelledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(DELIVERY_CANCELLED_EVENT, async (event) => {
      await this.handle(event as unknown as DeliveryCancelledHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${DELIVERY_CANCELLED_EVENT}"`);
  }

  private async handle(event: DeliveryCancelledHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.delivery.cancelled — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderDeliveryCancelledEmail({
          name,
          orderId: payload.orderId,
          reason: payload.reason,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`ডেলিভারি বাতিল - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SHIPPING_UPDATE,
        category: NOTIFICATION_CATEGORY.SHIPPING,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: subject,
        body: html || `আপনার ডেলিভারি বাতিল হয়েছে।`,
        data: {
          html,
          eventType: 'order.delivery.cancelled',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `delivery-cancelled-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`DeliveryCancelledHandler failed: ${msg}`);
    }
  }
}
