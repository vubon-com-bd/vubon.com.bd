import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { COMPLAINT_SEVERITY } from './complaint-severity.constants';
import { ORDER_STATUS } from '../business/checkout/order-status.constants';

export const COMPLAINT = {
  STATUS: {
    ...COMMON_STATUS,
    RECEIVED: 'received',
    INVESTIGATING: 'investigating',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
    ESCALATED: 'escalated',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'complaint:view',
    CREATE: 'complaint:create',
    UPDATE: 'complaint:update',
    DELETE: 'complaint:delete',
    RESOLVE: 'complaint:resolve',
  },
  COMPLAINT_SEVERITY: { ...COMPLAINT_SEVERITY },
  ORDER_STATUS: { ...ORDER_STATUS },
  COMPLAINT_TYPES: {
    PRODUCT: 'product',
    DELIVERY: 'delivery',
    PAYMENT: 'payment',
    SERVICE: 'service',
    VENDOR: 'vendor',
    OTHER: 'other',
  },
  MAX_CONTENT_LENGTH: 5000,
  MIN_CONTENT_LENGTH: 20,
  RESPONSE_TIMEOUT_HOURS: 48,
} as const;
