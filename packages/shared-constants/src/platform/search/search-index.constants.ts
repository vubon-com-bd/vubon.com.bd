import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const SEARCH_INDEX = {
  STATUS: {
    ...COMMON_STATUS,
    CREATING: 'creating',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    REINDEXING: 'reindexing',
    ERROR: 'error',
    DELETED: 'deleted',
  },
  TYPES: {
    ...COMMON_TYPES,
    PRODUCT: 'product',
    VENDOR: 'vendor',
    CATEGORY: 'category',
    BRAND: 'brand',
    CONTENT: 'content',
    USER: 'user',
    ORDER: 'order',
    REVIEW: 'review',
  },
  INDEX_FIELDS: {
    PRODUCT: ['name', 'description', 'category', 'brand', 'tags', 'sku'],
    VENDOR: ['name', 'description', 'category', 'address'],
    CONTENT: ['title', 'content', 'category', 'tags'],
  },
  REINDEX_SCHEDULE: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    ON_DEMAND: 'on_demand',
  },
  MAX_INDEX_SIZE_MB: 1024,
  INDEX_BATCH_SIZE: 100,
} as const;
