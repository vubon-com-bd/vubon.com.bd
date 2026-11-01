/**
 * UserAddressSetDefaultHandler — identity.user.address_set_default
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

export const USER_ADDRESS_SET_DEFAULT_EVENT = 'identity.user.address_set_default';

@Injectable()
export class UserAddressSetDefaultHandler implements OnModuleInit {
  private readonly logger = new Logger(UserAddressSetDefaultHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_ADDRESS_SET_DEFAULT_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: 'ঠিকানা ডিফল্ট',
          body: 'আপনার ডিফল্ট ঠিকানা আপডেট করা হয়েছে।',
          data: { eventType: 'identity.user.address_set_default', ...p },
          idempotencyKey: 'user-address-set-default-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.user.address_set_default → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.user.address_set_default"');
  }
}
