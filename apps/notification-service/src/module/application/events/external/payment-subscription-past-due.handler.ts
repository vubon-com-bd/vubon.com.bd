/**
 * PaymentSubscriptionPastDueHandler — payment.subscription.past_due
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderSubscriptionPastDueEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PAYMENT_SUBSCRIPTION_PAST_DUE_EVENT = 'payment.subscription.past_due';

@Injectable()
export class PaymentSubscriptionPastDueHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentSubscriptionPastDueHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_SUBSCRIPTION_PAST_DUE_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderSubscriptionPastDueEmail({
            name: ((p.name as string) ?? (typeof p.firstName === 'string' ? p.firstName as string : 'গ্রাহক')),
            locale: (((p.locale as 'en' | 'bn') ?? 'bn')),
            ...p,
          } as any);
        } catch (err) {
          this.logger.warn(`Template render failed: ${err}`);
        }

        const isBn = ((p.locale as string) ?? 'bn') === 'bn';

        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
          category: NOTIFICATION_CATEGORY.PAYMENT,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: isBn ? 'সাবস্ক্রিপশন বিলম্বিত' : 'Past Due',
          body: html || 'আপনার সাবস্ক্রিপশন পেমেন্ট বকেয়া হয়েছে। অনুগ্রহ করে দ্রুত পরিশোধ করুন।',
          data: { eventType: 'payment.subscription.past_due', ...p , html },
          idempotencyKey: 'payment-subscription-past-due-' + (event as { id: string }).id,
        });
        this.logger.log('✅ payment.subscription.past_due বিজ্ঞপ্তি পাঠানো হয়েছে → ' + userId);
      } catch (err) {
        this.logger.error('ব্যর্থ: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ রেজিস্টার্ড হ্যান্ডলার: "payment.subscription.past_due"');
  }
}
