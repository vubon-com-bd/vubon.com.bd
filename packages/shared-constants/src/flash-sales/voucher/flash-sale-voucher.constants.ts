/**
 * Flash Sale Voucher Constants
 * Configuration for flash sale vouchers and gift certificates
 */

export const FLASH_SALE_VOUCHER = {
  // Voucher Types
  TYPES: {
    GIFT: 'gift',
    PROMOTIONAL: 'promotional',
    COMPENSATION: 'compensation',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    CUSTOM: 'custom',
  },

  // Voucher Categories
  CATEGORIES: {
    ELECTRONIC: 'electronic',
    PHYSICAL: 'physical',
    DIGITAL: 'digital',
    PREPAID: 'prepaid',
    POSTPAID: 'postpaid',
    RECURRING: 'recurring',
    ONE_TIME: 'one_time',
  },

  // Voucher Denominations
  DENOMINATIONS: {
    FIXED: 'fixed',
    VARIABLE: 'variable',
    RANGE: 'range',
    CUSTOM: 'custom',
  },

  // Voucher Value Types
  VALUE_TYPES: {
    MONETARY: 'monetary',
    PERCENTAGE: 'percentage',
    POINTS: 'points',
    ITEMS: 'items',
    SERVICES: 'services',
    COMBINATION: 'combination',
  },

  // Voucher Redemption
  REDEMPTION: {
    ONLINE: 'online',
    OFFLINE: 'offline',
    BOTH: 'both',
    MOBILE: 'mobile',
    STORE: 'store',
  },

  // Voucher Expiry
  EXPIRY: {
    NO_EXPIRY: 'no_expiry',
    FIXED_DATE: 'fixed_date',
    DAYS_AFTER_ISSUE: 'days_after_issue',
    MONTHS_AFTER_ISSUE: 'months_after_issue',
    YEARS_AFTER_ISSUE: 'years_after_issue',
    CUSTOM: 'custom',
  },

  // Voucher Transfer
  TRANSFER: {
    ALLOWED: 'allowed',
    NOT_ALLOWED: 'not_allowed',
    LIMITED: 'limited',
    ONCE: 'once',
  },

  // Voucher Defaults
  DEFAULTS: {
    DENOMINATION: 100,
    MIN_VALUE: 10,
    MAX_VALUE: 10000,
    VALIDITY_DAYS: 365,
    MAX_REDEMPTIONS: 1,
    MAX_REDEMPTIONS_PER_USER: 1,
    MIN_REDEMPTION_AMOUNT: 0,
    CODE_LENGTH: 10,
    IS_TRANSFERABLE: false,
    IS_REFUNDABLE: false,
  },

  // Voucher Limits
  LIMITS: {
    MIN_VALUE: 1,
    MAX_VALUE: 100000,
    MIN_DENOMINATION: 1,
    MAX_DENOMINATION: 100000,
    MAX_REDEMPTIONS: 1000,
    MAX_REDEMPTIONS_PER_USER: 10,
    MAX_CODE_LENGTH: 20,
    MIN_CODE_LENGTH: 6,
    MAX_BULK_GENERATION: 5000,
  },

  // Voucher Validation
  VALIDATION: {
    MIN_VALUE: 1,
    MAX_VALUE: 100000,
    MIN_CODE_LENGTH: 6,
    MAX_CODE_LENGTH: 20,
    MIN_VALIDITY_DAYS: 1,
    MAX_VALIDITY_DAYS: 1095,
    MIN_REDEMPTION_AMOUNT: 0,
  },
} as const;

// Voucher Types
export type FlashSaleVoucherType =
  (typeof FLASH_SALE_VOUCHER.TYPES)[keyof typeof FLASH_SALE_VOUCHER.TYPES];

// Voucher Categories
export type FlashSaleVoucherCategory =
  (typeof FLASH_SALE_VOUCHER.CATEGORIES)[keyof typeof FLASH_SALE_VOUCHER.CATEGORIES];

// Voucher Denominations
export type FlashSaleVoucherDenomination =
  (typeof FLASH_SALE_VOUCHER.DENOMINATIONS)[keyof typeof FLASH_SALE_VOUCHER.DENOMINATIONS];

// Voucher Value Types
export type FlashSaleVoucherValueType =
  (typeof FLASH_SALE_VOUCHER.VALUE_TYPES)[keyof typeof FLASH_SALE_VOUCHER.VALUE_TYPES];

// Voucher Redemption
export type FlashSaleVoucherRedemption =
  (typeof FLASH_SALE_VOUCHER.REDEMPTION)[keyof typeof FLASH_SALE_VOUCHER.REDEMPTION];

// Voucher Expiry
export type FlashSaleVoucherExpiry =
  (typeof FLASH_SALE_VOUCHER.EXPIRY)[keyof typeof FLASH_SALE_VOUCHER.EXPIRY];

// Voucher Transfer
export type FlashSaleVoucherTransfer =
  (typeof FLASH_SALE_VOUCHER.TRANSFER)[keyof typeof FLASH_SALE_VOUCHER.TRANSFER];

// Utility Functions
export function flashsalesVoucherGetTypeLabel(type: FlashSaleVoucherType): string {
  const labels: Record<FlashSaleVoucherType, string> = {
    [FLASH_SALE_VOUCHER.TYPES.GIFT]: 'Gift Voucher',
    [FLASH_SALE_VOUCHER.TYPES.PROMOTIONAL]: 'Promotional Voucher',
    [FLASH_SALE_VOUCHER.TYPES.COMPENSATION]: 'Compensation Voucher',
    [FLASH_SALE_VOUCHER.TYPES.LOYALTY]: 'Loyalty Voucher',
    [FLASH_SALE_VOUCHER.TYPES.REFERRAL]: 'Referral Voucher',
    [FLASH_SALE_VOUCHER.TYPES.BIRTHDAY]: 'Birthday Voucher',
    [FLASH_SALE_VOUCHER.TYPES.ANNIVERSARY]: 'Anniversary Voucher',
    [FLASH_SALE_VOUCHER.TYPES.SEASONAL]: 'Seasonal Voucher',
    [FLASH_SALE_VOUCHER.TYPES.HOLIDAY]: 'Holiday Voucher',
    [FLASH_SALE_VOUCHER.TYPES.CUSTOM]: 'Custom Voucher',
  };
  return labels[type] || 'Unknown Voucher Type';
}

export function flashsalesVoucherGetCategoryLabel(category: FlashSaleVoucherCategory): string {
  const labels: Record<FlashSaleVoucherCategory, string> = {
    [FLASH_SALE_VOUCHER.CATEGORIES.ELECTRONIC]: 'Electronic Voucher',
    [FLASH_SALE_VOUCHER.CATEGORIES.PHYSICAL]: 'Physical Voucher',
    [FLASH_SALE_VOUCHER.CATEGORIES.DIGITAL]: 'Digital Voucher',
    [FLASH_SALE_VOUCHER.CATEGORIES.PREPAID]: 'Prepaid Voucher',
    [FLASH_SALE_VOUCHER.CATEGORIES.POSTPAID]: 'Postpaid Voucher',
    [FLASH_SALE_VOUCHER.CATEGORIES.RECURRING]: 'Recurring Voucher',
    [FLASH_SALE_VOUCHER.CATEGORIES.ONE_TIME]: 'One-Time Voucher',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesVoucherGetDenominationLabel(
  denomination: FlashSaleVoucherDenomination
): string {
  const labels: Record<FlashSaleVoucherDenomination, string> = {
    [FLASH_SALE_VOUCHER.DENOMINATIONS.FIXED]: 'Fixed Denomination',
    [FLASH_SALE_VOUCHER.DENOMINATIONS.VARIABLE]: 'Variable Denomination',
    [FLASH_SALE_VOUCHER.DENOMINATIONS.RANGE]: 'Range Denomination',
    [FLASH_SALE_VOUCHER.DENOMINATIONS.CUSTOM]: 'Custom Denomination',
  };
  return labels[denomination] || 'Unknown Denomination';
}

export function flashsalesVoucherGetValueTypeLabel(valueType: FlashSaleVoucherValueType): string {
  const labels: Record<FlashSaleVoucherValueType, string> = {
    [FLASH_SALE_VOUCHER.VALUE_TYPES.MONETARY]: 'Monetary Value',
    [FLASH_SALE_VOUCHER.VALUE_TYPES.PERCENTAGE]: 'Percentage Value',
    [FLASH_SALE_VOUCHER.VALUE_TYPES.POINTS]: 'Points Value',
    [FLASH_SALE_VOUCHER.VALUE_TYPES.ITEMS]: 'Items Value',
    [FLASH_SALE_VOUCHER.VALUE_TYPES.SERVICES]: 'Services Value',
    [FLASH_SALE_VOUCHER.VALUE_TYPES.COMBINATION]: 'Combination Value',
  };
  return labels[valueType] || 'Unknown Value Type';
}

export function flashsalesVoucherGetRedemptionLabel(
  redemption: FlashSaleVoucherRedemption
): string {
  const labels: Record<FlashSaleVoucherRedemption, string> = {
    [FLASH_SALE_VOUCHER.REDEMPTION.ONLINE]: 'Online Redemption',
    [FLASH_SALE_VOUCHER.REDEMPTION.OFFLINE]: 'Offline Redemption',
    [FLASH_SALE_VOUCHER.REDEMPTION.BOTH]: 'Both Online & Offline',
    [FLASH_SALE_VOUCHER.REDEMPTION.MOBILE]: 'Mobile Redemption',
    [FLASH_SALE_VOUCHER.REDEMPTION.STORE]: 'Store Redemption',
  };
  return labels[redemption] || 'Unknown Redemption';
}

export function flashsalesVoucherGetExpiryLabel(expiry: FlashSaleVoucherExpiry): string {
  const labels: Record<FlashSaleVoucherExpiry, string> = {
    [FLASH_SALE_VOUCHER.EXPIRY.NO_EXPIRY]: 'No Expiry',
    [FLASH_SALE_VOUCHER.EXPIRY.FIXED_DATE]: 'Fixed Date',
    [FLASH_SALE_VOUCHER.EXPIRY.DAYS_AFTER_ISSUE]: 'Days After Issue',
    [FLASH_SALE_VOUCHER.EXPIRY.MONTHS_AFTER_ISSUE]: 'Months After Issue',
    [FLASH_SALE_VOUCHER.EXPIRY.YEARS_AFTER_ISSUE]: 'Years After Issue',
    [FLASH_SALE_VOUCHER.EXPIRY.CUSTOM]: 'Custom Expiry',
  };
  return labels[expiry] || 'Unknown Expiry';
}

export function flashsalesVoucherGetTransferLabel(transfer: FlashSaleVoucherTransfer): string {
  const labels: Record<FlashSaleVoucherTransfer, string> = {
    [FLASH_SALE_VOUCHER.TRANSFER.ALLOWED]: 'Transfer Allowed',
    [FLASH_SALE_VOUCHER.TRANSFER.NOT_ALLOWED]: 'Transfer Not Allowed',
    [FLASH_SALE_VOUCHER.TRANSFER.LIMITED]: 'Limited Transfer',
    [FLASH_SALE_VOUCHER.TRANSFER.ONCE]: 'Transfer Once',
  };
  return labels[transfer] || 'Unknown Transfer';
}

export function flashsalesVoucherIsValidType(type: string): type is FlashSaleVoucherType {
  return Object.values(FLASH_SALE_VOUCHER.TYPES).includes(type as FlashSaleVoucherType);
}

export function flashsalesVoucherIsValidCategory(
  category: string
): category is FlashSaleVoucherCategory {
  return Object.values(FLASH_SALE_VOUCHER.CATEGORIES).includes(
    category as FlashSaleVoucherCategory
  );
}

export function flashsalesVoucherGetDefaultDenomination(): number {
  return FLASH_SALE_VOUCHER.DEFAULTS.DENOMINATION;
}

export function flashsalesVoucherGetDefaultValidityDays(): number {
  return FLASH_SALE_VOUCHER.DEFAULTS.VALIDITY_DAYS;
}

export function flashsalesVoucherGetDefaultCodeLength(): number {
  return FLASH_SALE_VOUCHER.DEFAULTS.CODE_LENGTH;
}

export function flashsalesVoucherGetMaxValue(): number {
  return FLASH_SALE_VOUCHER.LIMITS.MAX_VALUE;
}

export function flashsalesVoucherGetMinValue(): number {
  return FLASH_SALE_VOUCHER.LIMITS.MIN_VALUE;
}

export function flashsalesVoucherGetMaxRedemptions(): number {
  return FLASH_SALE_VOUCHER.LIMITS.MAX_REDEMPTIONS;
}

export function flashsalesVoucherGetMaxCodeLength(): number {
  return FLASH_SALE_VOUCHER.LIMITS.MAX_CODE_LENGTH;
}

export function flashsalesVoucherGetMinCodeLength(): number {
  return FLASH_SALE_VOUCHER.LIMITS.MIN_CODE_LENGTH;
}

export function flashsalesVoucherGetMaxBulkGeneration(): number {
  return FLASH_SALE_VOUCHER.LIMITS.MAX_BULK_GENERATION;
}

export function flashsalesVoucherGenerateRandomCode(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
