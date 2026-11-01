/**
 * AuthMfaEnabledHandler — identity.auth.mfa_enabled
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderMfaEnabledEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const AUTH_MFA_ENABLED_EVENT = 'identity.auth.mfa_enabled';

@Injectable()
export class AuthMfaEnabledHandler implements OnModuleInit {
  private readonly logger = new Logger(AuthMfaEnabledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(AUTH_MFA_ENABLED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderMfaEnabledEmail({
      name: (p.name as string) ?? 'ব্যবহারকারী',
      method: (p.method as string) ?? undefined,
      locale: (p.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: 'MFA চালু হয়েছে',
          body: html || 'আপনার অ্যাকাউন্টে মাল্টি-ফ্যাক্টর প্রমাণীকরণ চালু করা হয়েছে।',
          data: {
          html, eventType: 'identity.auth.mfa_enabled', ...p },
          idempotencyKey: 'auth-mfa-enabled-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.auth.mfa_enabled notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.auth.mfa_enabled"');
  }
}
