/**
 * SessionIdleTimeoutHandler — identity.session.idle_timeout
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

export const SESSION_IDLE_TIMEOUT_EVENT = 'identity.session.idle_timeout';

@Injectable()
export class SessionIdleTimeoutHandler implements OnModuleInit {
  private readonly logger = new Logger(SessionIdleTimeoutHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(SESSION_IDLE_TIMEOUT_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.AUTH,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: 'সেশন টাইমআউট',
          body: 'অনেকক্ষণ নিষ্ক্রিয় থাকায় আপনার সেশন টাইমআউট হয়েছে।',
          data: { eventType: 'identity.session.idle_timeout', ...p },
          idempotencyKey: 'session-idle-timeout-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.session.idle_timeout → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.session.idle_timeout"');
  }
}
