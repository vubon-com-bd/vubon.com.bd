/**
 * VendorSubscriptionPaymentFailedHandler — vendor.subscription.payment_failed → Bengali notification
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderSubscriptionPaymentFailedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_SUBSCRIPTION_PAYMENT_FAILED_EVENT = 'vendor.subscription.payment_failed';

@Injectable()
export class VendorSubscriptionPaymentFailedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorSubscriptionPaymentFailedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}
  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_SUBSCRIPTION_PAYMENT_FAILED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.vendorId as string) ?? (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;
      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderSubscriptionPaymentFailedEmail({
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
          type: NOTIFICATION_TYPE.ALERT,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: isBn ? 'Payment Failed' : 'Payment Failed',
          body: html || `প্রিয় ভেন্ডর,\n\nআপনার সাবস্ক্রিপশন পেমেন্ট ব্যর্থ হয়েছে।\n\nকারণ: {reason}\n\nপেমেন্ট আপডেট করুন:\nVubon Seller → Billing\n\nসেবা বন্ধ হতে পারে!`,
          data: { eventType: 'vendor.subscription.payment_failed', ...p , html },
          idempotencyKey: 'vendor-subscription-payment-failed-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "vendor.subscription.payment_failed"');
  }
}
