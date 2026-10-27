/**
 * UserDeletedHandler — reacts to user.status_changed where toStatus='deleted'
 * @module cart-service/application/events/external
 *
 * Identity service emits 'identity.user.status_changed' for all status transitions.
 * This handler filters only for the 'deleted' transition and clears user's carts.
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import type { UserStatusChangedEvent } from './external-event.types.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';

export const USER_STATUS_CHANGED_EVENT = 'identity.user.status_changed';

@Injectable()
export class UserDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserDeletedHandler.name);

  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_STATUS_CHANGED_EVENT, async (event) => {
      await this.handle(event as unknown as UserStatusChangedEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_STATUS_CHANGED_EVENT}"`);
  }

  private async handle(event: UserStatusChangedEvent): Promise<void> {
    const { userId, fromStatus, toStatus } = event.payload;

    // Filter: only process 'deleted' transitions
    if (toStatus !== 'deleted') {
      this.logger.debug(
        `Skipped ${USER_STATUS_CHANGED_EVENT} — userId=${userId} ${fromStatus}→${toStatus}`,
      );
      return;
    }

    this.logger.log(
      `Received user deletion (${fromStatus}→${toStatus}) — userId=${userId}`,
    );

    try {
      const carts = await this.cartRepo.findByUserId(userId);
      let cleared = 0;
      for (const cart of carts) {
        if (!cart.isFinal()) {
          cart.clear();
          await this.cartRepo.save(cart);
          cleared++;
        }
      }
      this.logger.log(`User ${userId} — ${cleared} carts cleared`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`UserDeletedHandler failed: ${msg}`);
    }
  }
}
