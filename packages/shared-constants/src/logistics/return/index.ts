/**
 * Return Shipment Constants Index
 * Export all return shipment constants and types for easy importing
 */

// Return Shipment Constants
export {
  LOGISTICS_RETURN_SHIPMENT,
  logisticsReturnShipmentGetTypeLabel,
  logisticsReturnShipmentGetStatusLabel,
  logisticsReturnShipmentGetPriorityLabel,
  logisticsReturnShipmentGetMethodLabel,
  logisticsReturnShipmentIsCompleted,
  logisticsReturnShipmentIsInProgress,
  logisticsReturnShipmentIsRejected,
  logisticsReturnShipmentGetTimeWindow,
} from './return-shipment.constants';

export type {
  LogisticsReturnShipmentType,
  LogisticsReturnShipmentStatus,
  LogisticsReturnShipmentPriority,
  LogisticsReturnShipmentMethod,
} from './return-shipment.constants';

// Return Shipment Status Constants
export {
  LOGISTICS_RETURN_SHIPMENT_STATUS,
  logisticsReturnShipmentStatusGetLabel,
  logisticsReturnShipmentStatusGetCategory,
  logisticsReturnShipmentStatusIsComplete,
  logisticsReturnShipmentStatusIsActive,
  logisticsReturnShipmentStatusCanTransition,
} from './return-shipment-status.constants';

export type {
  LogisticsReturnShipmentStatusType,
  LogisticsReturnShipmentStatusCategory,
  LogisticsReturnShipmentStatusColor,
  LogisticsReturnShipmentStatusIcon,
  LogisticsReturnShipmentStatusTransition,
} from './return-shipment-status.constants';

// Return Reason Constants
export {
  LOGISTICS_RETURN_REASON,
  logisticsReturnReasonGetLabel,
  logisticsReturnReasonGetBanglaLabel,
  logisticsReturnReasonGetCategory,
  logisticsReturnReasonGetPriority,
  logisticsReturnReasonIsProductIssue,
} from './return-reason.constants';

export type {
  LogisticsReturnReason,
  LogisticsReturnReasonCategory,
  LogisticsReturnReasonType,
  LogisticsReturnReasonSeverity,
} from './return-reason.constants';

// Return Reason Type Constants
export {
  LOGISTICS_RETURN_REASON_TYPE,
  logisticsReturnReasonTypeGetLabel,
  logisticsReturnReasonTypeGetIcon,
  logisticsReturnReasonTypeGetColor,
  logisticsReturnReasonTypeGetComplexity,
  logisticsReturnReasonTypeGetResolutionTime,
  logisticsReturnReasonTypeNeedsApproval,
} from './return-reason-type.constants';

export type {
  LogisticsReturnReasonTypeCategory,
  LogisticsReturnReasonTypeIcon,
  LogisticsReturnReasonTypeColor,
} from './return-reason-type.constants';
