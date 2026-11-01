/**
 * PaymentVerificationVerifiedHandler — payment.verification.verified → Bengali notification
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderVerificationVerifiedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PAYMENT_VERIFICATION_VERIFIED_EVENT = 'payment.verification.verified';

@Injectable()
export class PaymentVerificationVerifiedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentVerificationVerifiedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_VERIFICATION_VERIFIED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;
      const orderId = (p.orderId as string) ?? '';
      const amount = p.amount ?? p.total ?? 0;
      const currency = (p.currency as string) ?? 'BDT';

      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderVerificationVerifiedEmail({
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
          type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
          category: NOTIFICATION_CATEGORY.PAYMENT,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: isBn ? 'যাচাই সম্পন্ন' : 'Verified',
          body: html || `প্রিয় গ্রাহক,\n\nপেমেন্ট যাচাই সফলভাবে সম্পন্ন হয়েছে।\n\nএখন আপনি নিশ্চিন্তে পেমেন্ট করতে পারবেন।\n\nVubon টিম`,
          data: { eventType: 'payment.verification.verified', ...p , html },
          idempotencyKey: 'payment-verification-verified-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "payment.verification.verified"');
  }
}
