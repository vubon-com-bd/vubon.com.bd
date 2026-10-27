/**
 * UserCreatedHandler — sends welcome notification when user registers
 * @module notification-service/application/events/external
 *
 * Identity service emits 'identity.user.created' on successful registration.
 * This handler sends a welcome email + in-app notification.
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

export const USER_CREATED_EVENT = 'identity.user.created';

interface UserCreatedPayload {
  readonly userId: string;
  readonly email: string;
  readonly type: string;
  readonly roles: readonly string[];
  readonly createdAt: string;
}

interface UserCreatedEvent {
  readonly id: string;
  readonly type: 'identity.user.created';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: UserCreatedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class UserCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserCreatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_CREATED_EVENT, async (event) => {
      await this.handle(event as unknown as UserCreatedEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_CREATED_EVENT}"`);
  }

  private async handle(event: UserCreatedEvent): Promise<void> {
    const { userId, email, roles } = event.payload;

    this.logger.log(
      `Received user.created — userId=${userId} (${email})`,
    );

    try {
      const locale = getLocale(event.payload as unknown as Record<string, unknown>);
        const resolved = resolveTemplate(
          this.i18n,
          'WELCOME',
          locale,
          {
            name: email.split('@')[0]
          },
          {
            subject: 'Welcome to Vubon!',
            body: 'Hello {{name}}, welcome to Vubon.com.bd!',
          },
        );

        const html = renderWelcomeEmail({
          name: email.split('@')[0],
          email: email,
          locale: ((event.payload as unknown as { locale?: 'en' | 'bn' }).locale ?? 'bn'),
        });

        const result = await this.notificationService.send({
        userId,
        type: NOTIFICATION_TYPE.WELCOME,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          eventType: 'identity.user.created',
          eventId: event.id,
          roles,
          html,
        },
        idempotencyKey: `welcome-${userId}`,
        // Recipient hints for memory mode (avoid identity-service lookup)
        email,
      });

      this.logger.log(
        `✅ Welcome notification sent for user ${userId} — ${result.notificationIds?.length ?? 0} channel(s)`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(
        `UserCreatedHandler failed for user ${userId}: ${msg}`,
      );
    }
  }
}
