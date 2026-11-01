/**
 * VendorPayoutFailedHandler — vendor.payout.failed → Bengali notification
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderPayoutFailedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_PAYOUT_FAILED_EVENT = 'vendor.payout.failed';

@Injectable()
export class VendorPayoutFailedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorPayoutFailedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}
  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_PAYOUT_FAILED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.vendorId as string) ?? (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;
      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderPayoutFailedEmail({
      name: (p.name as string) ?? 'ভেন্ডর',
      amount: (p.amount as number) ?? 0,
      currency: (p.currency as string) ?? 'BDT',
      reason: (p.reason as string) ?? undefined,
      locale: (p.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ALERT,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: '❌ পেআউট ব্যর্থ',
          body: html || `প্রিয় ভেন্ডর,\n\nআপনার payout ব্যর্থ হয়েছে।\n\nপরিমাণ: {amount} {currency}\nকারণ: {reason}\n\nব্যাংক তথ্য যাচাই করুন:\nVubon Seller → Bank Accounts\n\nসহায়তা: support@vubon.com.bd`,
          data: {
          html, eventType: 'vendor.payout.failed', ...p },
          idempotencyKey: 'vendor-payout-failed-' + (event as { id: string }).id,
          email,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "vendor.payout.failed"');
  }
}
