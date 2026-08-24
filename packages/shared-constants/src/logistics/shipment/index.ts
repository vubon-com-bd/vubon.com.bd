/**
 * Shipment Constants Index
 * Export all shipment constants and types for easy importing
 */

// Shipment Constants
export {
  LOGISTICS_SHIPMENT,
  logisticsShipmentGetTypeLabel,
  logisticsShipmentGetStatusLabel,
  logisticsShipmentGetPriorityLabel,
  logisticsShipmentGetMethodLabel,
  logisticsShipmentGetPackagingLabel,
  logisticsShipmentIsDelivered,
  logisticsShipmentIsInTransit,
  logisticsShipmentIsFailed,
  logisticsShipmentGetReturnReasonLabel,
  logisticsShipmentGetMaxWeight,
} from './shipment.constants';

export type {
  LogisticsShipmentType,
  LogisticsShipmentStatus,
  LogisticsShipmentPriority,
  LogisticsShipmentMethod,
  LogisticsShipmentPackaging,
  LogisticsShipmentReturnReason,
} from './shipment.constants';

// Shipment Status Constants
export {
  LOGISTICS_SHIPMENT_STATUS,
  logisticsShipmentStatusGetLabel,
  logisticsShipmentStatusGetCategory,
  logisticsShipmentStatusIsActive,
  logisticsShipmentStatusIsComplete,
  logisticsShipmentStatusCanTransition,
} from './shipment-status.constants';

export type {
  LogisticsShipmentStatusType,
  LogisticsShipmentStatusCategory,
  LogisticsShipmentStatusColor,
  LogisticsShipmentStatusIcon,
  LogisticsShipmentStatusTransition,
} from './shipment-status.constants';

// Shipment Type Constants
export {
  LOGISTICS_SHIPMENT_TYPE,
  logisticsShipmentTypeGetLabel,
  logisticsShipmentTypeGetCategory,
  logisticsShipmentTypeGetIcon,
  logisticsShipmentTypeGetWeightLimit,
  logisticsShipmentTypeGetSizeLimit,
} from './shipment-type.constants';

export type {
  LogisticsShipmentTypeType,
  LogisticsShipmentTypeCategory,
  LogisticsShipmentTypeIcon,
  LogisticsShipmentTypeColor,
} from './shipment-type.constants';

// Shipment Priority Constants
export {
  LOGISTICS_SHIPMENT_PRIORITY,
  logisticsShipmentPriorityGetLabel,
  logisticsShipmentPriorityGetLevel,
  logisticsShipmentPriorityGetDeliveryTime,
  logisticsShipmentPriorityGetPriceMultiplier,
  logisticsShipmentPriorityGetColor,
  logisticsShipmentPriorityGetIcon,
  logisticsShipmentPriorityIsUrgent,
  logisticsShipmentPriorityIsExpress,
} from './shipment-priority.constants';

export type {
  LogisticsShipmentPriorityType,
  LogisticsShipmentPriorityLevel,
  LogisticsShipmentPriorityColor,
  LogisticsShipmentPriorityIcon,
} from './shipment-priority.constants';
