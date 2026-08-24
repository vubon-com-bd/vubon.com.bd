/**
 * Packaging Constants Index
 * Export all packaging constants and types for easy importing
 */

// Packaging Constants
export {
  LOGISTICS_PACKAGING,
  logisticsPackagingGetTypeLabel,
  logisticsPackagingGetStatusLabel,
  logisticsPackagingGetMaterialLabel,
  logisticsPackagingGetSizeLabel,
  logisticsPackagingGetDimensions,
  logisticsPackagingGetWeightLimit,
  logisticsPackagingGetCost,
  logisticsPackagingIsAvailable,
  logisticsPackagingIsUsable,
  logisticsPackagingGetEcoFriendlyLabel,
} from './packaging.constants';

export type {
  LogisticsPackagingType,
  LogisticsPackagingStatus,
  LogisticsPackagingMaterial,
  LogisticsPackagingSize,
  LogisticsPackagingEcoFriendly,
} from './packaging.constants';

// Packaging Type Constants
export {
  LOGISTICS_PACKAGING_TYPE,
  logisticsPackagingTypeGetCategory,
  logisticsPackagingTypeGetIcon,
  logisticsPackagingTypeGetColor,
  logisticsPackagingTypeGetDurability,
  logisticsPackagingTypeIsReusable,
  logisticsPackagingTypeIsRecyclable,
} from './packaging-type.constants';

export type {
  LogisticsPackagingTypeCategory,
  LogisticsPackagingTypeIcon,
  LogisticsPackagingTypeColor,
} from './packaging-type.constants';
