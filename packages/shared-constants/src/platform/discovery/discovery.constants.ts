import { STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';
import { PRODUCT_STATUS } from '../../business/product/product-status.constants';
import { USER_STATUS } from '../../user/user-status.constants';

export const DISCOVERY = {
  STATUS: {
    ...STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    COMPUTING: 'computing',
    OPTIMIZING: 'optimizing',
    MAINTENANCE: 'maintenance',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'discovery:view',
    MANAGE: 'discovery:manage',
    CONFIGURE: 'discovery:configure',
    PERSONALIZE: 'discovery:personalize',
  },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  USER_STATUS: { ...USER_STATUS },
  DISCOVERY_TYPES: {
    TRENDING: 'trending',
    POPULAR: 'popular',
    RECOMMENDED: 'recommended',
    PERSONALIZED: 'personalized',
    RECENTLY_VIEWED: 'recently_viewed',
    FREQUENTLY_BOUGHT: 'frequently_bought',
    COMPLEMENTARY: 'complementary',
    SUBSTITUTE: 'substitute',
    UPSELLING: 'upselling',
    CROSS_SELLING: 'cross_selling',
    BUNDLE: 'bundle',
    NEW_ARRIVALS: 'new_arrivals',
  },
  MAX_RECOMMENDATIONS: 20,
  MIN_RECOMMENDATIONS: 3,
  DISCOVERY_CACHE_TTL_HOURS: 24,
  COMPUTATION_TIMEOUT_MINUTES: 30,
} as const;
