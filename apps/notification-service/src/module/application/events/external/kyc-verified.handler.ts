/**
 * KycVerifiedHandler — identity.kyc.verified → Bengali email
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderKycVerifiedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const KYC_VERIFIED_EVENT = 'identity.kyc.verified';

@Injectable()
export class KycVerifiedHandler implements OnModuleInit {
  private readonly logger = new Logger(KycVerifiedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(KYC_VERIFIED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;

      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderKycVerifiedEmail({
      name: (p.name as string) ?? 'ব্যবহারকারী',
      verifiedAt: (p.verifiedAt as string) ?? new Date().toISOString(),
      locale: (p.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.VERIFICATION,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: '🎉 KYC যাচাই সম্পন্ন!',
          body: html || `প্রিয় গ্রাহক,\n\nঅভিনন্দন! আপনার KYC যাচাই সম্পন্ন হয়েছে।\n\nএখন আপনি পাবেন:\n✓ Verified badge\n✓ বেশি লেনদেন লিমিট\n✓ দ্রুত withdrawal\n✓ প্রিমিয়াম সুবিধা\n\nVubon টিম`,
          data: {
          html, eventType: 'identity.kyc.verified', ...p },
          idempotencyKey: 'kyc-verified-' + (event as { id: string }).id,
          email,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.kyc.verified"');
  }
}
