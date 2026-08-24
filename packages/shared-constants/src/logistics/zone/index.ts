/**
 * Zone Constants Index
 * Export all zone constants and types for easy importing
 */

// Zone Constants
export {
  LOGISTICS_ZONE,
  logisticsZoneGetTypeLabel,
  logisticsZoneGetDivisionLabel,
  logisticsZoneGetStatusLabel,
  logisticsZoneGetCoverage,
  logisticsZoneIsActive,
  logisticsZoneIsOperational,
} from './zone.constants';

export type {
  LogisticsZoneType,
  LogisticsZoneDivision,
  LogisticsZoneDistrict,
  LogisticsZoneStatus,
} from './zone.constants';

// Zone Type Constants
export {
  LOGISTICS_ZONE_TYPE,
  logisticsZoneTypeGetLabel,
  logisticsZoneTypeGetIcon,
  logisticsZoneTypeGetColor,
  logisticsZoneTypeGetDensity,
  logisticsZoneTypeGetAreaType,
} from './zone-type.constants';

export type {
  LogisticsZoneTypeCategory,
  LogisticsZoneTypeIcon,
  LogisticsZoneTypeColor,
  LogisticsZoneAreaType,
} from './zone-type.constants';
