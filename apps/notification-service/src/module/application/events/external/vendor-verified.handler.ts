/**
 * VendorVerifiedHandler — vendor.vendor.verified → Bengali notification
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderVendorVerifiedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_VERIFIED_EVENT = 'vendor.vendor.verified';

@Injectable()
export class VendorVerifiedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorVerifiedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}
  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_VERIFIED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.vendorId as string) ?? (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;
      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderVendorVerifiedEmail({
      name: (p.name as string) ?? 'ভেন্ডর',
      verifiedAt: (p.verifiedAt as string) ?? new Date().toISOString(),
      locale: (p.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: '✅ ভেন্ডর যাচাই সম্পন্ন!',
          body: html || `প্রিয় ভেন্ডর,\n\n🎉 অভিনন্দন! আপনার ভেন্ডর অ্যাকাউন্ট সফলভাবে যাচাই হয়েছে!\n\nএখন আপনি পাবেন:\n✓ Verified badge\n✓ বেশি ট্রাস্ট\n✓ বেশি অর্ডার\n\nVubon Seller টিম`,
          data: {
          html, eventType: 'vendor.vendor.verified', ...p },
          idempotencyKey: 'vendor-verified-' + (event as { id: string }).id,
          email,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "vendor.vendor.verified"');
  }
}
