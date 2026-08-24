/**
 * Vehicle Constants Index
 * Export all vehicle constants and types for easy importing
 */

// Vehicle Constants
export {
  LOGISTICS_VEHICLE,
  logisticsVehicleGetTypeLabel,
  logisticsVehicleGetStatusLabel,
  logisticsVehicleGetFuelTypeLabel,
  logisticsVehicleGetConditionLabel,
  logisticsVehicleGetRegistrationTypeLabel,
  logisticsVehicleGetCapacity,
  logisticsVehicleIsAvailable,
  logisticsVehicleIsOperational,
  logisticsVehicleIsUnderMaintenance,
} from './vehicle.constants';

export type {
  LogisticsVehicleType,
  LogisticsVehicleStatus,
  LogisticsVehicleFuelType,
  LogisticsVehicleCondition,
  LogisticsVehicleRegistrationType,
} from './vehicle.constants';

// Vehicle Type Constants
export {
  LOGISTICS_VEHICLE_TYPE,
  logisticsVehicleTypeGetCategory,
  logisticsVehicleTypeGetIcon,
  logisticsVehicleTypeGetColor,
  logisticsVehicleTypeGetLicenseTypes,
  logisticsVehicleTypeGetPermitType,
} from './vehicle-type.constants';

export type {
  LogisticsVehicleTypeCategory,
  LogisticsVehicleTypeIcon,
  LogisticsVehicleTypeColor,
} from './vehicle-type.constants';

// Vehicle Status Constants
export {
  LOGISTICS_VEHICLE_STATUS,
  logisticsVehicleStatusGetLabel,
  logisticsVehicleStatusGetCategory,
  logisticsVehicleStatusIsAvailable,
  logisticsVehicleStatusIsOperational,
  logisticsVehicleStatusIsUnderMaintenance,
  logisticsVehicleStatusCanTransition,
} from './vehicle-status.constants';

export type {
  LogisticsVehicleStatusType,
  LogisticsVehicleStatusCategory,
  LogisticsVehicleStatusColor,
  LogisticsVehicleStatusIcon,
  LogisticsVehicleStatusTransition,
} from './vehicle-status.constants';
