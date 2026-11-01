/**
 * UserProfileAvatarUpdatedHandler — identity.user.profile_avatar_updated
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

export const USER_PROFILE_AVATAR_UPDATED_EVENT = 'identity.user.profile_avatar_updated';

@Injectable()
export class UserProfileAvatarUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserProfileAvatarUpdatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_PROFILE_AVATAR_UPDATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: 'অ্যাভাটার আপডেট',
          body: 'আপনার প্রোফাইল অ্যাভাটার আপডেট করা হয়েছে।',
          data: { eventType: 'identity.user.profile_avatar_updated', ...p },
          idempotencyKey: 'user-profile-avatar-updated-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.user.profile_avatar_updated → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.user.profile_avatar_updated"');
  }
}
