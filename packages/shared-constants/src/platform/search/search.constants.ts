import { STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';
import { PRODUCT_STATUS } from '../../business/product/product-status.constants';
import { VENDOR_STATUS } from '../../business/vendor/vendor-status.constants';

// SEARCH এর পরিবর্তে PLATFORM_SEARCH ব্যবহার করছি
export const PLATFORM_SEARCH = {
  STATUS: {
    ...STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    INDEXING: 'indexing',
    OPTIMIZING: 'optimizing',
    MAINTENANCE: 'maintenance',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'search:view',
    MANAGE: 'search:manage',
    CONFIGURE: 'search:configure',
    ANALYZE: 'search:analyze',
    OPTIMIZE: 'search:optimize',
  },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  SEARCH_TYPES: {
    PRODUCT: 'product',
    VENDOR: 'vendor',
    CATEGORY: 'category',
    BRAND: 'brand',
    CONTENT: 'content',
    USER: 'user',
    ORDER: 'order',
    ALL: 'all',
  },
  MAX_SEARCH_RESULTS: 100,
  MIN_SEARCH_QUERY_LENGTH: 2,
  MAX_SEARCH_QUERY_LENGTH: 100,
  SEARCH_TIMEOUT_MS: 2000,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;
