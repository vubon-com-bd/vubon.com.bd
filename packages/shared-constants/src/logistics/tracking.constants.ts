import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { SHIPMENT_STATUS } from './shipment-status.constants';
import { DELIVERY_STATUS } from './delivery-status.constants';

export const TRACKING = {
  STATUS: {
    ...COMMON_STATUS,
    ...SHIPMENT_STATUS,
    ...DELIVERY_STATUS,
    ACTIVE: 'active',
    EXPIRED: 'expired',
  },
  SHIPMENT_STATUS: { ...SHIPMENT_STATUS },
  DELIVERY_STATUS: { ...DELIVERY_STATUS },
  TRACKING_NUMBER_PREFIX: 'TRK',
  TRACKING_NUMBER_LENGTH: 15,
  TRACKING_EVENTS: [
    'shipment_created',
    'label_generated',
    'picked_up',
    'in_transit',
    'out_for_delivery',
    'delivered',
    'delivery_attempted',
    'returned',
  ],
  MAX_TRACKING_UPDATES: 100,
  TRACKING_RETENTION_DAYS: 90,
} as const;
