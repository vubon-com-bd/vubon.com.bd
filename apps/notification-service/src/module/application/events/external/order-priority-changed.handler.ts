/**
 * OrderPriorityChangedHandler — reacts to order.order.priority_changed
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
import { renderOrderPriorityChangedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const ORDER_PRIORITY_CHANGED_EVENT = 'order.order.priority_changed';

interface OrderPriorityChangedHandlerPayload {
  readonly orderId: string;
  readonly userId: string;
  readonly fromPriority?: string;
  readonly toPriority?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface OrderPriorityChangedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order.priority_changed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderPriorityChangedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderPriorityChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderPriorityChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_PRIORITY_CHANGED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderPriorityChangedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_PRIORITY_CHANGED_EVENT}"`);
  }

  private async handle(event: OrderPriorityChangedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.order.priority_changed — ${JSON.stringify(payload)}`);

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
        html = renderOrderPriorityChangedEmail({
          name,
          orderId: payload.orderId,
          fromPriority: payload.fromPriority,
          toPriority: payload.toPriority,
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
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: `অগ্রাধিকার পরিবর্তন - #{{orderId}}`,
        body: `অর্ডারের অগ্রাধিকার পরিবর্তন হয়েছে।`,
        data: {
          html,
          eventType: 'order.order.priority_changed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `order-priority-changed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderPriorityChangedHandler failed: ${msg}`);
    }
  }
}
