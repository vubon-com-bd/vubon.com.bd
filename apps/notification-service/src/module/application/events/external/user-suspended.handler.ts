/**
 * UserSuspendedHandler — reacts to user.suspended
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
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
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_SUSPENDED_EVENT, async (event) => {
      await this.handle(event as unknown as UserSuspendedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_SUSPENDED_EVENT}"`);
  }

  private async handle(event: UserSuspendedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received user.suspended — ${JSON.stringify(payload)}`);

    try {
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SECURITY,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: 'Account Suspended',
        body: `Your account has been suspended. Reason: {reason}`,
        data: {
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
