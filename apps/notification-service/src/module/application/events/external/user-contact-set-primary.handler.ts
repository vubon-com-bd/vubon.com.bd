/**
 * UserContactSetPrimaryHandler — identity.user.contact_set_primary
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

export const USER_CONTACT_SET_PRIMARY_EVENT = 'identity.user.contact_set_primary';

@Injectable()
export class UserContactSetPrimaryHandler implements OnModuleInit {
  private readonly logger = new Logger(UserContactSetPrimaryHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_CONTACT_SET_PRIMARY_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: 'প্রাথমিক যোগাযোগ সেট',
          body: 'আপনার প্রাথমিক যোগাযোগ আপডেট করা হয়েছে।',
          data: { eventType: 'identity.user.contact_set_primary', ...p },
          idempotencyKey: 'user-contact-set-primary-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.user.contact_set_primary → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.user.contact_set_primary"');
  }
}
