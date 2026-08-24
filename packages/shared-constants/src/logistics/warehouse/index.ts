/**
 * Warehouse Constants Index
 * Export all warehouse constants and types for easy importing
 */

// Warehouse Constants
export {
  LOGISTICS_WAREHOUSE,
  logisticsWarehouseGetTypeLabel,
  logisticsWarehouseGetStatusLabel,
  logisticsWarehouseGetLocationLabel,
  logisticsWarehouseGetCapacity,
  logisticsWarehouseGetZoneLabel,
  logisticsWarehouseIsActive,
  logisticsWarehouseIsOperational,
  logisticsWarehouseGetStorageTypeLabel,
  logisticsWarehouseIsWithinOperatingHours,
} from './warehouse.constants';

export type {
  LogisticsWarehouseType,
  LogisticsWarehouseStatus,
  LogisticsWarehouseLocation,
  LogisticsWarehouseStorageType,
  LogisticsWarehouseZone,
} from './warehouse.constants';

// Warehouse Type Constants
export {
  LOGISTICS_WAREHOUSE_TYPE,
  logisticsWarehouseTypeGetLabel,
  logisticsWarehouseTypeGetCategory,
  logisticsWarehouseTypeGetIcon,
  logisticsWarehouseTypeGetColor,
  logisticsWarehouseTypeGetCapacityMultiplier,
  logisticsWarehouseTypeGetServices,
} from './warehouse-type.constants';

export type {
  LogisticsWarehouseTypeType,
  LogisticsWarehouseTypeCategory,
  LogisticsWarehouseTypeIcon,
  LogisticsWarehouseTypeColor,
} from './warehouse-type.constants';

// Warehouse Status Constants
export {
  LOGISTICS_WAREHOUSE_STATUS,
  logisticsWarehouseStatusGetLabel,
  logisticsWarehouseStatusGetCategory,
  logisticsWarehouseStatusIsOperational,
  logisticsWarehouseStatusIsAvailable,
  logisticsWarehouseStatusIsFull,
  logisticsWarehouseStatusCanTransition,
} from './warehouse-status.constants';

export type {
  LogisticsWarehouseStatusType,
  LogisticsWarehouseStatusCategory,
  LogisticsWarehouseStatusColor,
  LogisticsWarehouseStatusIcon,
  LogisticsWarehouseStatusTransition,
} from './warehouse-status.constants';
