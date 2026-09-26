/**
 * Inventory location configuration
 * @module shared-config/logistics/warehouse
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const INVENTORY_LOCATION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('INVENTORY_LOCATION_ENABLED', true),
  useBarcode: getOptionalEnvBool('INVENTORY_LOCATION_BARCODE', true),
  zones: Object.freeze([
    'receiving',
    'storage',
    'picking',
    'packing',
    'shipping',
    'returns',
    'quarantine',
    'dispatch',
  ] as const),
  maxAisles: getOptionalEnvInt('INVENTORY_MAX_AISLES', 100),
  maxRacksPerAisle: getOptionalEnvInt('INVENTORY_MAX_RACKS', 50),
  maxShelvesPerRack: getOptionalEnvInt('INVENTORY_MAX_SHELVES', 10),
  maxBinsPerShelf: getOptionalEnvInt('INVENTORY_MAX_BINS', 20),
  autoCountIntervalDays: getOptionalEnvInt('INVENTORY_COUNT_INTERVAL_DAYS', 30),
});
