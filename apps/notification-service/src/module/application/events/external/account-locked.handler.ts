/**
 * AccountLockedHandler — security alert when account is locked
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderAuthLockedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const ACCOUNT_LOCKED_EVENT = 'identity.auth.locked';

@Injectable()
export class AccountLockedHandler implements OnModuleInit {
  private readonly logger = new Logger(AccountLockedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ACCOUNT_LOCKED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ACCOUNT_LOCKED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      
      // ─── Render Bangla HTML template ───
      const payloadAny = payload as unknown as Record<string, unknown>;
      const html = renderAuthLockedEmail({
      name: (payload.name as string) ?? 'ব্যবহারকারী',
      lockedUntil: (payload.lockedUntil as string) ?? undefined,
      locale: (payload.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SECURITY,
        category: NOTIFICATION_CATEGORY.SECURITY,
        channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.SMS],
        priority: NOTIFICATION_PRIORITY.CRITICAL,
        subject: isBn ? '🔒 অ্যাকাউন্ট লক করা হয়েছে' : '🔒 Account Locked',
        body: html || isBn
          ? `আপনার অ্যাকাউন্ট সাময়িকভাবে লক করা হয়েছে। কারণ: ${payload?.reason ?? 'একাধিক ব্যর্থ লগইন'}. এটি আপনি না করে থাকলে সাথে সাথে যোগাযোগ করুন।`
          : `Your account has been temporarily locked. Reason: ${payload?.reason ?? 'Multiple failed login attempts'}.`,
        data: {
          html, eventType: ACCOUNT_LOCKED_EVENT, ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `acct-locked-${event.id}`,
      });
      this.logger.log(`✅ Account lock notification sent`);
    } catch (err) {
      this.logger.error(`AccountLockedHandler failed: ${err}`);
    }
  }
}
