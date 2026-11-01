/**
 * UserDeletedHandler — audit-only placeholder
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const USER_DELETED_EVENT = 'identity.user.deleted';

interface UserDeletedPayload {
  readonly userId: string;
  readonly deletedAt?: string;
}

interface UserEvent {
  readonly payload: UserDeletedPayload;
}

@Injectable()
export class UserDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserDeletedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_DELETED_EVENT, async (event) => {
      try {
        const p = (event as unknown as UserEvent).payload;
        if (p?.userId) this.logger.log(`Received user.deleted — userId=${p.userId}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`UserDeletedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${USER_DELETED_EVENT}"`);
  }
}
