/**
 * TrackingUpdatedHandler — reacts to order.order-tracking.updated
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
import { renderTrackingUpdatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const TRACKING_UPDATED_EVENT = 'order.order-tracking.updated';

interface TrackingUpdatedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly trackingNumber?: string;
  readonly location?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface TrackingUpdatedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-tracking.updated';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: TrackingUpdatedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class TrackingUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(TrackingUpdatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(TRACKING_UPDATED_EVENT, async (event) => {
      await this.handle(event as unknown as TrackingUpdatedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${TRACKING_UPDATED_EVENT}"`);
  }

  private async handle(event: TrackingUpdatedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order-tracking.updated — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderTrackingUpdatedEmail({
          name,
          orderId: payload.orderId,
          trackingNumber: payload.trackingNumber,
          location: payload.location,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`ট্র্যাকিং আপডেট - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SHIPPING_UPDATE,
        category: NOTIFICATION_CATEGORY.SHIPPING,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: subject,
        body: html || `আপনার অর্ডারের ট্র্যাকিং আপডেট এসেছে।`,
        data: {
          html,
          eventType: 'order.order-tracking.updated',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `tracking-updated-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`TrackingUpdatedHandler failed: ${msg}`);
    }
  }
}
