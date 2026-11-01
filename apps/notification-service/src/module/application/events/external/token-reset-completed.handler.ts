/**
 * TokenResetCompletedHandler — identity.token.reset_completed → Bengali email
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderTokenResetCompletedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const TOKEN_RESET_COMPLETED_EVENT = 'identity.token.reset_completed';

@Injectable()
export class TokenResetCompletedHandler implements OnModuleInit {
  private readonly logger = new Logger(TokenResetCompletedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(TOKEN_RESET_COMPLETED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;

      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderTokenResetCompletedEmail({
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
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: isBn ? 'টোকেন রিসেট' : 'Reset Completed',
          body: html || `প্রিয় গ্রাহক,\n\nআপনার পাসওয়ার্ড সফলভাবে রিসেট করা হয়েছে।\n\nআপনি এখন নতুন পাসওয়ার্ড দিয়ে লগইন করতে পারবেন।\n\nযদি আপনি না করে থাকেন:\nsupport@vubon.com.bd এ যোগাযোগ করুন।\n\nVubon টিম`,
          data: { eventType: 'identity.token.reset_completed', ...p , html },
          idempotencyKey: 'token-reset-completed-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.token.reset_completed"');
  }
}
