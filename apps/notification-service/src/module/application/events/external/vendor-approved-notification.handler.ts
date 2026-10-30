/**
 * VendorApprovedNotificationHandler — ভেন্ডর অনুমোদনের নোটিফিকেশন
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderApprovalApprovedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_APPROVED_NOTIF_EVENT = 'vendor.approval.approved';

@Injectable()
export class VendorApprovedNotificationHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorApprovedNotificationHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_APPROVED_NOTIF_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.vendorId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderApprovalApprovedEmail({
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
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: isBn ? 'Approved' : 'Approved',
          body: html || 'অভিনন্দন! আপনার ভেন্ডর অ্যাকাউন্ট অনুমোদিত হয়েছে। এখন আপনি ভুবনে বিক্রি শুরু করতে পারেন।',
          data: { eventType: 'vendor.approval.approved', ...p , html },
          idempotencyKey: 'vendor-approved-' + (event as { id: string }).id,
        });
        this.logger.log('✅ ভেন্ডর অনুমোদন নোটিফিকেশন পাঠানো হয়েছে → ' + userId);
      } catch (err) {
        this.logger.error('ব্যর্থ: ' + (err instanceof Error ? err.message : 'অজানা'));
      }
    });
    this.logger.log('✅ "vendor.approval.approved" এর জন্য হ্যান্ডলার নিবন্ধিত');
  }
}
