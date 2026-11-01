/**
 * VendorPayoutRejectedHandler — vendor.payout.rejected → Bengali notification
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderPayoutRejectedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_PAYOUT_REJECTED_EVENT = 'vendor.payout.rejected';

@Injectable()
export class VendorPayoutRejectedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorPayoutRejectedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}
  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_PAYOUT_REJECTED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.vendorId as string) ?? (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;
      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderPayoutRejectedEmail({
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
          subject: isBn ? 'Rejected' : 'Rejected',
          body: html || `প্রিয় ভেন্ডর,\n\nআপনার payout অনুরোধ প্রত্যাখ্যান করা হয়েছে।\n\nকারণ: {reason}\n\nসহায়তা: support@vubon.com.bd`,
          data: { eventType: 'vendor.payout.rejected', ...p , html },
          idempotencyKey: 'vendor-payout-rejected-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "vendor.payout.rejected"');
  }
}
