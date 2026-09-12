import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { INVENTORY } from '../../business/product/inventory.constants';

export const INVENTORY_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    TURNOVER: 'turnover',
    VALUATION: 'valuation',
    MOVEMENT: 'movement',
  },
  INVENTORY: { ...INVENTORY },
  METRICS: {
    TOTAL_INVENTORY: 'total_inventory',
    STOCK_VALUE: 'stock_value',
    TURNOVER_RATE: 'turnover_rate',
    DAYS_OF_INVENTORY: 'days_of_inventory',
    OUT_OF_STOCK_ITEMS: 'out_of_stock_items',
    LOW_STOCK_ITEMS: 'low_stock_items',
    OVERSTOCK_ITEMS: 'overstock_items',
  },
  INVENTORY_STATUS: {
    IN_STOCK: 'in_stock',
    LOW_STOCK: 'low_stock',
    OUT_OF_STOCK: 'out_of_stock',
    OVERSTOCK: 'overstock',
  },
  REORDER_LEVELS: {
    MIN: 'min',
    MAX: 'max',
    REORDER_POINT: 'reorder_point',
  },
} as const;
