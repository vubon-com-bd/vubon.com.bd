/**
 * SessionRefreshedHandler — identity.session.refreshed
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

export const SESSION_REFRESHED_EVENT = 'identity.session.refreshed';

@Injectable()
export class SessionRefreshedHandler implements OnModuleInit {
  private readonly logger = new Logger(SessionRefreshedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(SESSION_REFRESHED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.AUTH,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: 'সেশন রিফ্রেশ',
          body: 'আপনার সেশন রিফ্রেশ করা হয়েছে।',
          data: { eventType: 'identity.session.refreshed', ...p },
          idempotencyKey: 'session-refreshed-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.session.refreshed → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.session.refreshed"');
  }
}
