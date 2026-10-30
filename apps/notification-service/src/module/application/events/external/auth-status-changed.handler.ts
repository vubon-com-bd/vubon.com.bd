/**
 * AuthStatusChangedHandler — identity.auth.status_changed
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

export const AUTH_STATUS_CHANGED_EVENT = 'identity.auth.status_changed';

@Injectable()
export class AuthStatusChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(AuthStatusChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(AUTH_STATUS_CHANGED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.AUTH,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: 'প্রমাণীকরণ স্ট্যাটাস পরিবর্তন',
          body: 'আপনার প্রমাণীকরণের স্ট্যাটাস পরিবর্তিত হয়েছে।',
          data: { eventType: 'identity.auth.status_changed', ...p },
          idempotencyKey: 'auth-status-changed-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.auth.status_changed → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.auth.status_changed"');
  }
}
