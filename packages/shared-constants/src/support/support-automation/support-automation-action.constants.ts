/**
 * Support Automation Action Constants
 * Action definitions for support automation
 */

export const SUPPORT_AUTOMATION_ACTION = {
  // Action Types
  TYPES: {
    TICKET: 'ticket',
    NOTIFICATION: 'notification',
    ASSIGNMENT: 'assignment',
    ESCALATION: 'escalation',
    SLA: 'sla',
    EMAIL: 'email',
    WEBHOOK: 'webhook',
    CUSTOM: 'custom',
  } as const,

  // Ticket Actions
  TICKET_ACTIONS: {
    UPDATE_STATUS: 'update_status',
    UPDATE_PRIORITY: 'update_priority',
    UPDATE_CATEGORY: 'update_category',
    UPDATE_ASSIGNEE: 'update_assignee',
    ADD_TAG: 'add_tag',
    REMOVE_TAG: 'remove_tag',
    ADD_COMMENT: 'add_comment',
    ADD_INTERNAL_NOTE: 'add_internal_note',
    CLOSE_TICKET: 'close_ticket',
    REOPEN_TICKET: 'reopen_ticket',
    MERGE_TICKET: 'merge_ticket',
    SPLIT_TICKET: 'split_ticket',
    TRANSFER_TICKET: 'transfer_ticket',
    ESCALATE_TICKET: 'escalate_ticket',
  } as const,

  // Notification Actions
  NOTIFICATION_ACTIONS: {
    SEND_EMAIL: 'send_email',
    SEND_SMS: 'send_sms',
    SEND_PUSH: 'send_push',
    SEND_IN_APP: 'send_in_app',
    SEND_SLACK: 'send_slack',
    SEND_TEAMS: 'send_teams',
  } as const,

  // Action Timing
  TIMING: {
    IMMEDIATE: 'immediate',
    DELAYED: 'delayed',
    SCHEDULED: 'scheduled',
  } as const,

  // Action Statuses
  STATUS: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,

  // Action Priorities
  PRIORITY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Action Execution
  EXECUTION: {
    SYNC: 'sync',
    ASYNC: 'async',
    BATCH: 'batch',
  } as const,
} as const;

// Action Types
export type SupportAutomationActionType =
  (typeof SUPPORT_AUTOMATION_ACTION.TYPES)[keyof typeof SUPPORT_AUTOMATION_ACTION.TYPES];

// Ticket Actions
export type SupportAutomationTicketAction =
  (typeof SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS)[keyof typeof SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS];

// Notification Actions
export type SupportAutomationNotificationAction =
  (typeof SUPPORT_AUTOMATION_ACTION.NOTIFICATION_ACTIONS)[keyof typeof SUPPORT_AUTOMATION_ACTION.NOTIFICATION_ACTIONS];

// Action Timing
export type SupportAutomationActionTiming =
  (typeof SUPPORT_AUTOMATION_ACTION.TIMING)[keyof typeof SUPPORT_AUTOMATION_ACTION.TIMING];

// Action Statuses
export type SupportAutomationActionStatus =
  (typeof SUPPORT_AUTOMATION_ACTION.STATUS)[keyof typeof SUPPORT_AUTOMATION_ACTION.STATUS];

// Action Priorities
export type SupportAutomationActionPriority =
  (typeof SUPPORT_AUTOMATION_ACTION.PRIORITY)[keyof typeof SUPPORT_AUTOMATION_ACTION.PRIORITY];

// Action Execution
export type SupportAutomationActionExecution =
  (typeof SUPPORT_AUTOMATION_ACTION.EXECUTION)[keyof typeof SUPPORT_AUTOMATION_ACTION.EXECUTION];

// Utility Functions
export function supportAutomationActionGetTypeLabel(type: SupportAutomationActionType): string {
  const labels: Record<SupportAutomationActionType, string> = {
    [SUPPORT_AUTOMATION_ACTION.TYPES.TICKET]: 'Ticket',
    [SUPPORT_AUTOMATION_ACTION.TYPES.NOTIFICATION]: 'Notification',
    [SUPPORT_AUTOMATION_ACTION.TYPES.ASSIGNMENT]: 'Assignment',
    [SUPPORT_AUTOMATION_ACTION.TYPES.ESCALATION]: 'Escalation',
    [SUPPORT_AUTOMATION_ACTION.TYPES.SLA]: 'SLA',
    [SUPPORT_AUTOMATION_ACTION.TYPES.EMAIL]: 'Email',
    [SUPPORT_AUTOMATION_ACTION.TYPES.WEBHOOK]: 'Webhook',
    [SUPPORT_AUTOMATION_ACTION.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown';
}

export function supportAutomationActionGetTicketActionLabel(
  action: SupportAutomationTicketAction
): string {
  const labels: Record<SupportAutomationTicketAction, string> = {
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.UPDATE_STATUS]: 'Update Status',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.UPDATE_PRIORITY]: 'Update Priority',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.UPDATE_CATEGORY]: 'Update Category',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.UPDATE_ASSIGNEE]: 'Update Assignee',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.ADD_TAG]: 'Add Tag',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.REMOVE_TAG]: 'Remove Tag',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.ADD_COMMENT]: 'Add Comment',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.ADD_INTERNAL_NOTE]: 'Add Internal Note',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.CLOSE_TICKET]: 'Close Ticket',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.REOPEN_TICKET]: 'Reopen Ticket',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.MERGE_TICKET]: 'Merge Ticket',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.SPLIT_TICKET]: 'Split Ticket',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.TRANSFER_TICKET]: 'Transfer Ticket',
    [SUPPORT_AUTOMATION_ACTION.TICKET_ACTIONS.ESCALATE_TICKET]: 'Escalate Ticket',
  };
  return labels[action] || 'Unknown';
}

export function supportAutomationActionGetNotificationActionLabel(
  action: SupportAutomationNotificationAction
): string {
  const labels: Record<SupportAutomationNotificationAction, string> = {
    [SUPPORT_AUTOMATION_ACTION.NOTIFICATION_ACTIONS.SEND_EMAIL]: 'Send Email',
    [SUPPORT_AUTOMATION_ACTION.NOTIFICATION_ACTIONS.SEND_SMS]: 'Send SMS',
    [SUPPORT_AUTOMATION_ACTION.NOTIFICATION_ACTIONS.SEND_PUSH]: 'Send Push',
    [SUPPORT_AUTOMATION_ACTION.NOTIFICATION_ACTIONS.SEND_IN_APP]: 'Send In-App',
    [SUPPORT_AUTOMATION_ACTION.NOTIFICATION_ACTIONS.SEND_SLACK]: 'Send Slack',
    [SUPPORT_AUTOMATION_ACTION.NOTIFICATION_ACTIONS.SEND_TEAMS]: 'Send Teams',
  };
  return labels[action] || 'Unknown';
}

export function supportAutomationActionIsCompleted(status: SupportAutomationActionStatus): boolean {
  return status === SUPPORT_AUTOMATION_ACTION.STATUS.COMPLETED;
}

export function supportAutomationActionIsFailed(status: SupportAutomationActionStatus): boolean {
  return status === SUPPORT_AUTOMATION_ACTION.STATUS.FAILED;
}

export function supportAutomationActionIsPending(status: SupportAutomationActionStatus): boolean {
  return (
    status === SUPPORT_AUTOMATION_ACTION.STATUS.PENDING ||
    status === SUPPORT_AUTOMATION_ACTION.STATUS.IN_PROGRESS
  );
}
