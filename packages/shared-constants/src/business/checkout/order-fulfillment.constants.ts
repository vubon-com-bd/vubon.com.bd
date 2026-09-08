import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { ORDER_STATUS } from './order-status.constants';
import { INVENTORY } from '../product/inventory.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';

export const ORDER_FULFILLMENT = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    PROCESSING: 'processing',
    PACKED: 'packed',
    READY_TO_SHIP: 'ready_to_ship',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    FAILED: 'failed',
  },
  TYPES: {
    ...COMMON_TYPES,
    FULLFILLMENT_CENTER: 'fulfillment_center',
    THIRD_PARTY: 'third_party',
    DROP_SHIPPING: 'drop_shipping',
    IN_HOUSE: 'in_house',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  INVENTORY: { ...INVENTORY },
  PERMISSIONS: {
    ...ADMIN_PERMISSIONS,
    PROCESS: 'fulfillment:process',
    PACK: 'fulfillment:pack',
    SHIP: 'fulfillment:ship',
    MANAGE: 'fulfillment:manage',
  },
  FULFILLMENT_TIMEOUT_HOURS: 48,
  MAX_FULFILLMENT_ATTEMPTS: 3,
} as const;
