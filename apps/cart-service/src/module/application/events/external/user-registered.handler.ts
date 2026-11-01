/**
 * UserCreatedHandler — creates welcome cart when user registers
 * @module cart-service/application/events/external
 *
 * Identity service emits 'identity.user.created' on successful registration.
 * This handler creates an empty welcome cart for the new user.
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '../../../domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';

export const USER_CREATED_EVENT = 'identity.user.created';

interface UserCreatedPayload {
  readonly userId: string;
  readonly email: string;
  readonly type: string;
  readonly roles: readonly string[];
  readonly createdAt: string;
}

interface UserCreatedEvent {
  readonly id: string;
  readonly type: 'identity.user.created';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: UserCreatedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

const WELCOME_CART_EXPIRY_DAYS = 30;

@Injectable()
export class UserCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserCreatedHandler.name);

  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_CREATED_EVENT, async (event) => {
      await this.handle(event as unknown as UserCreatedEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_CREATED_EVENT}"`);
  }

  private async handle(event: UserCreatedEvent): Promise<void> {
    const { userId, email } = event.payload;

    this.logger.log(
      `Received user.created — userId=${userId} (${email})`,
    );

    try {
      // Idempotent: skip if any cart already exists
      const existing = await this.cartRepo.findByUserId(userId);
      if (existing.length > 0) {
        this.logger.debug(
          `Cart already exists for user ${userId} — skipping welcome-cart creation`,
        );
        return;
      }

      // Create empty welcome cart
      const cartId = CartIdVO.create(crypto.randomUUID());
      const now = new Date();
      const nowIso = now.toISOString();
      const expiresAt = new Date(
        now.getTime() + WELCOME_CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
      ).toISOString();

      const cart = CartEntity.create({
        id: cartId,
        props: {
          type: CartTypeVO.user(),
          userId: UserIdVO.create(userId),
          currency: 'BDT',
          expiresAt,
          notes: 'Welcome cart',
        },
        now: nowIso,
      });

      await this.cartRepo.save(cart);

      this.logger.log(
        `✅ Welcome cart ${cartId.value} created for user ${userId}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(
        `UserCreatedHandler failed for user ${userId}: ${msg}`,
      );
    }
  }
}
