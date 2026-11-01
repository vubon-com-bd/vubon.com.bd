/**
 * SocialAccountUnlinkedHandler — identity.social_account.unlinked
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

export const SOCIAL_ACCOUNT_UNLINKED_EVENT = 'identity.social_account.unlinked';

@Injectable()
export class SocialAccountUnlinkedHandler implements OnModuleInit {
  private readonly logger = new Logger(SocialAccountUnlinkedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(SOCIAL_ACCOUNT_UNLINKED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: 'সোশ্যাল অ্যাকাউন্ট আনলিংক',
          body: 'একটি সোশ্যাল অ্যাকাউন্ট আনলিংক করা হয়েছে।',
          data: { eventType: 'identity.social_account.unlinked', ...p },
          idempotencyKey: 'social-account-unlinked-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.social_account.unlinked → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.social_account.unlinked"');
  }
}
