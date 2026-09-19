/**
 * Flash Sale Coupon Types
 * @module shared-types/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sales/flash-sale-coupon.constants থেকে।
 */

import type { FLASH_SALE_COUPON_TYPE } from '@vubon/shared-constants/business';
import type { Money, CouponId } from '../../common/primitives';

export type FlashSaleCouponTypeValue =
  (typeof FLASH_SALE_COUPON_TYPE)[keyof typeof FLASH_SALE_COUPON_TYPE];

export interface FlashSaleCoupon {
  readonly id: string;
  readonly flashSaleId: string;
  readonly couponId?: CouponId;
  readonly code: string;
  readonly type: FlashSaleCouponTypeValue;
  readonly discountValue: number;
  readonly maxDiscountAmount?: Money;
  readonly minOrderAmount?: Money;
  readonly maxUses: number;
  readonly usedCount: number;
  readonly maxUsesPerUser: number;
  readonly isStackable: boolean;
  readonly isActive: boolean;
  readonly startAt: string;
  readonly endAt: string;
  readonly createdAt: string;
}

export interface FlashSaleCouponValidation {
  readonly valid: boolean;
  readonly couponId?: string;
  readonly discountAmount?: Money;
  readonly reason?: string;
}
