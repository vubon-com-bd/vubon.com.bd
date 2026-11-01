/**
 * UserSuspendedHandler — reacts to identity.user.suspended
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderUserSuspendedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { UserClient } from '@infrastructure/services/external/user.client.js';
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

export const USER_SUSPENDED_EVENT = 'identity.user.suspended';

interface UserSuspendedHandlerPayload {
  readonly userId: string;
  readonly reason: string;
  readonly suspendedAt: string;
  readonly name?: string;
  readonly email?: string;
  readonly locale?: 'en' | 'bn';
}

interface UserSuspendedHandlerEvent {
  readonly id: string;
  readonly type: 'identity.user.suspended';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: UserSuspendedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class UserSuspendedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserSuspendedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_SUSPENDED_EVENT, async (event) => {
      await this.handle(event as unknown as UserSuspendedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_SUSPENDED_EVENT}"`);
  }

  private async handle(event: UserSuspendedHandlerEvent): Promise<void> {
    const payload = event.payload;

    const userId = payload.userId ?? event.aggregateId;
    let userEmail = payload.email;
    let userName = payload.name;
    let userLocale = payload.locale;

    if (!userEmail && userId) {
      try {
        const profile = await this.userClient.getById(userId);
        if (profile) {
          userEmail = userEmail ?? profile.email;
          userName = userName ?? (profile as unknown as { name?: string }).name;
          userLocale = userLocale ?? (profile.locale as 'en' | 'bn' | undefined);
        }
      } catch (err) {
        this.logger.warn(`User fetch failed for ${userId}: ${err}`);
      }
    }

    this.logger.log(`Received user.suspended — ${JSON.stringify(payload)}`);

    try {
      let html = '';
      try {
        html = renderUserSuspendedEmail({
          name: userName ?? 'ব্যবহারকারী',
          reason: payload.reason,
          locale: userLocale ?? 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId,
        email: userEmail,
        type: NOTIFICATION_TYPE.SECURITY,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: 'Account Suspended',
        body: html || `Your account has been suspended. Reason: ${payload.reason}`,
        data: {
          html,
          eventType: 'identity.user.suspended',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `usersuspended-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`UserSuspendedHandler failed: ${msg}`);
    }
  }
}
