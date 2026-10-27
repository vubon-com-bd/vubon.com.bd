/**
 * UserStatusChangedHandler — reacts to user.status_changed
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
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

export const USER_STATUS_CHANGED_EVENT = 'identity.user.status_changed';

interface UserStatusChangedHandlerPayload {
  readonly userId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason: string | undefined;
}

interface UserStatusChangedHandlerEvent {
  readonly id: string;
  readonly type: 'identity.user.status_changed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: UserStatusChangedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class UserStatusChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserStatusChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_STATUS_CHANGED_EVENT, async (event) => {
      await this.handle(event as unknown as UserStatusChangedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_STATUS_CHANGED_EVENT}"`);
  }

  private async handle(event: UserStatusChangedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received user.status_changed — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        const resolved = resolveTemplate(
          this.i18n,
          'EMAIL_VERIFIED',
          locale,
          {
            toStatus: (payload as any).toStatus
          },
          {
            subject: 'Account Status Updated',
            body: 'Your account status changed to {{toStatus}}',
          },
        );

        const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          eventType: 'identity.user.status_changed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `userstatuschanged-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`UserStatusChangedHandler failed: ${msg}`);
    }
  }
}
