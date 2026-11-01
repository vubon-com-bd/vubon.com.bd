/**
 * AccountLockLockedHandler — identity.account_lock.locked
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

export const ACCOUNT_LOCK_LOCKED_EVENT = 'identity.account_lock.locked';

@Injectable()
export class AccountLockLockedHandler implements OnModuleInit {
  private readonly logger = new Logger(AccountLockLockedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ACCOUNT_LOCK_LOCKED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.CRITICAL,
          subject: 'অ্যাকাউন্ট লক হয়েছে',
          body: 'আপনার অ্যাকাউন্ট সন্দেহজনক কার্যকলাপের কারণে লক করা হয়েছে।',
          data: { eventType: 'identity.account_lock.locked', ...p },
          idempotencyKey: 'account-lock-locked-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.account_lock.locked → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.account_lock.locked"');
  }
}
