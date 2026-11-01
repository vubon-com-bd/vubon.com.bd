/**
 * VendorRejectedHandler — vendor.vendor.rejected → Bengali notification
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderVendorRejectedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_REJECTED_EVENT = 'vendor.vendor.rejected';

@Injectable()
export class VendorRejectedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorRejectedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}
  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_REJECTED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.vendorId as string) ?? (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;
      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderVendorRejectedEmail({
      name: (p.name as string) ?? 'ভেন্ডর',
      reason: (p.reason as string) ?? undefined,
      locale: (p.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ALERT,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: '❌ ভেন্ডর আবেদন প্রত্যাখ্যাত',
          body: html || `প্রিয় ভেন্ডর,\n\nদুঃখিত, আপনার ভেন্ডর application প্রত্যাখ্যান করা হয়েছে।\n\nকারণ: {reason}\n\nআবার চেষ্টা করুন:\nVubon Seller → Apply`,
          data: {
          html, eventType: 'vendor.vendor.rejected', ...p },
          idempotencyKey: 'vendor-rejected-' + (event as { id: string }).id,
          email,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "vendor.vendor.rejected"');
  }
}
