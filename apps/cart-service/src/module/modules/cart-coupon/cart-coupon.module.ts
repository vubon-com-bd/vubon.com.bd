import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CartCouponController } from '../../interfaces/controllers/rest/cart-coupon.controller';
import { CartCouponService } from '../../application/services/impl/cart-coupon.service';
import { CouponControllerMapper } from '../../interfaces/mappers/coupon.controller.mapper';
import { ApplyCouponHandler } from '../../application/commands/coupon/apply-coupon.handler';
import { RemoveCouponHandler } from '../../application/commands/coupon/remove-coupon.handler';
import { ValidateCouponHandler } from '../../application/commands/coupon/validate-coupon.handler';

@Module({
  imports: [CqrsModule],
  controllers: [CartCouponController],
  providers: [
    CartCouponService,
    CouponControllerMapper,
    ApplyCouponHandler,
    RemoveCouponHandler,
    ValidateCouponHandler,
  ],
  exports: [CartCouponService],
})
export class CartCouponModule {}
