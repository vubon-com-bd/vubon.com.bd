/**
 * SubscriptionRenewedHandler — notifies when subscription is renewed
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const SUBSCRIPTION_RENEWED_EVENT = 'payment.subscription.renewed';

@Injectable()
export class SubscriptionRenewedHandler implements OnModuleInit {
  private readonly logger = new Logger(SubscriptionRenewedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(SUBSCRIPTION_RENEWED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${SUBSCRIPTION_RENEWED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: isBn ? `সাবস্ক্রিপশন renew হয়েছে` : `Subscription Renewed`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার সাবস্ক্রিপশন সফলভাবে renew হয়েছে। পরবর্তী চার্জ: ${payload?.nextBillingAt ?? "N/A"}` : `Hi ${payload?.name ?? "Customer"}, your subscription has been renewed. Next billing: ${payload?.nextBillingAt ?? "N/A"}`,
        data: { eventType: 'payment.subscription.renewed', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `sub-renewed-${event.id}`,
      });
      this.logger.log(`✅ SubscriptionRenewedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`SubscriptionRenewedHandler failed: ${err}`);
    }
  }
}
