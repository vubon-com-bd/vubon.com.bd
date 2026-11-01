/**
 * UserAddressUpdatedHandler — identity.user.address_updated
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

export const USER_ADDRESS_UPDATED_EVENT = 'identity.user.address_updated';

@Injectable()
export class UserAddressUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserAddressUpdatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_ADDRESS_UPDATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: 'ঠিকানা আপডেট',
          body: 'আপনার ঠিকানা আপডেট করা হয়েছে।',
          data: { eventType: 'identity.user.address_updated', ...p },
          idempotencyKey: 'user-address-updated-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.user.address_updated → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.user.address_updated"');
  }
}
