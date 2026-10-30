/**
 * AuthEmailVerifiedHandler — identity.auth.email_verified → Bengali email
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderEmailVerifiedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const AUTH_EMAIL_VERIFIED_EVENT = 'identity.auth.email_verified';

@Injectable()
export class AuthEmailVerifiedHandler implements OnModuleInit {
  private readonly logger = new Logger(AuthEmailVerifiedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(AUTH_EMAIL_VERIFIED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;

      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderEmailVerifiedEmail({
      name: (p.name as string) ?? 'ব্যবহারকারী',
      email: (p.email as string) ?? '',
      locale: (p.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.VERIFICATION,
          category: NOTIFICATION_CATEGORY.AUTH,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: '✅ ইমেইল যাচাই সম্পন্ন',
          body: html || `প্রিয় গ্রাহক,\n\nআপনার ইমেইল সফলভাবে যাচাই করা হয়েছে।\n\nএখন আপনি সব ধরনের নোটিফিকেশন পাবেন।\n\nধন্যবাদ,\nVubon টিম`,
          data: {
          html, eventType: 'identity.auth.email_verified', ...p },
          idempotencyKey: 'auth-email-verified-' + (event as { id: string }).id,
          email,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.auth.email_verified"');
  }
}
