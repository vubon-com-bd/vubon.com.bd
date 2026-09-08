import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../admin/admin-permission.constants';
import { VENDOR_PERMISSION } from '../business/vendor/vendor-permission.constants';
import { ORDER_STATUS } from '../business/checkout/order-status.constants';

export const LOGISTICS = {
  STATUS: {
    ...STATUS,
    PENDING: 'pending',
    PROCESSING: 'processing',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    ...VENDOR_PERMISSION,
    VIEW: 'logistics:view',
    CREATE: 'logistics:create',
    UPDATE: 'logistics:update',
    DELETE: 'logistics:delete',
    MANAGE: 'logistics:manage',
    TRACK: 'logistics:track',
    DISPATCH: 'logistics:dispatch',
    ASSIGN: 'logistics:assign',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  MAX_WEIGHT_KG: 1000,
  MAX_DIMENSIONS_CM: { length: 200, width: 200, height: 200 },
  DEFAULT_DELIVERY_DAYS: 3,
  MAX_DELIVERY_DAYS: 30,
} as const;
