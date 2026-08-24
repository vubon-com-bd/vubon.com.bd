/**
 * Inventory Location Constants Index
 * Export all inventory location constants and types for easy importing
 */

// Inventory Location Constants
export {
  LOGISTICS_INVENTORY_LOCATION,
  logisticsInventoryLocationGetTypeLabel,
  logisticsInventoryLocationGetStatusLabel,
  logisticsInventoryLocationGetZoneLabel,
  logisticsInventoryLocationGetCapacity,
  logisticsInventoryLocationIsActive,
  logisticsInventoryLocationIsOperational,
  logisticsInventoryLocationGetStorageTypeLabel,
} from './inventory-location.constants';

export type {
  LogisticsInventoryLocationType,
  LogisticsInventoryLocationStatus,
  LogisticsInventoryLocationZone,
  LogisticsInventoryStorageType,
} from './inventory-location.constants';

// Inventory Location Type Constants
export {
  LOGISTICS_INVENTORY_LOCATION_TYPE,
  logisticsInventoryLocationTypeGetCategory,
  logisticsInventoryLocationTypeGetIcon,
  logisticsInventoryLocationTypeGetColor,
  logisticsInventoryLocationTypeGetAccessLabel,
  logisticsInventoryLocationTypeGetEnvironmentLabel,
} from './inventory-location-type.constants';

export type {
  LogisticsInventoryLocationTypeCategory,
  LogisticsInventoryLocationTypeIcon,
  LogisticsInventoryLocationTypeColor,
  LogisticsInventoryLocationAccessType,
  LogisticsInventoryLocationEnvironmentType,
} from './inventory-location-type.constants';
