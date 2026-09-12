import { STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { VENDOR_STATUS } from '../../business/vendor/vendor-status.constants';
import { CONTENT_STATUS } from '../../content/content-status.constants';
import { PRODUCT_STATUS } from '../../business/product/product-status.constants';

export const SEO = {
  STATUS: {
    ...STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    OPTIMIZING: 'optimizing',
    AUDITING: 'auditing',
    INDEXED: 'indexed',
    NOT_INDEXED: 'not_indexed',
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'seo:view',
    MANAGE: 'seo:manage',
    OPTIMIZE: 'seo:optimize',
    AUDIT: 'seo:audit',
    CONFIGURE: 'seo:configure',
    ANALYZE: 'seo:analyze',
  },
  USER_STATUS: { ...USER_STATUS },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  CONTENT_STATUS: { ...CONTENT_STATUS },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  SEO_TYPES: {
    ON_PAGE: 'on_page',
    OFF_PAGE: 'off_page',
    TECHNICAL: 'technical',
    LOCAL: 'local',
    ECOMMERCE: 'ecommerce',
    CONTENT: 'content',
  },
  MAX_TITLE_LENGTH: 60,
  MAX_DESCRIPTION_LENGTH: 160,
  MAX_KEYWORDS: 10,
  RECOMMENDED_KEYWORD_DENSITY: 0.02,
  MAX_KEYWORD_DENSITY: 0.05,
  MIN_CONTENT_WORDS: 300,
  RECOMMENDED_CONTENT_WORDS: 1000,
} as const;
