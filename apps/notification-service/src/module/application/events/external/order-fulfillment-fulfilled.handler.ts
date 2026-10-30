/**
 * OrderFulfillmentFulfilledHandler — reacts to order.order-fulfillment.fulfilled
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
import { renderOrderFulfillmentFulfilledEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const ORDER_FULFILLMENT_FULFILLED_EVENT = 'order.order-fulfillment.fulfilled';

interface OrderFulfillmentFulfilledHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly name?: string;
  readonly locale?: string;
}

interface OrderFulfillmentFulfilledHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-fulfillment.fulfilled';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderFulfillmentFulfilledHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderFulfillmentFulfilledHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderFulfillmentFulfilledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_FULFILLMENT_FULFILLED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderFulfillmentFulfilledHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_FULFILLMENT_FULFILLED_EVENT}"`);
  }

  private async handle(event: OrderFulfillmentFulfilledHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order-fulfillment.fulfilled — ${JSON.stringify(payload)}`);

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
        html = renderOrderFulfillmentFulfilledEmail({
          name,
          orderId: payload.orderId,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: `অর্ডার প্রস্তুত - #{{orderId}}`,
        body: html || `আপনার অর্ডার সম্পূর্ণ প্রস্তুত।`,
        data: {
          html,
          eventType: 'order.order-fulfillment.fulfilled',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `order-fulfillment-fulfilled-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderFulfillmentFulfilledHandler failed: ${msg}`);
    }
  }
}
