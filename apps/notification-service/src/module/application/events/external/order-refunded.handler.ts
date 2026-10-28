/**
 * OrderRefundedHandler — notifies order refund
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderRefundEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { UserClient } from '@infrastructure/services/external/user.client.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const ORDER_REFUNDED_EVENT = 'order.order.refunded';

@Injectable()
export class OrderRefundedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderRefundedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_REFUNDED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_REFUNDED_EVENT}"`);
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
        html = renderRefundEmail({
          name: payload?.name ?? 'Customer',
          orderId: payload?.orderId ?? '',
          amount: payload?.amount ?? payload?.total ?? 0,
          currency: payload?.currency ?? 'BDT',
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
        subject: isBn ? `💰 অর্ডার রিফান্ড - #${payload?.orderId ?? ""}` : `💰 Order Refunded - #${payload?.orderId ?? ""}`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার অর্ডার #${payload?.orderId ?? ""} রিফান্ড করা হয়েছে। ৳${payload?.amount ?? 0} ফেরত দেওয়া হচ্ছে।` : `Hi ${payload?.name ?? "Customer"}, order #${payload?.orderId ?? ""} refunded. ৳${payload?.amount ?? 0} being returned.`,
        html,
        data: { eventType: 'order.order.refunded', ...payload },
        email: resolvedEmail,
        phone: payload?.phone,
        idempotencyKey: `order-refunded-${event.id}`,
      });
      this.logger.log(`✅ OrderRefundedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`OrderRefundedHandler failed: ${err}`);
    }
  }
}
