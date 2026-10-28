/**
 * OrderReturnedHandler — notifies when order is returned
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderOrderReturnedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { UserClient } from '@infrastructure/services/external/user.client.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const ORDER_RETURNED_EVENT = 'order.order.returned';

@Injectable()
export class OrderReturnedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderReturnedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_RETURNED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_RETURNED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
            // ─── Resolve user profile (email, name, locale) ───
      let resolvedEmail = payload?.email as string | undefined;
      let resolvedName = payload?.name as string | undefined;
      let resolvedLocale = payload?.locale as string | undefined;
      if (!resolvedEmail || !resolvedName) {
        try {
          const userProfile = await this.userClient.getById(payload?.userId ?? event.aggregateId);
          if (userProfile) {
            resolvedEmail = resolvedEmail ?? userProfile.email;
            resolvedName = resolvedName ?? userProfile.name ?? userProfile.firstName;
            resolvedLocale = resolvedLocale ?? userProfile.locale;
          }
        } catch (err) {
          this.logger.warn(`User profile fetch failed: ${err}`);
        }
      }

      // ─── Render HTML email ───
      let html = '';
      try {
        html = renderOrderReturnedEmail({
          name: payload?.name ?? 'Customer',
          orderId: payload?.orderId ?? '',
          reason: payload?.reason,
          locale: (payload?.locale ?? 'bn') as 'bn' | 'en',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: isBn ? `🔄 রিটার্ন সম্পন্ন - #${payload?.orderId ?? ""}` : `🔄 Order Returned - #${payload?.orderId ?? ""}`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার অর্ডার #${payload?.orderId ?? ""} সফলভাবে রিটার্ন হয়েছে।` : `Hi ${payload?.name ?? "Customer"}, order #${payload?.orderId ?? ""} has been returned.`,
        html,
        data: { eventType: 'order.order.returned', ...payload },
        email: resolvedEmail,
        phone: payload?.phone,
        idempotencyKey: `order-returned-${event.id}`,
      });
      this.logger.log(`✅ OrderReturnedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`OrderReturnedHandler failed: ${err}`);
    }
  }
}
