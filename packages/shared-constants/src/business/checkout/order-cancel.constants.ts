import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { ORDER_STATUS } from './order-status.constants';
import { USER_PERMISSIONS } from '../../user/user-permission.constants';

export const ORDER_CANCEL = {
  STATUS: {
    ...COMMON_STATUS,
    REQUESTED: 'requested',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PROCESSING: 'processing',
    CANCELLED: 'cancelled',
    FAILED: 'failed',
  },
  TYPES: {
    ...COMMON_TYPES,
    BY_USER: 'by_user',
    BY_SYSTEM: 'by_system',
    BY_ADMIN: 'by_admin',
    AUTOMATIC: 'automatic',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  PERMISSIONS: {
    ...USER_PERMISSIONS,
    REQUEST: 'cancel:request',
    APPROVE: 'cancel:approve',
    REJECT: 'cancel:reject',
    MANAGE: 'cancel:manage',
  },
  CANCELLATION_WINDOW_HOURS: 24,
  REFUND_PROCESSING_DAYS: 5,
} as const;
