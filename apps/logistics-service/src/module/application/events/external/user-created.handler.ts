/**
 * UserCreatedHandler — audit-only placeholder
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const USER_CREATED_EVENT = 'identity.user.created';

interface UserCreatedPayload {
  readonly userId: string;
  readonly email?: string;
  readonly createdAt?: string;
}

interface UserEvent {
  readonly payload: UserCreatedPayload;
}

@Injectable()
export class UserCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserCreatedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_CREATED_EVENT, async (event) => {
      try {
        const p = (event as unknown as UserEvent).payload;
        if (p?.userId) this.logger.log(`Received user.created — userId=${p.userId}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`UserCreatedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${USER_CREATED_EVENT}"`);
  }
}
