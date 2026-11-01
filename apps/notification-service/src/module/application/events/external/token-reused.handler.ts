/**
 * TokenReusedHandler — identity.token.reused
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

export const TOKEN_REUSED_EVENT = 'identity.token.reused';

@Injectable()
export class TokenReusedHandler implements OnModuleInit {
  private readonly logger = new Logger(TokenReusedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(TOKEN_REUSED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.CRITICAL,
          subject: 'টোকেন পুনরায় ব্যবহার',
          body: 'টোকেন পুনরায় ব্যবহার সনাক্ত হয়েছে — নিরাপত্তা সতর্কতা।',
          data: { eventType: 'identity.token.reused', ...p },
          idempotencyKey: 'token-reused-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.token.reused → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.token.reused"');
  }
}
