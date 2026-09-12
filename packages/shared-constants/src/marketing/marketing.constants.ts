import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../admin/admin-permission.constants';
import { USER_STATUS } from '../user/user-status.constants';
import { VENDOR_STATUS } from '../business/vendor/vendor-status.constants';

export const MARKETING = {
  STATUS: {
    ...STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    ARCHIVED: 'archived',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'marketing:view',
    CREATE: 'marketing:create',
    UPDATE: 'marketing:update',
    DELETE: 'marketing:delete',
    MANAGE: 'marketing:manage',
    ANALYZE: 'marketing:analyze',
    OPTIMIZE: 'marketing:optimize',
  },
  USER_STATUS: { ...USER_STATUS },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  MAX_BUDGET: 1000000,
  MIN_BUDGET: 100,
  DEFAULT_CURRENCY: 'BDT',
} as const;
