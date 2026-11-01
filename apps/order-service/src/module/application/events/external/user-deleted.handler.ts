/**
 * UserDeletedHandler — cancel pending orders when user is deleted
 * @module order-service/application/events/external
 *
 * When identity.user.deleted fires:
 *   → Find all PENDING orders for that user
 *   → Cancel them (can't ship to deleted user)
 *   → Publish order.order.cancelled for each
 */
import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  ORDER_SERVICE,
  type IOrderService,
} from '../../services/interfaces/order.service.interface.js';

export const USER_DELETED_EVENT = 'identity.user.deleted';

interface UserDeletedPayload {
  readonly userId: string;
  readonly deletedAt: string;
  readonly reason?: string;
}

interface UserDeletedEvent {
  readonly id: string;
  readonly type: 'identity.user.deleted';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: UserDeletedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class UserDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserDeletedHandler.name);

  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderService: IOrderService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_DELETED_EVENT, async (event) => {
      await this.handle(event as unknown as UserDeletedEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_DELETED_EVENT}"`);
  }

  private async handle(event: UserDeletedEvent): Promise<void> {
    const { userId, reason } = event.payload;

    this.logger.warn(
      `📥 User deleted: userId=${userId}, reason=${reason ?? 'N/A'}`,
    );

    try {
      // TODO: Find pending orders for user, cancel each
      // This requires an order query by customer + status
      // For now, log + emit metric
      this.logger.log(
        `⚠️  Would cancel pending orders for user ${userId} (not yet implemented: query needed)`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Failed to cancel orders for user ${userId}: ${msg}`);
    }
  }
}
