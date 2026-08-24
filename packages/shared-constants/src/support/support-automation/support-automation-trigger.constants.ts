/**
 * Support Automation Trigger Constants
 * Trigger definitions for support automation
 */

export const SUPPORT_AUTOMATION_TRIGGER = {
  // Trigger Types
  TYPES: {
    EVENT: 'event',
    SCHEDULE: 'schedule',
    CONDITION: 'condition',
    MANUAL: 'manual',
    WEBHOOK: 'webhook',
  } as const,

  // Trigger Events
  EVENTS: {
    TICKET_CREATED: 'ticket_created',
    TICKET_UPDATED: 'ticket_updated',
    TICKET_STATUS_CHANGED: 'ticket_status_changed',
    TICKET_PRIORITY_CHANGED: 'ticket_priority_changed',
    TICKET_ASSIGNED: 'ticket_assigned',
    TICKET_ESCALATED: 'ticket_escalated',
    TICKET_RESOLVED: 'ticket_resolved',
    TICKET_CLOSED: 'ticket_closed',
    TICKET_REOPENED: 'ticket_reopened',
    TICKET_COMMENT_ADDED: 'ticket_comment_added',
    TICKET_TAG_ADDED: 'ticket_tag_added',
    TICKET_TAG_REMOVED: 'ticket_tag_removed',
    TICKET_MERGED: 'ticket_merged',
    TICKET_SPLIT: 'ticket_split',
    TICKET_TRANSFERRED: 'ticket_transferred',
  } as const,

  // Trigger Conditions
  CONDITIONS: {
    TICKET: 'ticket',
    USER: 'user',
    AGENT: 'agent',
    TIME: 'time',
    CUSTOM: 'custom',
  } as const,

  // Trigger Timing
  TIMING: {
    IMMEDIATE: 'immediate',
    DELAYED: 'delayed',
    SCHEDULED: 'scheduled',
    RECURRING: 'recurring',
  } as const,

  // Trigger Priorities
  PRIORITY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Trigger Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    ERROR: 'error',
  } as const,
} as const;

// Trigger Types
export type SupportAutomationTriggerType =
  (typeof SUPPORT_AUTOMATION_TRIGGER.TYPES)[keyof typeof SUPPORT_AUTOMATION_TRIGGER.TYPES];

// Trigger Events
export type SupportAutomationTriggerEvent =
  (typeof SUPPORT_AUTOMATION_TRIGGER.EVENTS)[keyof typeof SUPPORT_AUTOMATION_TRIGGER.EVENTS];

// Trigger Conditions
export type SupportAutomationTriggerCondition =
  (typeof SUPPORT_AUTOMATION_TRIGGER.CONDITIONS)[keyof typeof SUPPORT_AUTOMATION_TRIGGER.CONDITIONS];

// Trigger Timing
export type SupportAutomationTriggerTiming =
  (typeof SUPPORT_AUTOMATION_TRIGGER.TIMING)[keyof typeof SUPPORT_AUTOMATION_TRIGGER.TIMING];

// Trigger Priorities
export type SupportAutomationTriggerPriority =
  (typeof SUPPORT_AUTOMATION_TRIGGER.PRIORITY)[keyof typeof SUPPORT_AUTOMATION_TRIGGER.PRIORITY];

// Trigger Statuses
export type SupportAutomationTriggerStatus =
  (typeof SUPPORT_AUTOMATION_TRIGGER.STATUS)[keyof typeof SUPPORT_AUTOMATION_TRIGGER.STATUS];

// Utility Functions
export function supportAutomationTriggerGetTypeLabel(type: SupportAutomationTriggerType): string {
  const labels: Record<SupportAutomationTriggerType, string> = {
    [SUPPORT_AUTOMATION_TRIGGER.TYPES.EVENT]: 'Event',
    [SUPPORT_AUTOMATION_TRIGGER.TYPES.SCHEDULE]: 'Schedule',
    [SUPPORT_AUTOMATION_TRIGGER.TYPES.CONDITION]: 'Condition',
    [SUPPORT_AUTOMATION_TRIGGER.TYPES.MANUAL]: 'Manual',
    [SUPPORT_AUTOMATION_TRIGGER.TYPES.WEBHOOK]: 'Webhook',
  };
  return labels[type] || 'Unknown';
}

export function supportAutomationTriggerGetEventLabel(
  event: SupportAutomationTriggerEvent
): string {
  const labels: Record<SupportAutomationTriggerEvent, string> = {
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_CREATED]: 'Ticket Created',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_UPDATED]: 'Ticket Updated',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_STATUS_CHANGED]: 'Ticket Status Changed',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_PRIORITY_CHANGED]: 'Ticket Priority Changed',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_ASSIGNED]: 'Ticket Assigned',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_ESCALATED]: 'Ticket Escalated',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_RESOLVED]: 'Ticket Resolved',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_CLOSED]: 'Ticket Closed',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_REOPENED]: 'Ticket Reopened',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_COMMENT_ADDED]: 'Ticket Comment Added',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_TAG_ADDED]: 'Ticket Tag Added',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_TAG_REMOVED]: 'Ticket Tag Removed',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_MERGED]: 'Ticket Merged',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_SPLIT]: 'Ticket Split',
    [SUPPORT_AUTOMATION_TRIGGER.EVENTS.TICKET_TRANSFERRED]: 'Ticket Transferred',
  };
  return labels[event] || 'Unknown';
}

export function supportAutomationTriggerIsActive(status: SupportAutomationTriggerStatus): boolean {
  return status === SUPPORT_AUTOMATION_TRIGGER.STATUS.ACTIVE;
}

export function supportAutomationTriggerGetPriorityLabel(
  priority: SupportAutomationTriggerPriority
): string {
  const labels: Record<SupportAutomationTriggerPriority, string> = {
    [SUPPORT_AUTOMATION_TRIGGER.PRIORITY.HIGH]: 'High',
    [SUPPORT_AUTOMATION_TRIGGER.PRIORITY.MEDIUM]: 'Medium',
    [SUPPORT_AUTOMATION_TRIGGER.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function supportAutomationTriggerGetTimingLabel(
  timing: SupportAutomationTriggerTiming
): string {
  const labels: Record<SupportAutomationTriggerTiming, string> = {
    [SUPPORT_AUTOMATION_TRIGGER.TIMING.IMMEDIATE]: 'Immediate',
    [SUPPORT_AUTOMATION_TRIGGER.TIMING.DELAYED]: 'Delayed',
    [SUPPORT_AUTOMATION_TRIGGER.TIMING.SCHEDULED]: 'Scheduled',
    [SUPPORT_AUTOMATION_TRIGGER.TIMING.RECURRING]: 'Recurring',
  };
  return labels[timing] || 'Unknown';
}
