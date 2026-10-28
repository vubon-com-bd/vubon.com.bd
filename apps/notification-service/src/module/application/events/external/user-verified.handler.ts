/**
 * UserVerifiedHandler — reacts to user.email_verified
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderWelcomeEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE,
  NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const USER_VERIFIED_EVENT = 'identity.user.email_verified';

interface UserVerifiedHandlerPayload {
  readonly userId: string;
  readonly verifiedAt: string;
  readonly email: string | undefined;
}

interface UserVerifiedHandlerEvent {
  readonly id: string;
  readonly type: 'identity.user.email_verified';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: UserVerifiedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class UserVerifiedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserVerifiedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_VERIFIED_EVENT, async (event) => {
      await this.handle(event as unknown as UserVerifiedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_VERIFIED_EVENT}"`);
  }

  private async handle(event: UserVerifiedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received user.email_verified — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        const resolved = resolveTemplate(
          this.i18n,
          'EMAIL_VERIFIED',
          locale,
          {
            
          },
          {
            subject: 'Email Verified',
            body: 'Your email has been verified successfully.',
          },
        );

        const html = renderWelcomeEmail({
          name: (payload as unknown as { name?: string }).name ?? 'User',
          email: (payload as unknown as { email?: string }).email ?? '',
          locale: ((payload as unknown as { locale?: 'en' | 'bn' }).locale ?? 'bn'),
        });

        const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.VERIFICATION,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          eventType: 'identity.user.email_verified',
          eventId: event.id,
          ...payload,
          html,
        },
        idempotencyKey: `userverified-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`UserVerifiedHandler failed: ${msg}`);
    }
  }
}
