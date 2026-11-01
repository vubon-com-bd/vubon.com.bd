/**
 * VendorVerificationExpiredHandler — ভেন্ডর ভেরিফিকেশন মেয়াদ শেষের সতর্কতা
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderVendorVerificationExpiredEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_VERIFICATION_EXPIRED_EVENT = 'vendor.verification.expired';

@Injectable()
export class VendorVerificationExpiredHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorVerificationExpiredHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_VERIFICATION_EXPIRED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.vendorId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderVendorVerificationExpiredEmail({
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
          subject: isBn ? 'Expired' : 'Expired',
          body: html || 'আপনার ভেন্ডর ভেরিফিকেশনের মেয়াদ শেষ হয়ে গেছে। বিক্রি চালিয়ে যেতে অনুগ্রহ করে আবার জমা দিন।',
          data: { eventType: 'vendor.verification.expired', ...p , html },
          idempotencyKey: 'vendor-verif-expired-' + (event as { id: string }).id,
        });
        this.logger.log('✅ ভেরিফিকেশন মেয়াদ শেষ নোটিফিকেশন পাঠানো হয়েছে → ' + userId);
      } catch (err) {
        this.logger.error('ব্যর্থ: ' + (err instanceof Error ? err.message : 'অজানা'));
      }
    });
    this.logger.log('✅ "vendor.verification.expired" এর জন্য হ্যান্ডলার নিবন্ধিত');
  }
}
