/**
 * Route Constants Index
 * Export all route constants and types for easy importing
 */

// Route Constants
export {
  LOGISTICS_ROUTE,
  logisticsRouteGetTypeLabel,
  logisticsRouteGetStatusLabel,
  logisticsRouteGetPriorityLabel,
  logisticsRouteGetDistance,
  logisticsRouteGetDuration,
  logisticsRouteGetConditionLabel,
  logisticsRouteGetBangladeshRouteLabel,
  logisticsRouteIsActive,
  logisticsRouteIsOperational,
} from './route.constants';

export type {
  LogisticsRouteType,
  LogisticsRouteStatus,
  LogisticsRoutePriority,
  LogisticsRouteCondition,
  LogisticsBangladeshRoute,
} from './route.constants';

// Route Status Constants
export {
  LOGISTICS_ROUTE_STATUS,
  logisticsRouteStatusGetLabel,
  logisticsRouteStatusGetCategory,
  logisticsRouteStatusIsOperational,
  logisticsRouteStatusIsAvailable,
  logisticsRouteStatusCanTransition,
} from './route-status.constants';

export type {
  LogisticsRouteStatusType,
  LogisticsRouteStatusCategory,
  LogisticsRouteStatusColor,
  LogisticsRouteStatusIcon,
  LogisticsRouteStatusTransition,
} from './route-status.constants';
