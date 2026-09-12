import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { ORDER_STATUS } from './order-status.constants';
import { USER_PERMISSIONS } from '../../user/user-permission.constants';

export const ORDER_RETURN = {
  STATUS: {
    ...COMMON_STATUS,
    REQUESTED: 'requested',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PENDING_PICKUP: 'pending_pickup',
    PICKED_UP: 'picked_up',
    INSPECTING: 'inspecting',
    RETURNED: 'returned',
    REFUNDED: 'refunded',
  },
  TYPES: {
    ...COMMON_TYPES,
    FULL_REFUND: 'full_refund',
    PARTIAL_REFUND: 'partial_refund',
    EXCHANGE: 'exchange',
    STORE_CREDIT: 'store_credit',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  PERMISSIONS: {
    ...USER_PERMISSIONS,
    REQUEST: 'return:request',
    APPROVE: 'return:approve',
    REJECT: 'return:reject',
    MANAGE: 'return:manage',
  },
  RETURN_WINDOW_DAYS: 30,
  MAX_RETURN_ITEMS: 50,
  RESTOCKING_FEE_PERCENTAGE: 10,
} as const;
