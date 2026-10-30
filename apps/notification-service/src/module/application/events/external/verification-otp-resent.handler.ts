/**
 * VerificationOtpResentHandler — identity.verification.otp_resent
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VERIFICATION_OTP_RESENT_EVENT = 'identity.verification.otp_resent';

@Injectable()
export class VerificationOtpResentHandler implements OnModuleInit {
  private readonly logger = new Logger(VerificationOtpResentHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VERIFICATION_OTP_RESENT_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.VERIFICATION,
          category: NOTIFICATION_CATEGORY.AUTH,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: 'OTP পুনরায় পাঠানো',
          body: 'আপনার কাছে নতুন OTP পাঠানো হয়েছে।',
          data: { eventType: 'identity.verification.otp_resent', ...p },
          idempotencyKey: 'verification-otp-resent-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.verification.otp_resent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.verification.otp_resent"');
  }
}
