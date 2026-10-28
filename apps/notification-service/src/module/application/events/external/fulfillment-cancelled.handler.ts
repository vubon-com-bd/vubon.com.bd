/**
 * FulfillmentCancelledHandler — reacts to order.order-fulfillment.cancelled
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
import { renderFulfillmentCancelledEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const FULFILLMENT_CANCELLED_EVENT = 'order.order-fulfillment.cancelled';

interface FulfillmentCancelledHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly reason?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface FulfillmentCancelledHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-fulfillment.cancelled';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: FulfillmentCancelledHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class FulfillmentCancelledHandler implements OnModuleInit {
  private readonly logger = new Logger(FulfillmentCancelledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(FULFILLMENT_CANCELLED_EVENT, async (event) => {
      await this.handle(event as unknown as FulfillmentCancelledHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${FULFILLMENT_CANCELLED_EVENT}"`);
  }

  private async handle(event: FulfillmentCancelledHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order-fulfillment.cancelled — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderFulfillmentCancelledEmail({
          name,
          orderId: payload.orderId,
          reason: payload.reason,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: `ফুলফিলমেন্ট বাতিল - #{{orderId}}`,
        body: `আপনার অর্ডারের ফুলফিলমেন্ট বাতিল হয়েছে।`,
        data: {
          html,
          eventType: 'order.order-fulfillment.cancelled',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `fulfillment-cancelled-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`FulfillmentCancelledHandler failed: ${msg}`);
    }
  }
}
