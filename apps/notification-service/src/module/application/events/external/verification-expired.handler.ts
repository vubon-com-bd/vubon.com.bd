/**
 * VerificationExpiredHandler — identity.verification.expired
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderVerificationExpiredEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VERIFICATION_EXPIRED_EVENT = 'identity.verification.expired';

@Injectable()
export class VerificationExpiredHandler implements OnModuleInit {
  private readonly logger = new Logger(VerificationExpiredHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VERIFICATION_EXPIRED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderVerificationExpiredEmail({
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
          category: NOTIFICATION_CATEGORY.AUTH,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: isBn ? 'যাচাই মেয়াদ শেষ' : 'Expired',
          body: html || 'আপনার যাচাইকরণের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে নতুন একটি অনুরোধ করুন।',
          data: { eventType: 'identity.verification.expired', ...p , html },
          idempotencyKey: 'verification-expired-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.verification.expired notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.verification.expired"');
  }
}
