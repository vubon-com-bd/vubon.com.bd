/**
 * TokenVerifyRequestedHandler — identity.token.verify_requested
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

export const TOKEN_VERIFY_REQUESTED_EVENT = 'identity.token.verify_requested';

@Injectable()
export class TokenVerifyRequestedHandler implements OnModuleInit {
  private readonly logger = new Logger(TokenVerifyRequestedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(TOKEN_VERIFY_REQUESTED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.VERIFICATION,
          category: NOTIFICATION_CATEGORY.AUTH,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: 'টোকেন যাচাই অনুরোধ',
          body: 'টোকেন যাচাইয়ের অনুরোধ করা হয়েছে।',
          data: { eventType: 'identity.token.verify_requested', ...p },
          idempotencyKey: 'token-verify-requested-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.token.verify_requested → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.token.verify_requested"');
  }
}
