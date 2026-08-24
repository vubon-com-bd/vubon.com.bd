/**
 * Tracking Constants Index
 * Export all tracking constants and types for easy importing
 */

// Tracking Constants
export {
  LOGISTICS_TRACKING,
  logisticsTrackingGetTypeLabel,
  logisticsTrackingGetStatusLabel,
  logisticsTrackingGetProviderLabel,
  logisticsTrackingGetProviderURL,
  logisticsTrackingIsDelivered,
  logisticsTrackingIsInTransit,
  logisticsTrackingIsComplete,
  logisticsTrackingIsFailed,
  logisticsTrackingGetEventLabel,
} from './tracking.constants';

export type {
  LogisticsTrackingType,
  LogisticsTrackingStatus,
  LogisticsTrackingEvent,
  LogisticsTrackingEventType,
  LogisticsTrackingProvider,
} from './tracking.constants';

// Tracking Status Constants
export {
  LOGISTICS_TRACKING_STATUS,
  logisticsTrackingStatusGetLabel,
  logisticsTrackingStatusGetCategory,
  logisticsTrackingStatusIsActive,
  logisticsTrackingStatusIsComplete,
  logisticsTrackingStatusCanTransition,
} from './tracking-status.constants';

export type {
  LogisticsTrackingStatusType,
  LogisticsTrackingStatusCategory,
  LogisticsTrackingStatusColor,
  LogisticsTrackingStatusIcon,
  LogisticsTrackingStatusTransition,
} from './tracking-status.constants';

// Tracking Event Constants
export {
  LOGISTICS_TRACKING_EVENT,
  logisticsTrackingEventGetLabel,
  logisticsTrackingEventGetCategory,
  logisticsTrackingEventGetSeverity,
  logisticsTrackingEventGetColor,
  logisticsTrackingEventGetIcon,
  logisticsTrackingEventGetDescription,
} from './tracking-event.constants';

export type {
  LogisticsTrackingEventType as LogisticsTrackingEventTypeType,
  LogisticsTrackingEventCategory,
  LogisticsTrackingEventSeverity,
  LogisticsTrackingEventColor,
  LogisticsTrackingEventIcon,
} from './tracking-event.constants';

// Tracking Event Type Constants
export {
  LOGISTICS_TRACKING_EVENT_TYPE,
  logisticsTrackingEventTypeGetCategoryLabel,
  logisticsTrackingEventTypeGetSeverityLabel,
  logisticsTrackingEventTypeGetPriorityLabel,
  logisticsTrackingEventTypeGetVisibilityLabel,
  logisticsTrackingEventTypeGetTriggerLabel,
  logisticsTrackingEventTypeGetLifecycleLabel,
} from './tracking-event-type.constants';

export type {
  LogisticsTrackingEventTypeCategory,
  LogisticsTrackingEventTypeSeverity,
  LogisticsTrackingEventTypePriority,
  LogisticsTrackingEventTypeVisibility,
  LogisticsTrackingEventTypeTrigger,
  LogisticsTrackingEventTypeLifecycle,
} from './tracking-event-type.constants';
