export const COLLECTION_TYPE = {
  MANUAL: 'manual',
  AUTOMATIC: 'automatic',
  SEASONAL: 'seasonal',
  FEATURED: 'featured',
  TRENDING: 'trending',
  NEW_ARRIVAL: 'new_arrival',
  BEST_SELLER: 'best_seller',
} as const;

export const COLLECTION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SCHEDULED: 'scheduled',
  EXPIRED: 'expired',
  DELETED: 'deleted',
} as const;

export const COLLECTION = {
  MAX_PRODUCTS: 500,
  NAME_MAX_LENGTH: 150,
  DESCRIPTION_MAX_LENGTH: 2000,
  SLUG_MAX_LENGTH: 180,
  MAX_COLLECTIONS_PER_PRODUCT: 20,
} as const;

export type CollectionTypeType = (typeof COLLECTION_TYPE)[keyof typeof COLLECTION_TYPE];
export type CollectionStatusType = (typeof COLLECTION_STATUS)[keyof typeof COLLECTION_STATUS];
