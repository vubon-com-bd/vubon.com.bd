/**
 * VendorDeletedHandler — vendor.vendor.deleted → Bengali notification
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderVendorDeletedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_DELETED_EVENT = 'vendor.vendor.deleted';

@Injectable()
export class VendorDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorDeletedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}
  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_DELETED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.vendorId as string) ?? (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;
      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderVendorDeletedEmail({
      name: (p.name as string) ?? 'ভেন্ডর',
      deletedAt: (p.deletedAt as string) ?? new Date().toISOString(),
      locale: (p.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: '👋 ভেন্ডর অ্যাকাউন্ট মুছে ফেলা হয়েছে',
          body: html || `প্রিয় ভেন্ডর,\n\nআপনার vendor অ্যাকাউন্ট মুছে ফেলা হয়েছে।\n\nদুঃখিত যে আপনি চলে যাচ্ছেন।\n\nআবার ফিরতে: support@vubon.com.bd\n\nVubon টিম`,
          data: {
          html, eventType: 'vendor.vendor.deleted', ...p },
          idempotencyKey: 'vendor-deleted-' + (event as { id: string }).id,
          email,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "vendor.vendor.deleted"');
  }
}
