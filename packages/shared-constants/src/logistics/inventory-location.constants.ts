import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { INVENTORY } from '../business/product/inventory.constants';
import { WAREHOUSE } from './warehouse.constants';

export const INVENTORY_LOCATION = {
  STATUS: {
    ...COMMON_STATUS,
    AVAILABLE: 'available',
    RESERVED: 'reserved',
    OCCUPIED: 'occupied',
    MAINTENANCE: 'maintenance',
  },
  TYPES: {
    ...COMMON_TYPES,
    RACK: 'rack',
    SHELF: 'shelf',
    BIN: 'bin',
    PALLET: 'pallet',
    CONTAINER: 'container',
  },
  INVENTORY: { ...INVENTORY },
  WAREHOUSE: { ...WAREHOUSE },
  LOCATION_FORMAT: '{{zone}}-{{rack}}-{{shelf}}-{{bin}}',
  MAX_ITEMS_PER_LOCATION: 1000,
  MIN_ITEMS_PER_LOCATION: 0,
} as const;
