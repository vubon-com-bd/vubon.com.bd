/**
 * VendorDeactivatedHandler — vendor.vendor.deactivated → Bengali notification
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderVendorDeactivatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_DEACTIVATED_EVENT = 'vendor.vendor.deactivated';

@Injectable()
export class VendorDeactivatedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorDeactivatedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}
  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_DEACTIVATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.vendorId as string) ?? (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;
      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderVendorDeactivatedEmail({
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
          subject: isBn ? 'ভেন্ডর নিষ্ক্রিয়' : 'Deactivated',
          body: html || `প্রিয় ভেন্ডর,\n\nআপনার vendor অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে।\n\nকারণ: {reason}\n\nসহায়তা: support@vubon.com.bd`,
          data: { eventType: 'vendor.vendor.deactivated', ...p , html },
          idempotencyKey: 'vendor-deactivated-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "vendor.vendor.deactivated"');
  }
}
