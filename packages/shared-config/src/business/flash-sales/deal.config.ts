/**
 * Deal Config
 * ডিল কনফিগারেশন
 */

import { DEAL } from '@vubon/shared-constants';

export interface DealConfig {
  enabled: boolean;
  maxDiscount: number;
  minPrice: number;
  maxPrice: number;
  maxQuantity: number;
  minQuantity: number;
  status: Record<string, string>;
  types: Record<string, string>;
  discountTypes: Record<string, string>;
  productTypes: Record<string, string>;
  defaults: {
    minQuantity: number;
    maxQuantity: number;
    minDiscount: number;
    maxDiscount: number;
    minOrderAmount: number;
    maxOrderAmount: number;
  };
}

export const dealConfig: DealConfig = {
  enabled: true,
  maxDiscount: 80,
  minPrice: 100,
  maxPrice: 1000000,
  maxQuantity: 10,
  minQuantity: 1,

  status: {
    active: DEAL.STATUS.ACTIVE,
    inactive: DEAL.STATUS.INACTIVE,
    expired: DEAL.STATUS.EXPIRED,
    completed: DEAL.STATUS.COMPLETED,
    cancelled: DEAL.STATUS.CANCELLED,
    pending: DEAL.STATUS.PENDING,
    deleted: DEAL.STATUS.DELETED,
  },

  types: {
    single: DEAL.TYPES.SINGLE,
    bundle: DEAL.TYPES.BUNDLE,
    buy_get: DEAL.TYPES.BUY_GET,
    tiered: DEAL.TYPES.TIERED,
    bogo: DEAL.TYPES.BOGO,
  },

  discountTypes: {
    percentage: DEAL.DISCOUNT_TYPES.PERCENTAGE,
    fixed: DEAL.DISCOUNT_TYPES.FIXED,
    bundle: DEAL.DISCOUNT_TYPES.BUNDLE,
    buy_x_get_y: DEAL.DISCOUNT_TYPES.BUY_X_GET_Y,
  },

  productTypes: {
    physical: DEAL.PRODUCT_TYPES.PHYSICAL,
    digital: DEAL.PRODUCT_TYPES.DIGITAL,
    service: DEAL.PRODUCT_TYPES.SERVICE,
  },

  defaults: {
    minQuantity: DEAL.DEFAULTS.MIN_QUANTITY,
    maxQuantity: DEAL.DEFAULTS.MAX_QUANTITY,
    minDiscount: DEAL.DEFAULTS.MIN_DISCOUNT,
    maxDiscount: DEAL.DEFAULTS.MAX_DISCOUNT,
    minOrderAmount: DEAL.DEFAULTS.MIN_ORDER_AMOUNT,
    maxOrderAmount: DEAL.DEFAULTS.MAX_ORDER_AMOUNT,
  },
} as const;

export type DealConfigType = typeof dealConfig;
