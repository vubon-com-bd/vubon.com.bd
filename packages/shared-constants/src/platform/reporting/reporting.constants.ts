import { STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { VENDOR_STATUS } from '../../business/vendor/vendor-status.constants';

export const REPORTING = {
  STATUS: {
    ...STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PROCESSING: 'processing',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    FAILED: 'failed',
    SCHEDULED: 'scheduled',
    ARCHIVED: 'archived',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'reporting:view',
    CREATE: 'reporting:create',
    UPDATE: 'reporting:update',
    DELETE: 'reporting:delete',
    MANAGE: 'reporting:manage',
    EXPORT: 'reporting:export',
    SCHEDULE: 'reporting:schedule',
    CONFIGURE: 'reporting:configure',
  },
  USER_STATUS: { ...USER_STATUS },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  REPORTING_TYPES: {
    SALES: 'sales',
    REVENUE: 'revenue',
    PRODUCT: 'product',
    USER: 'user',
    VENDOR: 'vendor',
    ORDER: 'order',
    PAYMENT: 'payment',
    SUPPORT: 'support',
    MARKETING: 'marketing',
    TRAFFIC: 'traffic',
    INVENTORY: 'inventory',
    FINANCIAL: 'financial',
  },
  MAX_REPORTS: 100,
  MAX_RETENTION_DAYS: 365,
  DEFAULT_TIMEZONE: 'Asia/Dhaka',
} as const;
