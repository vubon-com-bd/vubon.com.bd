import { STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { RECOMMENDATION_TYPE } from './recommendation-type.constants';
import { RECOMMENDATION_STRATEGY } from './recommendation-strategy.constants';
import { PRODUCT_STATUS } from '../../business/product/product-status.constants';

export const RECOMMENDATION = {
  STATUS: {
    ...STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    COMPUTING: 'computing',
    FAILED: 'failed',
    EXPIRED: 'expired',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'recommendation:view',
    CREATE: 'recommendation:create',
    UPDATE: 'recommendation:update',
    DELETE: 'recommendation:delete',
  },
  RECOMMENDATION_TYPE: { ...RECOMMENDATION_TYPE },
  RECOMMENDATION_STRATEGY: { ...RECOMMENDATION_STRATEGY },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  RECOMMENDATION_SOURCES: {
    USER: 'user',
    PRODUCT: 'product',
    CATEGORY: 'category',
    BEHAVIOR: 'behavior',
    SIMILARITY: 'similarity',
    COLLABORATIVE: 'collaborative',
    CONTENT_BASED: 'content_based',
    HYBRID: 'hybrid',
  },
  MAX_RECOMMENDATIONS_PER_USER: 100,
  RECOMMENDATION_SCORE_THRESHOLD: 0.3,
  RECOMMENDATION_CACHE_TTL_HOURS: 12,
} as const;
