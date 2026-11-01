/**
 * UserDeletedHandler — clears cart when user is deleted from identity
 * @module cart-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  CART_SERVICE,
  type ICartService,
} from '../../services/interfaces/cart.service.interface.js';

export const USER_DELETED_EVENT = 'identity.user.deleted';

interface UserDeletedPayload {
  readonly userId: string;
  readonly email?: string;
  readonly deletedAt?: string;
  readonly reason?: string;
}

@Injectable()
export class UserDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserDeletedHandler.name);

  constructor(
    @Inject(CART_SERVICE)
    private readonly cartService: ICartService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_DELETED_EVENT, async (event) => {
      await this.handle(event as unknown as { payload: UserDeletedPayload });
    });
    this.logger.log(`✅ Registered handler for "${USER_DELETED_EVENT}"`);
  }

  private async handle(event: { payload: UserDeletedPayload }): Promise<void> {
    const { userId } = event.payload;
    this.logger.log(`📥 identity.user.deleted → userId=${userId}`);

    try {
      // Find user's active carts
      const carts = await this.cartService.list({
        page: 1,
        limit: 100,
        filter: { userId },
      } as never);

      if (!carts || !carts.items || carts.items.length === 0) {
        this.logger.log(`No carts found for user ${userId}`);
        return;
      }

      // Clear each cart
      for (const cart of carts.items) {
        await this.cartService.clear({ cartId: cart.id, reason: 'user-deleted' } as never);
        this.logger.log(`✅ Cleared cart ${cart.id} for deleted user ${userId}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`UserDeletedHandler failed for user ${userId}: ${msg}`);
    }
  }
}
