/**
 * OrderItemAddedHandler — reacts to order.order-item.added
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
import { renderOrderItemAddedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const ORDER_ITEM_ADDED_EVENT = 'order.order-item.added';

interface OrderItemAddedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly productName?: string;
  readonly quantity?: number;
  readonly name?: string;
  readonly locale?: string;
}

interface OrderItemAddedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order-item.added';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderItemAddedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderItemAddedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderItemAddedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_ITEM_ADDED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderItemAddedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_ITEM_ADDED_EVENT}"`);
  }

  private async handle(event: OrderItemAddedHandlerEvent): Promise<void> {
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

    this.logger.log(`Received order.order-item.added — ${JSON.stringify(payload)}`);

    const locale = userLocale ?? 'bn';
    const name = userName ?? 'Customer';

    try {
      // ─── HTML template ───
      let html = '';
      try {
        html = renderOrderItemAddedEmail({
          name,
          orderId: payload.orderId,
          productName: payload.productName,
          quantity: payload.quantity,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const subject = this.i18n.interpolate(`নতুন আইটেম যোগ হয়েছে - #{{orderId}}`, { orderId: (payload as any).orderId });

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: subject,
        body: `অর্ডারে নতুন আইটেম যোগ হয়েছে।`,
        data: {
          html,
          eventType: 'order.order-item.added',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `order-item-added-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderItemAddedHandler failed: ${msg}`);
    }
  }
}
