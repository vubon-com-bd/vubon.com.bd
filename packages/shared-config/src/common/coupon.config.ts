/**
 * Coupon Configuration
 * কুপন কনফিগারেশন
 */
export interface CouponConfig {
  enabled: boolean;
  types: {
    percentage: boolean;
    fixed: boolean;
    freeShipping: boolean;
    buyXGetY: boolean;
  };
  generation: {
    prefix: string;
    length: number;
    characters: string;
  };
  limits: {
    maxUses: number;
    maxUsesPerUser: number;
    minOrderAmount: number;
    maxDiscountAmount: number;
  };
  expiration: {
    defaultDays: number;
    maxDays: number;
  };
  restrictions: {
    newUsersOnly: boolean;
    firstOrderOnly: boolean;
    categoryRestricted: boolean;
    productRestricted: boolean;
  };
}

export const createCouponConfig = (): CouponConfig => ({
  enabled: true,
  types: {
    percentage: true,
    fixed: true,
    freeShipping: true,
    buyXGetY: true,
  },
  generation: {
    prefix: 'CPN',
    length: 8,
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  },
  limits: {
    maxUses: 1000,
    maxUsesPerUser: 1,
    minOrderAmount: 100,
    maxDiscountAmount: 5000,
  },
  expiration: {
    defaultDays: 30,
    maxDays: 365,
  },
  restrictions: {
    newUsersOnly: false,
    firstOrderOnly: false,
    categoryRestricted: true,
    productRestricted: true,
  },
});
