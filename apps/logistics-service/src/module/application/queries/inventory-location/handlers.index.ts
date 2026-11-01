import { GetInventoryLocationHandler } from './get-inventory-location.handler.js';
import { GetInventoryLocationByCodeHandler } from './get-inventory-location-by-code.handler.js';
import { GetInventoryLocationByBarcodeHandler } from './get-inventory-location-by-barcode.handler.js';
import { ListInventoryLocationsHandler } from './list-inventory-locations.handler.js';
import { ListInventoryLocationsByWarehouseHandler } from './list-inventory-locations-by-warehouse.handler.js';
import { ListInventoryLocationsByZoneHandler } from './list-inventory-locations-by-zone.handler.js';
import { ListPickableInventoryLocationsHandler } from './list-pickable-inventory-locations.handler.js';
import { GetInventoryLocationStatsHandler } from './get-inventory-location-stats.handler.js';

export const INVENTORY_LOCATION_QUERY_HANDLERS = [
  GetInventoryLocationHandler,
  GetInventoryLocationByCodeHandler,
  GetInventoryLocationByBarcodeHandler,
  ListInventoryLocationsHandler,
  ListInventoryLocationsByWarehouseHandler,
  ListInventoryLocationsByZoneHandler,
  ListPickableInventoryLocationsHandler,
  GetInventoryLocationStatsHandler,
] as const;
