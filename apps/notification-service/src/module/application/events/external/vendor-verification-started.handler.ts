import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY, NOTIFICATION_TYPE, NOTIFICATION_PRIORITY } from '@vubon/shared-constants/platform';
import { renderVendorVerificationStartedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { NOTIFICATION_SERVICE, type INotificationService } from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_VERIFICATION_STARTED_EVENT = 'vendor.verification.started';

@Injectable()
export class VendorVerificationStartedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorVerificationStartedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}
  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_VERIFICATION_STARTED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.vendorId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderVendorVerificationStartedEmail({
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
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: isBn ? 'Started' : 'Started',
          body: html || 'Your vendor verification process has begun.',
          data: { eventType: VENDOR_VERIFICATION_STARTED_EVENT, ...p , html },
          idempotencyKey: 'vendor-verification-started-' + (event as { id: string }).id,
        });
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "vendor.verification.started"');
  }
}
