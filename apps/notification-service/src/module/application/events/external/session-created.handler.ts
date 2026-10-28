/**
 * SessionCreatedHandler — new login alert
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

export const SESSION_CREATED_EVENT = 'identity.session.created';

@Injectable()
export class SessionCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(SessionCreatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(SESSION_CREATED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${SESSION_CREATED_EVENT}"`);
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
        subject: isBn ? '🔐 নতুন লগইন সনাক্ত' : '🔐 New Login Detected',
        body: isBn
          ? `আপনার অ্যাকাউন্টে নতুন লগইন: ডিভাইস: ${payload?.userAgent ?? 'অজানা'}, IP: ${payload?.ipAddress ?? 'অজানা'}. এটি আপনি না হলে পাসওয়ার্ড পরিবর্তন করুন।`
          : `New login to your account: Device: ${payload?.userAgent ?? 'Unknown'}, IP: ${payload?.ipAddress ?? 'Unknown'}. If not you, change password immediately.`,
        data: { eventType: SESSION_CREATED_EVENT, ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `sess-created-${event.id}`,
      });
      this.logger.log(`✅ New login notification sent`);
    } catch (err) {
      this.logger.error(`SessionCreatedHandler failed: ${err}`);
    }
  }
}
