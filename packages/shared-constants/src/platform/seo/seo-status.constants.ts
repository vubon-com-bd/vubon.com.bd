import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const SEO_STATUS = {
  DRAFT: COMMON_STATUS.DRAFT,
  PENDING: COMMON_STATUS.PENDING,
  ACTIVE: COMMON_STATUS.ACTIVE,
  INACTIVE: COMMON_STATUS.INACTIVE,
  OPTIMIZED: 'optimized',
  NEEDS_OPTIMIZATION: 'needs_optimization',
  ERROR: 'error',
  ARCHIVED: COMMON_STATUS.ARCHIVED,
} as const;

export type SeoStatusType = (typeof SEO_STATUS)[keyof typeof SEO_STATUS];
