/**
 * TrackingLocationUpdatedHandler — reacts to order.order-tracking.location_updated
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
import { renderTrackingLocationUpdatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const TRACKING_LOCATION_UPDATED_EVENT = 'order.order-tracking.location_updated';

interface TrackingLocationUpdatedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly location?: string;
  readonly trackingNumber?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface TrackingLocationUpdatedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-tracking.location_updated';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: TrackingLocationUpdatedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class TrackingLocationUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(TrackingLocationUpdatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(TRACKING_LOCATION_UPDATED_EVENT, async (event) => {
      await this.handle(event as unknown as TrackingLocationUpdatedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${TRACKING_LOCATION_UPDATED_EVENT}"`);
  }

  private async handle(event: TrackingLocationUpdatedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order-tracking.location_updated — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderTrackingLocationUpdatedEmail({
          name,
          orderId: payload.orderId,
          location: payload.location,
          trackingNumber: payload.trackingNumber,
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
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: `অবস্থান আপডেট - #{{orderId}}`,
        body: html || `প্যাকেজের নতুন অবস্থান আপডেট হয়েছে।`,
        data: {
          html,
          eventType: 'order.order-tracking.location_updated',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `tracking-location-updated-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`TrackingLocationUpdatedHandler failed: ${msg}`);
    }
  }
}
