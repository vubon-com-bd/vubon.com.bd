/**
 * DeliveryPickedUpHandler — reacts to order.delivery.picked_up
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
import { renderDeliveryPickedUpEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const DELIVERY_PICKED_UP_EVENT = 'order.delivery.picked_up';

interface DeliveryPickedUpHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly trackingNumber?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface DeliveryPickedUpHandlerEvent {
  readonly id: string;
  readonly type: 'order.delivery.picked_up';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: DeliveryPickedUpHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class DeliveryPickedUpHandler implements OnModuleInit {
  private readonly logger = new Logger(DeliveryPickedUpHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(DELIVERY_PICKED_UP_EVENT, async (event) => {
      await this.handle(event as unknown as DeliveryPickedUpHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${DELIVERY_PICKED_UP_EVENT}"`);
  }

  private async handle(event: DeliveryPickedUpHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.delivery.picked_up — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';

    // ─── Fetch user profile for email/name/locale ───
    const _userId = (payload as any).userId ?? event.aggregateId;
    let userEmail = (payload as any).email;
    let userName = (payload as any).name;
    let userLocale = (payload as any).locale;
    if (!userEmail && _userId) {
      try {
        const profile = await this.userClient.getById(_userId);
        if (profile) {
          userEmail = userEmail ?? profile.email;
          userName = userName ?? profile.name ?? profile.firstName;
          userLocale = userLocale ?? (profile.locale as 'en' | 'bn' | undefined);
        }
      } catch (err) {
        this.logger.warn(`User fetch failed for ${_userId}: ${err}`);
      }
    }
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderDeliveryPickedUpEmail({
          name,
          orderId: payload.orderId,
          trackingNumber: payload.trackingNumber,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.SHIPPING_UPDATE,
        category: NOTIFICATION_CATEGORY.SHIPPING,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: `পণ্য সংগ্রহ হয়েছে - #{{orderId}}`,
        body: html || `আপনার অর্ডারের পণ্য কুরিয়ার সংগ্রহ করেছে।`,
        data: {
          html,
          eventType: 'order.delivery.picked_up',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `delivery-picked-up-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`DeliveryPickedUpHandler failed: ${msg}`);
    }
  }
}
