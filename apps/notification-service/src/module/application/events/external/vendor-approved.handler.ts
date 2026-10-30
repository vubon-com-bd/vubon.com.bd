/**
 * VendorApprovedHandler — vendor.vendor.approved → Bengali notification
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderVendorApprovedLifecycleEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_APPROVED_EVENT = 'vendor.vendor.approved';

@Injectable()
export class VendorApprovedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorApprovedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}
  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_APPROVED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.vendorId as string) ?? (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;
      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderVendorApprovedLifecycleEmail({
      name: (p.name as string) ?? 'ভেন্ডর',
      vendorId: (p.vendorId as string) ?? '',
      locale: (p.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: '🎉 অভিনন্দন! ভেন্ডর অনুমোদিত',
          body: html || `প্রিয় ভেন্ডর,\n\n🎉 অভিনন্দন! আপনার ভেন্ডর application অনুমোদিত হয়েছে!\n\nএখন আপনি:\n✓ পণ্য যোগ করুন\n✓ অর্ডার গ্রহণ করুন\n✓ বিক্রয় শুরু করুন\n\nড্যাশবোর্ড →\nVubon Seller`,
          data: {
          html, eventType: 'vendor.vendor.approved', ...p },
          idempotencyKey: 'vendor-approved-' + (event as { id: string }).id,
          email,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "vendor.vendor.approved"');
  }
}
