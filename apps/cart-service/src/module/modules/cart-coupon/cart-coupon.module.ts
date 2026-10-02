import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RedisRepositoriesModule } from '../../infrastructure/persistence/redis/redis-repositories.module.js';
import { CartCouponController } from '../../interfaces/controllers/rest/cart-coupon.controller.js';
import { CartCouponService } from '../../application/services/impl/cart-coupon.service.js';
import { CART_COUPON_SERVICE } from '../../application/services/interfaces/cart-coupon.service.interface.js';
import { COUPON_COMMAND_HANDLERS } from '../../application/commands/coupon/index.js';

@Module({
  imports: [CqrsModule, RedisRepositoriesModule],
  controllers: [CartCouponController],
  providers: [
    CartCouponService,
    { provide: CART_COUPON_SERVICE, useExisting: CartCouponService },
    ...COUPON_COMMAND_HANDLERS,
  ],
  exports: [CartCouponService, CART_COUPON_SERVICE],
})
export class CartCouponModule {}
