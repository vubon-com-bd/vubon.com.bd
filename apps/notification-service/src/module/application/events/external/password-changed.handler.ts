/**
 * PasswordChangedHandler — security alert when password changes
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
import { I18nService } from '../../../domain/services/i18n.service.js';
import { renderPasswordChangedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const PASSWORD_CHANGED_EVENT = 'identity.auth.password_changed';

interface Payload {
  readonly authId?: string;
  readonly userId?: string;
  readonly name?: string;
  readonly changedAt?: string;
  readonly locale?: string;
}

@Injectable()
export class PasswordChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(PasswordChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PASSWORD_CHANGED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${PASSWORD_CHANGED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload as Payload;
    const locale = payload.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      
      // ─── Render Bangla HTML template ───
      const payloadAny = payload as unknown as Record<string, unknown>;
      const html = renderPasswordChangedEmail({
      name: (payload.name as string) ?? 'ব্যবহারকারী',
      changedAt: (payload.changedAt as string) ?? new Date().toISOString(),
      locale: (payload.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
        userId: payload.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SECURITY,
        category: NOTIFICATION_CATEGORY.SECURITY,
        channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: isBn ? 'পাসওয়ার্ড পরিবর্তন হয়েছে' : 'Password Changed',
        body: html || isBn
          ? `প্রিয় ${payload.name ?? 'গ্রাহক'}, আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে। আপনি এটি না করে থাকলে সাথে সাথে যোগাযোগ করুন: support@vubon.com.bd`
          : `Hi ${payload.name ?? 'Customer'}, your password was changed successfully. If this wasn't you, contact support@vubon.com.bd immediately.`,
        data: {
          html, eventType: PASSWORD_CHANGED_EVENT, ...payload },
        idempotencyKey: `pw-changed-${event.id}`,
      });
      this.logger.log(`✅ Password change notification sent`);
    } catch (err) {
      this.logger.error(`PasswordChangedHandler failed: ${err}`);
    }
  }
}
