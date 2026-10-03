export const VENDOR_WARRANTY_TYPE = {
  NONE: 'none',
  MANUFACTURER: 'manufacturer',
  SELLER: 'seller',
  EXTENDED: 'extended',
  INTERNATIONAL: 'international',
  LIMITED: 'limited',
} as const;

export const VENDOR_WARRANTY_PERIOD = {
  DAYS_7: 7,
  DAYS_30: 30,
  DAYS_90: 90,
  MONTHS_6: 180,
  YEAR_1: 365,
  YEARS_2: 730,
  YEARS_3: 1095,
  YEARS_5: 1825,
} as const;

export const VENDOR_WARRANTY = {
  DEFAULT_TYPE: VENDOR_WARRANTY_TYPE.SELLER,
  DEFAULT_PERIOD_DAYS: VENDOR_WARRANTY_PERIOD.DAYS_30,
  MAX_PERIOD_DAYS: 1825,
  REQUIRE_PROOF: true,
  COVER_SHIPPING: false,
  AUTO_REGISTER: true,
} as const;

export type VendorWarrantyTypeType =
  (typeof VENDOR_WARRANTY_TYPE)[keyof typeof VENDOR_WARRANTY_TYPE];
