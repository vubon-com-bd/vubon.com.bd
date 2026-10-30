/**
 * AuthMfaDisabledHandler — identity.auth.mfa_disabled
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderMfaDisabledEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const AUTH_MFA_DISABLED_EVENT = 'identity.auth.mfa_disabled';

@Injectable()
export class AuthMfaDisabledHandler implements OnModuleInit {
  private readonly logger = new Logger(AuthMfaDisabledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(AUTH_MFA_DISABLED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderMfaDisabledEmail({
      name: (p.name as string) ?? 'ব্যবহারকারী',
      locale: (p.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.CRITICAL,
          subject: 'MFA বন্ধ হয়েছে',
          body: html || 'আপনার অ্যাকাউন্টে MFA বন্ধ করা হয়েছে। যদি আপনি না করে থাকেন, এখনই আপনার অ্যাকাউন্ট সুরক্ষিত করুন।',
          data: {
          html, eventType: 'identity.auth.mfa_disabled', ...p },
          idempotencyKey: 'auth-mfa-disabled-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.auth.mfa_disabled notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.auth.mfa_disabled"');
  }
}
