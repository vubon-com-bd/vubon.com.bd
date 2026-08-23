/**
 * Marketing Automation Action Constants
 * Action definitions for marketing automation
 */

export const MARKETINGAUTOMATION_ACTION = {
  // Action Types
  TYPES: {
    SEND_EMAIL: 'send_email',
    SEND_SMS: 'send_sms',
    SEND_PUSH: 'send_push',
    SEND_NOTIFICATION: 'send_notification',
    UPDATE_FIELD: 'update_field',
    CREATE_TASK: 'create_task',
    ASSIGN_USER: 'assign_user',
    ADD_TAG: 'add_tag',
    REMOVE_TAG: 'remove_tag',
    ADD_TO_SEGMENT: 'add_to_segment',
    REMOVE_FROM_SEGMENT: 'remove_from_segment',
    UPDATE_SCORE: 'update_score',
    APPLY_DISCOUNT: 'apply_discount',
    APPLY_COUPON: 'apply_coupon',
    CREATE_ORDER: 'create_order',
    UPDATE_ORDER: 'update_order',
    CANCEL_ORDER: 'cancel_order',
    SEND_INVOICE: 'send_invoice',
    GENERATE_REPORT: 'generate_report',
    WEBHOOK: 'webhook',
    API_CALL: 'api_call',
    CUSTOM: 'custom',
  } as const,

  // Action Categories
  CATEGORIES: {
    COMMUNICATION: 'communication',
    DATA: 'data',
    TASK: 'task',
    MARKETING: 'marketing',
    SALES: 'sales',
    OPERATIONAL: 'operational',
    INTEGRATION: 'integration',
  } as const,

  // Action Statuses
  STATUSES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    RETRY: 'retry',
  } as const,

  // Action Execution Orders
  EXECUTION_ORDERS: {
    SEQUENTIAL: 'sequential',
    PARALLEL: 'parallel',
    CONDITIONAL: 'conditional',
    DELAYED: 'delayed',
    PRIORITY: 'priority',
  } as const,

  // Action Delays
  DELAYS: {
    IMMEDIATE: 0,
    SECONDS_5: 5,
    SECONDS_10: 10,
    SECONDS_30: 30,
    MINUTE_1: 60,
    MINUTES_5: 300,
    MINUTES_10: 600,
    MINUTES_15: 900,
    MINUTES_30: 1800,
    HOURS_1: 3600,
    HOURS_2: 7200,
    HOURS_6: 21600,
    HOURS_12: 43200,
    DAYS_1: 86400,
    DAYS_2: 172800,
    DAYS_7: 604800,
    CUSTOM: 'custom',
  } as const,

  // Action Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'send_email',
    DEFAULT_CATEGORY: 'communication',
    DEFAULT_STATUS: 'pending',
    DEFAULT_EXECUTION_ORDER: 'sequential',
    DEFAULT_DELAY: 0,
    MAX_RETRY_ATTEMPTS: 3,
    MAX_ACTIONS_PER_STEP: 10,
    MAX_EMAIL_RECIPIENTS: 1000,
    MAX_SMS_RECIPIENTS: 1000,
    MAX_PUSH_RECIPIENTS: 10000,
    DEFAULT_TIMEOUT: 30000,
  } as const,
} as const;

// Action Types
export type MarketingAutomationActionType =
  (typeof MARKETINGAUTOMATION_ACTION.TYPES)[keyof typeof MARKETINGAUTOMATION_ACTION.TYPES];

// Action Categories
export type MarketingAutomationActionCategory =
  (typeof MARKETINGAUTOMATION_ACTION.CATEGORIES)[keyof typeof MARKETINGAUTOMATION_ACTION.CATEGORIES];

// Action Statuses
export type MarketingAutomationActionStatus =
  (typeof MARKETINGAUTOMATION_ACTION.STATUSES)[keyof typeof MARKETINGAUTOMATION_ACTION.STATUSES];

// Action Execution Orders
export type MarketingAutomationActionExecutionOrder =
  (typeof MARKETINGAUTOMATION_ACTION.EXECUTION_ORDERS)[keyof typeof MARKETINGAUTOMATION_ACTION.EXECUTION_ORDERS];

// Action Delays
export type MarketingAutomationActionDelay =
  (typeof MARKETINGAUTOMATION_ACTION.DELAYS)[keyof typeof MARKETINGAUTOMATION_ACTION.DELAYS];

// Action Defaults
export type MarketingAutomationActionDefault =
  (typeof MARKETINGAUTOMATION_ACTION.DEFAULTS)[keyof typeof MARKETINGAUTOMATION_ACTION.DEFAULTS];

// Utility Functions
export function marketingautomationGetActionTypeLabel(
  actionType: MarketingAutomationActionType
): string {
  const labels: Record<MarketingAutomationActionType, string> = {
    [MARKETINGAUTOMATION_ACTION.TYPES.SEND_EMAIL]: 'Send Email',
    [MARKETINGAUTOMATION_ACTION.TYPES.SEND_SMS]: 'Send SMS',
    [MARKETINGAUTOMATION_ACTION.TYPES.SEND_PUSH]: 'Send Push Notification',
    [MARKETINGAUTOMATION_ACTION.TYPES.SEND_NOTIFICATION]: 'Send Notification',
    [MARKETINGAUTOMATION_ACTION.TYPES.UPDATE_FIELD]: 'Update Field',
    [MARKETINGAUTOMATION_ACTION.TYPES.CREATE_TASK]: 'Create Task',
    [MARKETINGAUTOMATION_ACTION.TYPES.ASSIGN_USER]: 'Assign User',
    [MARKETINGAUTOMATION_ACTION.TYPES.ADD_TAG]: 'Add Tag',
    [MARKETINGAUTOMATION_ACTION.TYPES.REMOVE_TAG]: 'Remove Tag',
    [MARKETINGAUTOMATION_ACTION.TYPES.ADD_TO_SEGMENT]: 'Add to Segment',
    [MARKETINGAUTOMATION_ACTION.TYPES.REMOVE_FROM_SEGMENT]: 'Remove from Segment',
    [MARKETINGAUTOMATION_ACTION.TYPES.UPDATE_SCORE]: 'Update Score',
    [MARKETINGAUTOMATION_ACTION.TYPES.APPLY_DISCOUNT]: 'Apply Discount',
    [MARKETINGAUTOMATION_ACTION.TYPES.APPLY_COUPON]: 'Apply Coupon',
    [MARKETINGAUTOMATION_ACTION.TYPES.CREATE_ORDER]: 'Create Order',
    [MARKETINGAUTOMATION_ACTION.TYPES.UPDATE_ORDER]: 'Update Order',
    [MARKETINGAUTOMATION_ACTION.TYPES.CANCEL_ORDER]: 'Cancel Order',
    [MARKETINGAUTOMATION_ACTION.TYPES.SEND_INVOICE]: 'Send Invoice',
    [MARKETINGAUTOMATION_ACTION.TYPES.GENERATE_REPORT]: 'Generate Report',
    [MARKETINGAUTOMATION_ACTION.TYPES.WEBHOOK]: 'Webhook',
    [MARKETINGAUTOMATION_ACTION.TYPES.API_CALL]: 'API Call',
    [MARKETINGAUTOMATION_ACTION.TYPES.CUSTOM]: 'Custom Action',
  };
  return labels[actionType] || 'Unknown Action Type';
}

export function marketingautomationGetActionCategoryLabel(
  category: MarketingAutomationActionCategory
): string {
  const labels: Record<MarketingAutomationActionCategory, string> = {
    [MARKETINGAUTOMATION_ACTION.CATEGORIES.COMMUNICATION]: 'Communication',
    [MARKETINGAUTOMATION_ACTION.CATEGORIES.DATA]: 'Data',
    [MARKETINGAUTOMATION_ACTION.CATEGORIES.TASK]: 'Task',
    [MARKETINGAUTOMATION_ACTION.CATEGORIES.MARKETING]: 'Marketing',
    [MARKETINGAUTOMATION_ACTION.CATEGORIES.SALES]: 'Sales',
    [MARKETINGAUTOMATION_ACTION.CATEGORIES.OPERATIONAL]: 'Operational',
    [MARKETINGAUTOMATION_ACTION.CATEGORIES.INTEGRATION]: 'Integration',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingautomationGetActionStatusLabel(
  status: MarketingAutomationActionStatus
): string {
  const labels: Record<MarketingAutomationActionStatus, string> = {
    [MARKETINGAUTOMATION_ACTION.STATUSES.PENDING]: 'Pending',
    [MARKETINGAUTOMATION_ACTION.STATUSES.PROCESSING]: 'Processing',
    [MARKETINGAUTOMATION_ACTION.STATUSES.COMPLETED]: 'Completed',
    [MARKETINGAUTOMATION_ACTION.STATUSES.FAILED]: 'Failed',
    [MARKETINGAUTOMATION_ACTION.STATUSES.CANCELLED]: 'Cancelled',
    [MARKETINGAUTOMATION_ACTION.STATUSES.RETRY]: 'Retry',
  };
  return labels[status] || 'Unknown Status';
}

export function marketingautomationGetExecutionOrderLabel(
  order: MarketingAutomationActionExecutionOrder
): string {
  const labels: Record<MarketingAutomationActionExecutionOrder, string> = {
    [MARKETINGAUTOMATION_ACTION.EXECUTION_ORDERS.SEQUENTIAL]: 'Sequential',
    [MARKETINGAUTOMATION_ACTION.EXECUTION_ORDERS.PARALLEL]: 'Parallel',
    [MARKETINGAUTOMATION_ACTION.EXECUTION_ORDERS.CONDITIONAL]: 'Conditional',
    [MARKETINGAUTOMATION_ACTION.EXECUTION_ORDERS.DELAYED]: 'Delayed',
    [MARKETINGAUTOMATION_ACTION.EXECUTION_ORDERS.PRIORITY]: 'Priority',
  };
  return labels[order] || 'Unknown Execution Order';
}

export function marketingautomationGetDelayLabel(delay: MarketingAutomationActionDelay): string {
  const labels: Record<MarketingAutomationActionDelay, string> = {
    [MARKETINGAUTOMATION_ACTION.DELAYS.IMMEDIATE]: 'Immediate',
    [MARKETINGAUTOMATION_ACTION.DELAYS.SECONDS_5]: '5 Seconds',
    [MARKETINGAUTOMATION_ACTION.DELAYS.SECONDS_10]: '10 Seconds',
    [MARKETINGAUTOMATION_ACTION.DELAYS.SECONDS_30]: '30 Seconds',
    [MARKETINGAUTOMATION_ACTION.DELAYS.MINUTE_1]: '1 Minute',
    [MARKETINGAUTOMATION_ACTION.DELAYS.MINUTES_5]: '5 Minutes',
    [MARKETINGAUTOMATION_ACTION.DELAYS.MINUTES_10]: '10 Minutes',
    [MARKETINGAUTOMATION_ACTION.DELAYS.MINUTES_15]: '15 Minutes',
    [MARKETINGAUTOMATION_ACTION.DELAYS.MINUTES_30]: '30 Minutes',
    [MARKETINGAUTOMATION_ACTION.DELAYS.HOURS_1]: '1 Hour',
    [MARKETINGAUTOMATION_ACTION.DELAYS.HOURS_2]: '2 Hours',
    [MARKETINGAUTOMATION_ACTION.DELAYS.HOURS_6]: '6 Hours',
    [MARKETINGAUTOMATION_ACTION.DELAYS.HOURS_12]: '12 Hours',
    [MARKETINGAUTOMATION_ACTION.DELAYS.DAYS_1]: '1 Day',
    [MARKETINGAUTOMATION_ACTION.DELAYS.DAYS_2]: '2 Days',
    [MARKETINGAUTOMATION_ACTION.DELAYS.DAYS_7]: '7 Days',
    [MARKETINGAUTOMATION_ACTION.DELAYS.CUSTOM]: 'Custom Delay',
  };
  return labels[delay] || 'Unknown Delay';
}

export function marketingautomationIsCommunicationAction(
  category: MarketingAutomationActionCategory
): boolean {
  return category === MARKETINGAUTOMATION_ACTION.CATEGORIES.COMMUNICATION;
}

export function marketingautomationIsDataAction(
  category: MarketingAutomationActionCategory
): boolean {
  return category === MARKETINGAUTOMATION_ACTION.CATEGORIES.DATA;
}

export function marketingautomationIsTaskAction(
  category: MarketingAutomationActionCategory
): boolean {
  return category === MARKETINGAUTOMATION_ACTION.CATEGORIES.TASK;
}

export function marketingautomationIsMarketingAction(
  category: MarketingAutomationActionCategory
): boolean {
  return category === MARKETINGAUTOMATION_ACTION.CATEGORIES.MARKETING;
}

export function marketingautomationIsSalesAction(
  category: MarketingAutomationActionCategory
): boolean {
  return category === MARKETINGAUTOMATION_ACTION.CATEGORIES.SALES;
}

export function marketingautomationIsIntegrationAction(
  category: MarketingAutomationActionCategory
): boolean {
  return category === MARKETINGAUTOMATION_ACTION.CATEGORIES.INTEGRATION;
}

export function marketingautomationGetDefaultRetryAttempts(): number {
  return MARKETINGAUTOMATION_ACTION.DEFAULTS.MAX_RETRY_ATTEMPTS;
}

export function marketingautomationGetDefaultTimeout(): number {
  return MARKETINGAUTOMATION_ACTION.DEFAULTS.DEFAULT_TIMEOUT;
}
