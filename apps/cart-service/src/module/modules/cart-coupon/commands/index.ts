/**
 * CartCoupon Command Handlers Barrel
 */
import { ApplyCouponHandler } from '../../../application/commands/coupon/apply-coupon.handler.js';
import { RemoveCouponHandler } from '../../../application/commands/coupon/remove-coupon.handler.js';
import { ValidateCouponHandler } from '../../../application/commands/coupon/validate-coupon.handler.js';

export const CART_COUPON_COMMAND_HANDLERS = [
  ApplyCouponHandler,
  RemoveCouponHandler,
  ValidateCouponHandler,
] as const;

export { ApplyCouponHandler, RemoveCouponHandler, ValidateCouponHandler };
