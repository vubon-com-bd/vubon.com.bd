import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../admin/admin-permission.constants';
import { USER_STATUS } from '../user/user-status.constants';
import { VENDOR_STATUS } from '../business/vendor/vendor-status.constants';

export const SUPPORT = {
  STATUS: {
    ...STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    MAINTENANCE: 'maintenance',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'support:view',
    CREATE: 'support:create',
    UPDATE: 'support:update',
    DELETE: 'support:delete',
    MANAGE: 'support:manage',
    ASSIGN: 'support:assign',
    ESCALATE: 'support:escalate',
    RESOLVE: 'support:resolve',
  },
  USER_STATUS: { ...USER_STATUS },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  SUPPORT_HOURS: {
    WEEKDAY: '9:00 AM - 9:00 PM',
    WEEKEND: '10:00 AM - 6:00 PM',
    HOLIDAY: 'Closed',
  },
  RESPONSE_TIMEOUT_MINUTES: 30,
  RESOLUTION_TIMEOUT_HOURS: 24,
  MAX_TICKETS_PER_USER: 10,
} as const;
