import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';

export const ORDER = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    PROCESSING: 'processing',
    CONFIRMED: 'confirmed',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    RETURNED: 'returned',
    REFUNDED: 'refunded',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'order:view',
    CREATE: 'order:create',
    UPDATE: 'order:update',
    CANCEL: 'order:cancel',
    RETURN: 'order:return',
    MANAGE: 'order:manage',
    TRACK: 'order:track',
  },
  USER_STATUS: { ...USER_STATUS },
  ORDER_NUMBER_PREFIX: 'ORD',
  ORDER_NUMBER_LENGTH: 10,
  MAX_ORDER_ITEMS: 100,
} as const;
