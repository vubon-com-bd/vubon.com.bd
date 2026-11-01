/**
 * UserStatusChangedHandler — audit-only placeholder
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const USER_STATUS_CHANGED_EVENT = 'identity.user.status_changed';

interface UserStatusChangedPayload {
  readonly userId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
}

interface UserEvent {
  readonly payload: UserStatusChangedPayload;
}

@Injectable()
export class UserStatusChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserStatusChangedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_STATUS_CHANGED_EVENT, async (event) => {
      try {
        const p = (event as unknown as UserEvent).payload;
        if (p?.userId) {
          this.logger.log(`Received user.status_changed — userId=${p.userId}, ${p.fromStatus} → ${p.toStatus}`);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`UserStatusChangedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${USER_STATUS_CHANGED_EVENT}"`);
  }
}
