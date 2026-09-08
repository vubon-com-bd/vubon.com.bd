import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { ORDER_FULFILLMENT } from '../business/checkout/order-fulfillment.constants';
import { INVENTORY } from '../business/product/inventory.constants';
import { WAREHOUSE } from './warehouse.constants';

export const FULFILLMENT = {
  STATUS: {
    ...COMMON_STATUS,
    ...ORDER_FULFILLMENT.STATUS,
    PENDING: 'pending',
    PROCESSING: 'processing',
    PICKING: 'picking',
    PACKING: 'packing',
    LABELING: 'labeling',
    READY_TO_SHIP: 'ready_to_ship',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    FAILED: 'failed',
  },
  ORDER_FULFILLMENT: { ...ORDER_FULFILLMENT },
  INVENTORY: { ...INVENTORY },
  WAREHOUSE: { ...WAREHOUSE },
  FULFILLMENT_TYPES: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    SAME_DAY: 'same_day',
    BATCH: 'batch',
  },
  PICKING_STRATEGIES: {
    SINGLE: 'single',
    BATCH: 'batch',
    WAVE: 'wave',
    ZONE: 'zone',
  },
  MAX_ITEMS_PER_BATCH: 50,
  FULFILLMENT_TIMEOUT_HOURS: 24,
} as const;
