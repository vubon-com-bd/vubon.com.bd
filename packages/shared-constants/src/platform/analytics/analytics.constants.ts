import { STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { VENDOR_STATUS } from '../../business/vendor/vendor-status.constants';

export const ANALYTICS = {
  STATUS: {
    ...STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    SCHEDULED: 'scheduled',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'analytics:view',
    QUERY: 'analytics:query',
    EXPORT: 'analytics:export',
    MANAGE: 'analytics:manage',
    CONFIGURE: 'analytics:configure',
  },
  USER_STATUS: { ...USER_STATUS },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  ANALYTICS_TYPES: {
    REAL_TIME: 'real_time',
    HISTORICAL: 'historical',
    PREDICTIVE: 'predictive',
    PRESCRIPTIVE: 'prescriptive',
    DIAGNOSTIC: 'diagnostic',
    DESCRIPTIVE: 'descriptive',
  },
  MAX_QUERY_RESULTS: 10000,
  QUERY_TIMEOUT_SECONDS: 30,
  CACHE_TTL_MINUTES: 5,
  MAX_CONCURRENT_QUERIES: 10,
} as const;
