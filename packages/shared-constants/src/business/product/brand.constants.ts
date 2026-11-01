export const BRAND_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  REJECTED: 'rejected',
  DELETED: 'deleted',
} as const;

export const BRAND = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  SLUG_MAX_LENGTH: 120,
  DESCRIPTION_MAX_LENGTH: 2000,
  LOGO_MAX_SIZE_MB: 5,
  BANNER_MAX_SIZE_MB: 10,
  WEBSITE_MAX_LENGTH: 255,
} as const;

export type BrandStatusType = (typeof BRAND_STATUS)[keyof typeof BRAND_STATUS];
