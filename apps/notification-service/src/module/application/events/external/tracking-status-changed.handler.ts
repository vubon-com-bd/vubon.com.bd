/**
 * TrackingStatusChangedHandler — reacts to order.order-tracking.status_changed
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
import { renderTrackingStatusChangedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const TRACKING_STATUS_CHANGED_EVENT = 'order.order-tracking.status_changed';

interface TrackingStatusChangedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly fromStatus?: string;
  readonly toStatus?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface TrackingStatusChangedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-tracking.status_changed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: TrackingStatusChangedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class TrackingStatusChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(TrackingStatusChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(TRACKING_STATUS_CHANGED_EVENT, async (event) => {
      await this.handle(event as unknown as TrackingStatusChangedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${TRACKING_STATUS_CHANGED_EVENT}"`);
  }

  private async handle(event: TrackingStatusChangedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order-tracking.status_changed — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderTrackingStatusChangedEmail({
          name,
          orderId: payload.orderId,
          fromStatus: payload.fromStatus,
          toStatus: payload.toStatus,
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
        subject: `ট্র্যাকিং আপডেট - #{{orderId}}`,
        body: html || `ট্র্যাকিং স্ট্যাটাস আপডেট হয়েছে।`,
        data: {
          html,
          eventType: 'order.order-tracking.status_changed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `tracking-status-changed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`TrackingStatusChangedHandler failed: ${msg}`);
    }
  }
}
