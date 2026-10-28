/**
 * SessionRevokedHandler — logout alert
 * @module notification-service/application/events/external
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

export const SESSION_REVOKED_EVENT = 'identity.session.revoked';

@Injectable()
export class SessionRevokedHandler implements OnModuleInit {
  private readonly logger = new Logger(SessionRevokedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(SESSION_REVOKED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${SESSION_REVOKED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SECURITY,
        category: NOTIFICATION_CATEGORY.SECURITY,
        channels: [NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? 'আপনার সেশন বন্ধ হয়েছে' : 'Session Ended',
        body: isBn
          ? `আপনার অ্যাকাউন্টের একটি সেশন বন্ধ হয়েছে। কারণ: ${payload?.reason ?? 'ব্যবহারকারীর অনুরোধ'}`
          : `A session on your account has ended. Reason: ${payload?.reason ?? 'user request'}`,
        data: { eventType: SESSION_REVOKED_EVENT, ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `sess-revoked-${event.id}`,
      });
      this.logger.log(`✅ Session revoked notification sent`);
    } catch (err) {
      this.logger.error(`SessionRevokedHandler failed: ${err}`);
    }
  }
}
