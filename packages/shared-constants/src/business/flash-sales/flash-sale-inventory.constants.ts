import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { INVENTORY } from '../product/inventory.constants';
import { PRODUCT_STATUS } from '../product/product-status.constants';
import { FLASH_SALE_STATUS } from './flash-sale-status.constants';

export const FLASH_SALE_INVENTORY = {
  STATUS: {
    ...COMMON_STATUS,
    ...INVENTORY.STATUS,
    RESERVED: 'reserved',
    ALLOCATED: 'allocated',
    SOLD: 'sold',
    AVAILABLE: 'available',
    OUT_OF_STOCK: 'out_of_stock',
  },
  INVENTORY: { ...INVENTORY },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  FLASH_SALE_STATUS: { ...FLASH_SALE_STATUS },
  INVENTORY_TYPES: {
    DEDICATED: 'dedicated',
    SHARED: 'shared',
    RESERVED: 'reserved',
  },
  MAX_RESERVATION_MINUTES: 15,
  AUTO_RELEASE_MINUTES: 5,
  STOCK_ALERT_THRESHOLD: 10,
} as const;
