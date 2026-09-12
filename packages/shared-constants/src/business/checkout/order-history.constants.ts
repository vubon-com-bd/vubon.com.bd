import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { ORDER_STATUS } from './order-status.constants';

export const ORDER_HISTORY = {
  TYPES: {
    ...COMMON_TYPES,
    CREATED: 'created',
    UPDATED: 'updated',
    STATUS_CHANGE: 'status_change',
    PAYMENT: 'payment',
    SHIPMENT: 'shipment',
    RETURN: 'return',
    CANCELLATION: 'cancellation',
    REFUND: 'refund',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  HISTORY_RETENTION_DAYS: 730, // 2 years
  MAX_HISTORY_ENTRIES: 1000,
} as const;
