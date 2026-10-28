/**
 * OrderStatusChangedHandler — notifies status changes
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderStatusChangedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { UserClient } from '@infrastructure/services/external/user.client.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const ORDER_STATUS_CHANGED_EVENT = 'order.order.status_changed';

@Injectable()
export class OrderStatusChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderStatusChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_STATUS_CHANGED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_STATUS_CHANGED_EVENT}"`);
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
        html = renderStatusChangedEmail({
          name: payload?.name ?? 'Customer',
          fromStatus: payload?.fromStatus ?? payload?.oldStatus ?? 'unknown',
          toStatus: payload?.toStatus ?? payload?.newStatus ?? 'updated',
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
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? `অর্ডার স্ট্যাটাস আপডেট - #${payload?.orderId ?? ""}` : `Order Status Update - #${payload?.orderId ?? ""}`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার অর্ডার স্ট্যাটাস: ${payload?.fromStatus ?? "?"} → ${payload?.toStatus ?? "?"}` : `Hi ${payload?.name ?? "Customer"}, order status: ${payload?.fromStatus ?? "?"} → ${payload?.toStatus ?? "?"}`,
        html,
        data: { eventType: 'order.order.status_changed', ...payload },
        email: resolvedEmail,
        phone: payload?.phone,
        idempotencyKey: `order-status-${event.id}`,
      });
      this.logger.log(`✅ OrderStatusChangedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`OrderStatusChangedHandler failed: ${err}`);
    }
  }
}
