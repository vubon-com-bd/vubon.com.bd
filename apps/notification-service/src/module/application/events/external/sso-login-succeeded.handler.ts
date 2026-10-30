/**
 * SsoLoginSucceededHandler — identity.sso.login_succeeded
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

export const SSO_LOGIN_SUCCEEDED_EVENT = 'identity.sso.login_succeeded';

@Injectable()
export class SsoLoginSucceededHandler implements OnModuleInit {
  private readonly logger = new Logger(SsoLoginSucceededHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(SSO_LOGIN_SUCCEEDED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.AUTH,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: 'SSO লগইন সফল',
          body: 'SSO দিয়ে সফলভাবে লগইন হয়েছে।',
          data: { eventType: 'identity.sso.login_succeeded', ...p },
          idempotencyKey: 'sso-login-succeeded-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.sso.login_succeeded → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.sso.login_succeeded"');
  }
}
