/**
 * ContactAddedHandler — confirms contact addition
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderUserContactAddedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const CONTACT_ADDED_EVENT = 'identity.user.contact_added';

@Injectable()
export class ContactAddedHandler implements OnModuleInit {
  private readonly logger = new Logger(ContactAddedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CONTACT_ADDED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${CONTACT_ADDED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      // ─── Render Bengali HTML ───
      let html = '';
      try {
        html = renderUserContactAddedEmail({
          name: ((payload?.name as string) ?? (typeof payload?.firstName === 'string' ? payload.firstName as string : 'গ্রাহক')),
          locale: (((payload?.locale as 'en' | 'bn') ?? 'bn')),
          ...payload,
        } as any);
      } catch (err) {
        this.logger.warn(`Template render failed: ${err}`);
      }

      const isBn = ((payload?.locale as string) ?? 'bn') === 'bn';

      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.LOW,
        subject: isBn ? 'যোগাযোগ যোগ হয়েছে' : 'Contact Added',
        body: html || (isBn ? 'প্রিয় গ্রাহক, নোটিফিকেশন পাঠানো হয়েছে।' : 'Hi Customer, notification sent.'),
        data: { eventType: 'identity.user.contact_added', html, ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `contact-added-${event.id}`,
      });
      this.logger.log(`✅ ContactAddedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`ContactAddedHandler failed: ${err}`);
    }
  }
}
