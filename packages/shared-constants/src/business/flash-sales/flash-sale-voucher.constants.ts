export const FLASH_SALE_VOUCHER_TYPE = {
  GIFT_CARD: 'gift_card',
  STORE_CREDIT: 'store_credit',
  LOYALTY_REWARD: 'loyalty_reward',
  CASHBACK: 'cashback',
} as const;

export const FLASH_SALE_VOUCHER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  REDEEMED: 'redeemed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;

export const FLASH_SALE_VOUCHER = {
  MAX_VOUCHERS_PER_SALE: 5,
  MIN_AMOUNT: 0,
  MAX_AMOUNT: 100000,
  MAX_USES: 1,
  EXPIRY_HOURS: 48,
  PARTIAL_REDEEM: false,
} as const;

export type FlashSaleVoucherTypeType =
  (typeof FLASH_SALE_VOUCHER_TYPE)[keyof typeof FLASH_SALE_VOUCHER_TYPE];
export type FlashSaleVoucherStatusType =
  (typeof FLASH_SALE_VOUCHER_STATUS)[keyof typeof FLASH_SALE_VOUCHER_STATUS];
