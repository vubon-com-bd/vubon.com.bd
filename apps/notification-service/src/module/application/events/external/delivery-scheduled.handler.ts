/**
 * DeliveryScheduledHandler — reacts to order.delivery.scheduled
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
import { UserClient } from '@infrastructure/services/external/user.client.js';
import { renderDeliveryScheduledEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const DELIVERY_SCHEDULED_EVENT = 'order.delivery.scheduled';

interface DeliveryScheduledHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly name?: string;
  readonly estimatedAt?: string;
  readonly locale?: string;
}

interface DeliveryScheduledHandlerEvent {
  readonly id: string;
  readonly type: 'order.delivery.scheduled';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: DeliveryScheduledHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class DeliveryScheduledHandler implements OnModuleInit {
  private readonly logger = new Logger(DeliveryScheduledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(DELIVERY_SCHEDULED_EVENT, async (event) => {
      await this.handle(event as unknown as DeliveryScheduledHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${DELIVERY_SCHEDULED_EVENT}"`);
  }

  private async handle(event: DeliveryScheduledHandlerEvent): Promise<void> {
    const payload = event.payload;

    // ─── Fetch user profile for email/name/locale ───
    const _userId = (payload as any).userId ?? event.aggregateId;
    let userEmail = (payload as any).email as string | undefined;
    let userName = (payload as any).name as string | undefined;
    let userLocale = (payload as any).locale as string | undefined;
    if (!userEmail && _userId) {
      try {
        const profile = await this.userClient.getById(_userId);
        if (profile) {
          userEmail = userEmail ?? profile.email;
          userName = userName ?? (profile as any).name ?? (profile as any).firstName;
          userLocale = userLocale ?? ((profile as any).locale as string | undefined);
        }
      } catch (err) {
        this.logger.warn(`User fetch failed for ${_userId}: ${err}`);
      }
    }

    this.logger.log(`Received order.delivery.scheduled — ${JSON.stringify(payload)}`);

    const locale = userLocale ?? 'bn';
    const name = userName ?? 'Customer';

    try {
      // ─── HTML template ───
      let html = '';
      try {
        html = renderDeliveryScheduledEmail({
          name,
          orderId: payload.orderId,
          estimatedAt: payload.estimatedAt,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`ডেলিভারি নির্ধারিত হয়েছে - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.SHIPPING_UPDATE,
        category: NOTIFICATION_CATEGORY.SHIPPING,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: subject,
        body: `আপনার অর্ডারের ডেলিভারি নির্ধারিত হয়েছে।`,
        data: {
          html,
          eventType: 'order.delivery.scheduled',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `delivery-scheduled-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`DeliveryScheduledHandler failed: ${msg}`);
    }
  }
}
