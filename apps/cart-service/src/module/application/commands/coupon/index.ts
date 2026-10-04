export * from './apply-coupon.command.js';
export * from './apply-coupon.handler.js';
export * from './remove-coupon.command.js';
export * from './remove-coupon.handler.js';
export * from './validate-coupon.command.js';
export * from './validate-coupon.handler.js';

import { ApplyCouponHandler } from './apply-coupon.handler.js';
import { RemoveCouponHandler } from './remove-coupon.handler.js';
import { ValidateCouponHandler } from './validate-coupon.handler.js';

export const COUPON_COMMAND_HANDLERS = [
  ApplyCouponHandler,
  RemoveCouponHandler,
  ValidateCouponHandler,
] as const;
