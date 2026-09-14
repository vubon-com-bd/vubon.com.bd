export const CATEGORY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  HIDDEN: 'hidden',
  DELETED: 'deleted',
} as const;

export const CATEGORY = {
  MAX_DEPTH: 5,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  SLUG_MAX_LENGTH: 120,
  DESCRIPTION_MAX_LENGTH: 1000,
  MAX_CHILDREN: 50,
  IMAGE_MAX_SIZE_MB: 5,
} as const;

export type CategoryStatusType = (typeof CATEGORY_STATUS)[keyof typeof CATEGORY_STATUS];
