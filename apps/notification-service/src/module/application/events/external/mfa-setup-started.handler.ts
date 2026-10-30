/**
 * MfaSetupStartedHandler — identity.mfa.setup_started
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

export const MFA_SETUP_STARTED_EVENT = 'identity.mfa.setup_started';

@Injectable()
export class MfaSetupStartedHandler implements OnModuleInit {
  private readonly logger = new Logger(MfaSetupStartedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(MFA_SETUP_STARTED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.VERIFICATION,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: 'MFA সেটআপ শুরু',
          body: 'MFA সেটআপ শুরু করা হয়েছে।',
          data: { eventType: 'identity.mfa.setup_started', ...p },
          idempotencyKey: 'mfa-setup-started-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.mfa.setup_started → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.mfa.setup_started"');
  }
}
