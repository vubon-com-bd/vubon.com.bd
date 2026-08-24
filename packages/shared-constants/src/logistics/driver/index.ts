/**
 * Driver Constants Index
 * Export all driver constants and types for easy importing
 */

// Driver Constants
export {
  LOGISTICS_DRIVER,
  logisticsDriverGetTypeLabel,
  logisticsDriverGetStatusLabel,
  logisticsDriverGetLicenseTypeLabel,
  logisticsDriverGetLicenseClassLabel,
  logisticsDriverGetExperienceLevelLabel,
  logisticsDriverIsAvailable,
  logisticsDriverIsActive,
  logisticsDriverGetDocumentTypeLabel,
} from './driver.constants';

export type {
  LogisticsDriverType,
  LogisticsDriverStatus,
  LogisticsDriverLicenseType,
  LogisticsDriverLicenseClass,
  LogisticsDriverExperienceLevel,
  LogisticsDriverDocumentType,
} from './driver.constants';

// Driver Status Constants
export {
  LOGISTICS_DRIVER_STATUS,
  logisticsDriverStatusGetLabel,
  logisticsDriverStatusGetCategory,
  logisticsDriverStatusIsAvailable,
  logisticsDriverStatusIsActive,
  logisticsDriverStatusCanTransition,
} from './driver-status.constants';

export type {
  LogisticsDriverStatusType,
  LogisticsDriverStatusCategory,
  LogisticsDriverStatusColor,
  LogisticsDriverStatusIcon,
  LogisticsDriverStatusTransition,
} from './driver-status.constants';
