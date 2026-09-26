export const FLASH_SALE_PARTICIPANT_TYPE = {
  PRODUCT: 'product',
  VARIANT: 'variant',
  CATEGORY: 'category',
  BRAND: 'brand',
  VENDOR: 'vendor',
} as const;

export const FLASH_SALE_PARTICIPANT_STATUS = {
  INVITED: 'invited',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
  SUSPENDED: 'suspended',
} as const;

export const FLASH_SALE_PARTICIPANT = {
  MAX_PARTICIPANTS: 10000,
  MIN_RATING: 3,
  REQUIRE_APPROVAL: true,
  AUTO_APPROVE_VERIFIED: false,
} as const;

export type FlashSaleParticipantTypeType =
  (typeof FLASH_SALE_PARTICIPANT_TYPE)[keyof typeof FLASH_SALE_PARTICIPANT_TYPE];
export type FlashSaleParticipantStatusType =
  (typeof FLASH_SALE_PARTICIPANT_STATUS)[keyof typeof FLASH_SALE_PARTICIPANT_STATUS];
