/**
 * Fulfillment Constants Index
 * Export all fulfillment constants and types for easy importing
 */

// Fulfillment Constants
export {
  LOGISTICS_FULFILLMENT,
  logisticsFulfillmentGetTypeLabel,
  logisticsFulfillmentGetStatusLabel,
  logisticsFulfillmentGetMethodLabel,
  logisticsFulfillmentGetPriorityLabel,
  logisticsFulfillmentGetTimeEstimate,
  logisticsFulfillmentIsComplete,
  logisticsFulfillmentIsInProgress,
  logisticsFulfillmentGetCenterLabel,
} from './fulfillment.constants';

export type {
  LogisticsFulfillmentType,
  LogisticsFulfillmentStatus,
  LogisticsFulfillmentMethod,
  LogisticsFulfillmentPriority,
  LogisticsFulfillmentCenter,
} from './fulfillment.constants';

// Fulfillment Status Constants
export {
  LOGISTICS_FULFILLMENT_STATUS,
  logisticsFulfillmentStatusGetLabel,
  logisticsFulfillmentStatusGetCategory,
  logisticsFulfillmentStatusIsComplete,
  logisticsFulfillmentStatusIsInProgress,
  logisticsFulfillmentStatusCanTransition,
} from './fulfillment-status.constants';

export type {
  LogisticsFulfillmentStatusType,
  LogisticsFulfillmentStatusCategory,
  LogisticsFulfillmentStatusColor,
  LogisticsFulfillmentStatusIcon,
  LogisticsFulfillmentStatusTransition,
} from './fulfillment-status.constants';

// Fulfillment Type Constants
export {
  LOGISTICS_FULFILLMENT_TYPE,
  logisticsFulfillmentTypeGetLabel,
  logisticsFulfillmentTypeGetIcon,
  logisticsFulfillmentTypeGetColor,
  logisticsFulfillmentTypeGetPriority,
  logisticsFulfillmentTypeGetTimeWindow,
  logisticsFulfillmentTypeGetPriceMultiplier,
} from './fulfillment-type.constants';

export type {
  LogisticsFulfillmentTypeCategory,
  LogisticsFulfillmentTypeIcon,
  LogisticsFulfillmentTypeColor,
} from './fulfillment-type.constants';
