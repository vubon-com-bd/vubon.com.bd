export const VENDOR_RETURN_TYPE = {
  NO_RETURN: 'no_return',
  FULL_RETURN: 'full_return',
  EXCHANGE_ONLY: 'exchange_only',
  PARTIAL_RETURN: 'partial_return',
  CONDITIONAL: 'conditional',
} as const;

export const VENDOR_RETURN_POLICY = {
  DEFAULT_WINDOW_DAYS: 7,
  MIN_WINDOW_DAYS: 0,
  MAX_WINDOW_DAYS: 30,
  FREE_RETURN: true,
  RESTOCK_FEE_PERCENT: 0,
  REQUIRE_REASON: true,
  REQUIRE_IMAGES: false,
  MAX_IMAGES: 5,
  AUTO_APPROVE: false,
  APPROVAL_SLA_HOURS: 48,
} as const;

export type VendorReturnTypeType = (typeof VENDOR_RETURN_TYPE)[keyof typeof VENDOR_RETURN_TYPE];
