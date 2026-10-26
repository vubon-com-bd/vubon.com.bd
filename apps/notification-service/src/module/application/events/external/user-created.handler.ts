/**
 * UserCreatedHandler — sends welcome notification when user registers
 * @module notification-service/application/events/external
 *
 * Identity service emits 'user.created' on successful registration.
 * This handler sends a welcome email + in-app notification.
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

export const USER_CREATED_EVENT = 'user.created';

interface UserCreatedPayload {
  readonly userId: string;
  readonly email: string;
  readonly type: string;
  readonly roles: readonly string[];
  readonly createdAt: string;
}

interface UserCreatedEvent {
  readonly id: string;
  readonly type: 'user.created';
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
      const result = await this.notificationService.send({
        userId,
        type: NOTIFICATION_TYPE.WELCOME,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'Welcome to Vubon!',
        body: `Hi! Welcome to Vubon.com.bd. Your account has been created successfully with roles: ${roles.join(', ')}.`,
        data: {
          eventType: 'user.created',
          eventId: event.id,
          roles,
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
