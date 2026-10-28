/**
 * UserStatusChangedHandler — react to user status transitions
 * @module cart-service/application/events/external
 *
 * Handles:
 *   - identity.user.status_changed → clear cart if suspended/deleted
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  CART_SERVICE,
  type ICartService,
} from '../../services/interfaces/cart.service.interface.js';

export const USER_STATUS_CHANGED_EVENT = 'identity.user.status_changed';

interface UserStatusChangedPayload {
  readonly userId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

@Injectable()
export class UserStatusChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserStatusChangedHandler.name);

  constructor(
    @Inject(CART_SERVICE)
    private readonly cartService: ICartService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_STATUS_CHANGED_EVENT, async (event) => {
      await this.handle(event as unknown as { payload: UserStatusChangedPayload });
    });
    this.logger.log(`✅ Registered handler for "${USER_STATUS_CHANGED_EVENT}"`);
  }

  private async handle(event: { payload: UserStatusChangedPayload }): Promise<void> {
    const { userId, fromStatus, toStatus, reason } = event.payload;
    this.logger.log(
      `📥 user.status_changed → userId=${userId} ${fromStatus} → ${toStatus}${reason ? ` (${reason})` : ''}`,
    );

    // Only act on suspension/deletion
    if (!['suspended', 'deleted', 'inactive'].includes(toStatus)) {
      return;
    }

    try {
      const carts = await this.cartService.list({
        page: 1,
        limit: 100,
        filter: { userId },
      } as never);

      if (!carts || !carts.items || carts.items.length === 0) {
        this.logger.log(`No carts found for user ${userId}`);
        return;
      }

      for (const cart of carts.items) {
        await this.cartService.clear({ cartId: cart.id, reason: `user-${toStatus}` } as never);
        this.logger.log(
          `✅ Cleared cart ${cart.id} due to user ${toStatus} (${reason ?? 'no reason'})`,
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`UserStatusChangedHandler failed: ${msg}`);
    }
  }
}
