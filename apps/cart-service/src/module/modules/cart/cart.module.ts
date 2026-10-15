/**
 * CartModule — feature wiring
 * @module cart-service/modules/cart
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { CartController } from '../../interfaces/controllers/rest/cart.controller.js';
import { CartEventSubscriberService } from '../../application/services/impl/cart-event-subscriber.service.js';

// ─── External Event Handlers ───
import { UserDeletedHandler } from '../../application/events/external/user-deleted.handler.js';
import { VendorSuspendedHandler } from '../../application/events/external/vendor-suspended.handler.js';

import { CART_COMMAND_HANDLERS } from './commands/index.js';
import { CART_QUERY_HANDLERS } from './queries/index.js';
import { CART_SAGAS } from './sagas/index.js';
import { CartFeatureHealthIndicator } from './health/index.js';

import { CartService } from '../../application/services/impl/cart.service.js';
import { CART_SERVICE } from '../../application/services/interfaces/cart.service.interface.js';

import { CartOwnerGuard } from '../../interfaces/guards/cart-owner.guard.js';
import { OwnCartGuard } from '../../interfaces/guards/own-cart.guard.js';
import { CartNotEmptyGuard } from '../../interfaces/guards/cart-not-empty.guard.js';

import { CartCacheInterceptor } from '../../interfaces/interceptors/cart-cache.interceptor.js';
import { CartLockInterceptor } from '../../interfaces/interceptors/cart-lock.interceptor.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [CartController],
  providers: [
    CartService,
    { provide: CART_SERVICE, useExisting: CartService },

    ...(CART_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(CART_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(CART_SAGAS as readonly unknown[] as never[]),

    CartOwnerGuard,
    OwnCartGuard,
    CartNotEmptyGuard,
    CartCacheInterceptor,
    CartLockInterceptor,

    // ─── External Event Handlers ───
    CartEventSubscriberService,
    UserDeletedHandler,
    VendorSuspendedHandler,

    CartFeatureHealthIndicator,
  ],
  exports: [
    CartService,
    CART_SERVICE,
    CartFeatureHealthIndicator,
  ],
})
export class CartModule {}
