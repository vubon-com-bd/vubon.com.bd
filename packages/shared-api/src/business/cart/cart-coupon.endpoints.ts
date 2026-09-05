/**
 * Cart Coupon Endpoints
 * কার্ট কুপন সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { CART } from '@vubon/shared-constants';
import type { CartCoupon } from '@vubon/shared-types';

// CART কনস্ট্যান্ট থেকে টাইপ এবং ডিফল্ট মান ব্যবহার
const BASE_PATH = baseEndpoints.api + '/cart/coupon';

export const cartCouponEndpoints = {
  apply: `${BASE_PATH}`,
  remove: `${BASE_PATH}`,
  validate: `${BASE_PATH}/validate`,
  list: `${BASE_PATH}s`,
} as const;

// CART টাইপ ব্যবহার করে রেসপন্স টাইপ ডিফাইন
export type CartCouponApplyResponse = {
  coupon: CartCoupon;
  savings: number;
  message: string;
  status: keyof typeof CART.STATUS;
};

export type CartCouponValidationResponse = {
  valid: boolean;
  code: string;
  message?: string;
  savings?: number;
  status: keyof typeof CART.STATUS;
};

export type CartCouponEndpointKey = keyof typeof cartCouponEndpoints;
