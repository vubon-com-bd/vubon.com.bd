/**
 * AccountLockExtendedHandler — identity.account_lock.extended
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

export const ACCOUNT_LOCK_EXTENDED_EVENT = 'identity.account_lock.extended';

@Injectable()
export class AccountLockExtendedHandler implements OnModuleInit {
  private readonly logger = new Logger(AccountLockExtendedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ACCOUNT_LOCK_EXTENDED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: 'লক বাড়ানো হয়েছে',
          
          body: 'Notification sent',
          data: { eventType: 'identity.account_lock.extended', ...p },
          idempotencyKey: 'account-lock-extended-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.account_lock.extended → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.account_lock.extended"');
  }
}
