/**
 * Dispatch Constants Index
 * Export all dispatch constants and types for easy importing
 */

// Dispatch Constants
export {
  LOGISTICS_DISPATCH,
  logisticsDispatchGetTypeLabel,
  logisticsDispatchGetStatusLabel,
  logisticsDispatchGetMethodLabel,
  logisticsDispatchGetPriorityLabel,
  logisticsDispatchGetTimeEstimate,
  logisticsDispatchIsComplete,
  logisticsDispatchIsInTransit,
  logisticsDispatchGetWindowLabel,
  logisticsDispatchGetWindowHours,
} from './dispatch.constants';

export type {
  LogisticsDispatchType,
  LogisticsDispatchStatus,
  LogisticsDispatchMethod,
  LogisticsDispatchPriority,
  LogisticsDispatchWindow,
} from './dispatch.constants';

// Dispatch Status Constants
export {
  LOGISTICS_DISPATCH_STATUS,
  logisticsDispatchStatusGetLabel,
  logisticsDispatchStatusGetCategory,
  logisticsDispatchStatusIsActive,
  logisticsDispatchStatusIsComplete,
  logisticsDispatchStatusCanTransition,
} from './dispatch-status.constants';

export type {
  LogisticsDispatchStatusType,
  LogisticsDispatchStatusCategory,
  LogisticsDispatchStatusColor,
  LogisticsDispatchStatusIcon,
  LogisticsDispatchStatusTransition,
} from './dispatch-status.constants';
