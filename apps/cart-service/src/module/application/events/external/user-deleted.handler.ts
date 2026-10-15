/**
 * UserDeletedHandler — reacts to identity.user.deleted
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import type { UserDeletedEvent } from './external-event.types.js';

import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';

export const USER_DELETED_EVENT = 'identity.user.deleted';

@Injectable()
export class UserDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserDeletedHandler.name);

  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_DELETED_EVENT, async (event) => {
      await this.handle(event as unknown as UserDeletedEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_DELETED_EVENT}"`);
  }

  private async handle(event: UserDeletedEvent): Promise<void> {
    const { userId } = event.payload;
    this.logger.log(`Received ${USER_DELETED_EVENT} — userId=${userId}`);
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
