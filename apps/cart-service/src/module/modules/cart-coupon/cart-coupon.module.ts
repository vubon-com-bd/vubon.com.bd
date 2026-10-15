/**
 * CartCouponModule
 * @module cart-service/modules/cart-coupon
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { CartCouponController } from '../../interfaces/controllers/rest/cart-coupon.controller.js';

import { CART_COUPON_COMMAND_HANDLERS } from './commands/index.js';
import { CART_COUPON_QUERY_HANDLERS } from './queries/index.js';

import { CartCouponService } from '../../application/services/impl/cart-coupon.service.js';
import { CART_COUPON_SERVICE } from '../../application/services/interfaces/cart-coupon.service.interface.js';

import { CartOwnerGuard } from '../../interfaces/guards/cart-owner.guard.js';
import { CartLockInterceptor } from '../../interfaces/interceptors/cart-lock.interceptor.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [CartCouponController],
  providers: [
    CartCouponService,
    { provide: CART_COUPON_SERVICE, useExisting: CartCouponService },

    ...(CART_COUPON_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(CART_COUPON_QUERY_HANDLERS as readonly unknown[] as never[]),

    CartOwnerGuard,
    CartLockInterceptor,
  ],
  exports: [CartCouponService, CART_COUPON_SERVICE],
})
export class CartCouponModule {}
