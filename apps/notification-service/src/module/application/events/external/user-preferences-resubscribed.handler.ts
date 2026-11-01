/**
 * UserPreferencesResubscribedHandler — identity.user.preferences_resubscribed
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

export const USER_PREFERENCES_RESUBSCRIBED_EVENT = 'identity.user.preferences_resubscribed';

@Injectable()
export class UserPreferencesResubscribedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserPreferencesResubscribedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_PREFERENCES_RESUBSCRIBED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: 'পুনরায় সাবস্ক্রাইব',
          body: 'আপনি পুনরায় সাবস্ক্রাইব করেছেন।',
          data: { eventType: 'identity.user.preferences_resubscribed', ...p },
          idempotencyKey: 'user-preferences-resubscribed-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.user.preferences_resubscribed → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.user.preferences_resubscribed"');
  }
}
