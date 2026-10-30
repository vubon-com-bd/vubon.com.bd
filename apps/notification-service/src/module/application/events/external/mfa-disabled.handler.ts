/**
 * MfaDisabledHandler — identity.mfa.disabled
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

export const MFA_DISABLED_EVENT = 'identity.mfa.disabled';

@Injectable()
export class MfaDisabledHandler implements OnModuleInit {
  private readonly logger = new Logger(MfaDisabledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(MFA_DISABLED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.CRITICAL,
          subject: 'MFA নিষ্ক্রিয়',
          body: 'মাল্টি-ফ্যাক্টর প্রমাণীকরণ নিষ্ক্রিয় করা হয়েছে।',
          data: { eventType: 'identity.mfa.disabled', ...p },
          idempotencyKey: 'mfa-disabled-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.mfa.disabled → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.mfa.disabled"');
  }
}
