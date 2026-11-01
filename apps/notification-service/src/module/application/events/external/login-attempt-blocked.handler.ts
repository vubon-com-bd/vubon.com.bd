/**
 * LoginAttemptBlockedHandler — identity.login_attempt.blocked
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

export const LOGIN_ATTEMPT_BLOCKED_EVENT = 'identity.login_attempt.blocked';

@Injectable()
export class LoginAttemptBlockedHandler implements OnModuleInit {
  private readonly logger = new Logger(LoginAttemptBlockedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(LOGIN_ATTEMPT_BLOCKED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: 'লগইন ব্লক',
          body: 'একটি লগইন প্রচেষ্টা ব্লক করা হয়েছে।',
          data: { eventType: 'identity.login_attempt.blocked', ...p },
          idempotencyKey: 'login-attempt-blocked-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.login_attempt.blocked → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.login_attempt.blocked"');
  }
}
