/**
 * Tracking Event Type Constants
 * Types of tracking events
 */

export const LOGISTICS_TRACKING_EVENT_TYPE = {
  // Event Categories
  CATEGORIES: {
    BOOKING: 'booking',
    PICKUP: 'pickup',
    PROCESSING: 'processing',
    TRANSPORT: 'transport',
    DELIVERY: 'delivery',
    EXCEPTION: 'exception',
    RETURN: 'return',
  } as const,

  // Event Severities
  SEVERITIES: {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
  } as const,

  // Event Priorities
  PRIORITIES: {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  } as const,

  // Event Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    INTERNAL: 'internal',
  } as const,

  // Event Triggers
  TRIGGERS: {
    SYSTEM: 'system',
    USER: 'user',
    COURIER: 'courier',
    AUTOMATED: 'automated',
  } as const,

  // Event Lifecycle
  LIFECYCLE: {
    PENDING: 'pending',
    PROCESSED: 'processed',
    COMPLETED: 'completed',
    FAILED: 'failed',
  } as const,
} as const;

// Event Categories
export type LogisticsTrackingEventTypeCategory =
  (typeof LOGISTICS_TRACKING_EVENT_TYPE.CATEGORIES)[keyof typeof LOGISTICS_TRACKING_EVENT_TYPE.CATEGORIES];

// Event Severities
export type LogisticsTrackingEventTypeSeverity =
  (typeof LOGISTICS_TRACKING_EVENT_TYPE.SEVERITIES)[keyof typeof LOGISTICS_TRACKING_EVENT_TYPE.SEVERITIES];

// Event Priorities
export type LogisticsTrackingEventTypePriority =
  (typeof LOGISTICS_TRACKING_EVENT_TYPE.PRIORITIES)[keyof typeof LOGISTICS_TRACKING_EVENT_TYPE.PRIORITIES];

// Event Visibility
export type LogisticsTrackingEventTypeVisibility =
  (typeof LOGISTICS_TRACKING_EVENT_TYPE.VISIBILITY)[keyof typeof LOGISTICS_TRACKING_EVENT_TYPE.VISIBILITY];

// Event Triggers
export type LogisticsTrackingEventTypeTrigger =
  (typeof LOGISTICS_TRACKING_EVENT_TYPE.TRIGGERS)[keyof typeof LOGISTICS_TRACKING_EVENT_TYPE.TRIGGERS];

// Event Lifecycle
export type LogisticsTrackingEventTypeLifecycle =
  (typeof LOGISTICS_TRACKING_EVENT_TYPE.LIFECYCLE)[keyof typeof LOGISTICS_TRACKING_EVENT_TYPE.LIFECYCLE];

// Utility Functions
export function logisticsTrackingEventTypeGetCategoryLabel(
  category: LogisticsTrackingEventTypeCategory
): string {
  const labels: Record<LogisticsTrackingEventTypeCategory, string> = {
    [LOGISTICS_TRACKING_EVENT_TYPE.CATEGORIES.BOOKING]: 'Booking',
    [LOGISTICS_TRACKING_EVENT_TYPE.CATEGORIES.PICKUP]: 'Pickup',
    [LOGISTICS_TRACKING_EVENT_TYPE.CATEGORIES.PROCESSING]: 'Processing',
    [LOGISTICS_TRACKING_EVENT_TYPE.CATEGORIES.TRANSPORT]: 'Transport',
    [LOGISTICS_TRACKING_EVENT_TYPE.CATEGORIES.DELIVERY]: 'Delivery',
    [LOGISTICS_TRACKING_EVENT_TYPE.CATEGORIES.EXCEPTION]: 'Exception',
    [LOGISTICS_TRACKING_EVENT_TYPE.CATEGORIES.RETURN]: 'Return',
  };
  return labels[category] || 'Unknown';
}

export function logisticsTrackingEventTypeGetSeverityLabel(
  severity: LogisticsTrackingEventTypeSeverity
): string {
  const labels: Record<LogisticsTrackingEventTypeSeverity, string> = {
    [LOGISTICS_TRACKING_EVENT_TYPE.SEVERITIES.INFO]: 'Info',
    [LOGISTICS_TRACKING_EVENT_TYPE.SEVERITIES.SUCCESS]: 'Success',
    [LOGISTICS_TRACKING_EVENT_TYPE.SEVERITIES.WARNING]: 'Warning',
    [LOGISTICS_TRACKING_EVENT_TYPE.SEVERITIES.ERROR]: 'Error',
    [LOGISTICS_TRACKING_EVENT_TYPE.SEVERITIES.CRITICAL]: 'Critical',
  };
  return labels[severity] || 'Unknown';
}

export function logisticsTrackingEventTypeGetPriorityLabel(
  priority: LogisticsTrackingEventTypePriority
): string {
  const labels: Record<LogisticsTrackingEventTypePriority, string> = {
    [LOGISTICS_TRACKING_EVENT_TYPE.PRIORITIES.HIGH]: 'High',
    [LOGISTICS_TRACKING_EVENT_TYPE.PRIORITIES.MEDIUM]: 'Medium',
    [LOGISTICS_TRACKING_EVENT_TYPE.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function logisticsTrackingEventTypeGetVisibilityLabel(
  visibility: LogisticsTrackingEventTypeVisibility
): string {
  const labels: Record<LogisticsTrackingEventTypeVisibility, string> = {
    [LOGISTICS_TRACKING_EVENT_TYPE.VISIBILITY.PUBLIC]: 'Public',
    [LOGISTICS_TRACKING_EVENT_TYPE.VISIBILITY.PRIVATE]: 'Private',
    [LOGISTICS_TRACKING_EVENT_TYPE.VISIBILITY.INTERNAL]: 'Internal',
  };
  return labels[visibility] || 'Unknown';
}

export function logisticsTrackingEventTypeGetTriggerLabel(
  trigger: LogisticsTrackingEventTypeTrigger
): string {
  const labels: Record<LogisticsTrackingEventTypeTrigger, string> = {
    [LOGISTICS_TRACKING_EVENT_TYPE.TRIGGERS.SYSTEM]: 'System',
    [LOGISTICS_TRACKING_EVENT_TYPE.TRIGGERS.USER]: 'User',
    [LOGISTICS_TRACKING_EVENT_TYPE.TRIGGERS.COURIER]: 'Courier',
    [LOGISTICS_TRACKING_EVENT_TYPE.TRIGGERS.AUTOMATED]: 'Automated',
  };
  return labels[trigger] || 'Unknown';
}

export function logisticsTrackingEventTypeGetLifecycleLabel(
  lifecycle: LogisticsTrackingEventTypeLifecycle
): string {
  const labels: Record<LogisticsTrackingEventTypeLifecycle, string> = {
    [LOGISTICS_TRACKING_EVENT_TYPE.LIFECYCLE.PENDING]: 'Pending',
    [LOGISTICS_TRACKING_EVENT_TYPE.LIFECYCLE.PROCESSED]: 'Processed',
    [LOGISTICS_TRACKING_EVENT_TYPE.LIFECYCLE.COMPLETED]: 'Completed',
    [LOGISTICS_TRACKING_EVENT_TYPE.LIFECYCLE.FAILED]: 'Failed',
  };
  return labels[lifecycle] || 'Unknown';
}
