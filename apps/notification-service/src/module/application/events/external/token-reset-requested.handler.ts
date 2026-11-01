/**
 * TokenResetRequestedHandler — identity.token.reset_requested
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

export const TOKEN_RESET_REQUESTED_EVENT = 'identity.token.reset_requested';

@Injectable()
export class TokenResetRequestedHandler implements OnModuleInit {
  private readonly logger = new Logger(TokenResetRequestedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(TOKEN_RESET_REQUESTED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: 'টোকেন রিসেট অনুরোধ',
          body: 'টোকেন রিসেটের অনুরোধ করা হয়েছে।',
          data: { eventType: 'identity.token.reset_requested', ...p },
          idempotencyKey: 'token-reset-requested-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.token.reset_requested → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.token.reset_requested"');
  }
}
