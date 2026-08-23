/**
 * Marketing Automation Trigger Constants
 * Trigger definitions for marketing automation
 */

export const MARKETINGAUTOMATION_TRIGGER = {
  // Trigger Types
  TYPES: {
    EVENT: 'event',
    TIME: 'time',
    CONDITION: 'condition',
    SCHEDULE: 'schedule',
    API: 'api',
    WEBHOOK: 'webhook',
    CUSTOM: 'custom',
  } as const,

  // Event Triggers
  EVENTS: {
    // User Events
    USER_REGISTERED: 'user_registered',
    USER_LOGGED_IN: 'user_logged_in',
    USER_LOGGED_OUT: 'user_logged_out',
    USER_VIEWED_PRODUCT: 'user_viewed_product',
    USER_ADDED_TO_CART: 'user_added_to_cart',
    USER_REMOVED_FROM_CART: 'user_removed_from_cart',
    USER_CHECKOUT: 'user_checkout',
    USER_PURCHASED: 'user_purchased',
    USER_REFUNDED: 'user_refunded',
    USER_REVIEWED: 'user_reviewed',
    USER_SUBSCRIBED: 'user_subscribed',
    USER_UNSUBSCRIBED: 'user_unsubscribed',
    USER_ABANDONED_CART: 'user_abandoned_cart',
    USER_BROWSED_PRODUCT: 'user_browsed_product',
    USER_SEARCHED_QUERY: 'user_searched_query',

    // Order Events
    ORDER_CREATED: 'order_created',
    ORDER_UPDATED: 'order_updated',
    ORDER_CANCELLED: 'order_cancelled',
    ORDER_COMPLETED: 'order_completed',
    ORDER_SHIPPED: 'order_shipped',
    ORDER_DELIVERED: 'order_delivered',

    // Payment Events
    PAYMENT_SUCCESSFUL: 'payment_successful',
    PAYMENT_FAILED: 'payment_failed',
    PAYMENT_REFUNDED: 'payment_refunded',

    // Lead Events
    LEAD_CREATED: 'lead_created',
    LEAD_UPDATED: 'lead_updated',
    LEAD_CONVERTED: 'lead_converted',
    LEAD_SCORED: 'lead_scored',

    // Campaign Events
    CAMPAIGN_STARTED: 'campaign_started',
    CAMPAIGN_ENDED: 'campaign_ended',
    CAMPAIGN_PAUSED: 'campaign_paused',

    // Custom Events
    CUSTOM: 'custom',
  } as const,

  // Time Triggers
  TIME_TYPES: {
    DATE: 'date',
    TIME: 'time',
    DAY_OF_WEEK: 'day_of_week',
    DAY_OF_MONTH: 'day_of_month',
    MONTH: 'month',
    YEAR: 'year',
    INTERVAL: 'interval',
    CUSTOM: 'custom',
  } as const,

  // Condition Types
  CONDITION_TYPES: {
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    CONTAINS: 'contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'not_in',
    IS_TRUE: 'is_true',
    IS_FALSE: 'is_false',
    IS_NULL: 'is_null',
    IS_NOT_NULL: 'is_not_null',
  } as const,

  // Trigger Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    FAILED: 'failed',
    COMPLETED: 'completed',
  } as const,

  // Trigger Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'event',
    DEFAULT_EVENT: 'user_registered',
    DEFAULT_TIME_TYPE: 'date',
    DEFAULT_CONDITION_TYPE: 'equals',
    DEFAULT_STATUS: 'active',
    MAX_CONDITIONS_PER_TRIGGER: 10,
    MAX_TRIGGERS_PER_AUTOMATION: 20,
    DEFAULT_COOLDOWN_MINUTES: 60,
    MAX_COOLDOWN_MINUTES: 1440,
  } as const,
} as const;

// Trigger Types
export type MarketingAutomationTriggerType =
  (typeof MARKETINGAUTOMATION_TRIGGER.TYPES)[keyof typeof MARKETINGAUTOMATION_TRIGGER.TYPES];

// Event Triggers
export type MarketingAutomationEvent =
  (typeof MARKETINGAUTOMATION_TRIGGER.EVENTS)[keyof typeof MARKETINGAUTOMATION_TRIGGER.EVENTS];

// Time Types
export type MarketingAutomationTimeType =
  (typeof MARKETINGAUTOMATION_TRIGGER.TIME_TYPES)[keyof typeof MARKETINGAUTOMATION_TRIGGER.TIME_TYPES];

// Condition Types
export type MarketingAutomationConditionType =
  (typeof MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES)[keyof typeof MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES];

// Trigger Statuses
export type MarketingAutomationTriggerStatus =
  (typeof MARKETINGAUTOMATION_TRIGGER.STATUSES)[keyof typeof MARKETINGAUTOMATION_TRIGGER.STATUSES];

// Trigger Defaults
export type MarketingAutomationTriggerDefault =
  (typeof MARKETINGAUTOMATION_TRIGGER.DEFAULTS)[keyof typeof MARKETINGAUTOMATION_TRIGGER.DEFAULTS];

// Utility Functions
export function marketingautomationGetTriggerTypeLabel(
  type: MarketingAutomationTriggerType
): string {
  const labels: Record<MarketingAutomationTriggerType, string> = {
    [MARKETINGAUTOMATION_TRIGGER.TYPES.EVENT]: 'Event Trigger',
    [MARKETINGAUTOMATION_TRIGGER.TYPES.TIME]: 'Time Trigger',
    [MARKETINGAUTOMATION_TRIGGER.TYPES.CONDITION]: 'Condition Trigger',
    [MARKETINGAUTOMATION_TRIGGER.TYPES.SCHEDULE]: 'Schedule Trigger',
    [MARKETINGAUTOMATION_TRIGGER.TYPES.API]: 'API Trigger',
    [MARKETINGAUTOMATION_TRIGGER.TYPES.WEBHOOK]: 'Webhook Trigger',
    [MARKETINGAUTOMATION_TRIGGER.TYPES.CUSTOM]: 'Custom Trigger',
  };
  return labels[type] || 'Unknown Trigger Type';
}

export function marketingautomationGetEventLabel(event: MarketingAutomationEvent): string {
  const labels: Record<MarketingAutomationEvent, string> = {
    // User Events
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_REGISTERED]: 'User Registered',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_LOGGED_IN]: 'User Logged In',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_LOGGED_OUT]: 'User Logged Out',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_VIEWED_PRODUCT]: 'User Viewed Product',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_ADDED_TO_CART]: 'User Added to Cart',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_REMOVED_FROM_CART]: 'User Removed from Cart',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_CHECKOUT]: 'User Checkout',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_PURCHASED]: 'User Purchased',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_REFUNDED]: 'User Refunded',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_REVIEWED]: 'User Reviewed',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_SUBSCRIBED]: 'User Subscribed',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_UNSUBSCRIBED]: 'User Unsubscribed',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_ABANDONED_CART]: 'User Abandoned Cart',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_BROWSED_PRODUCT]: 'User Browsed Product',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.USER_SEARCHED_QUERY]: 'User Searched Query',

    // Order Events
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.ORDER_CREATED]: 'Order Created',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.ORDER_UPDATED]: 'Order Updated',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.ORDER_CANCELLED]: 'Order Cancelled',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.ORDER_COMPLETED]: 'Order Completed',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.ORDER_SHIPPED]: 'Order Shipped',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.ORDER_DELIVERED]: 'Order Delivered',

    // Payment Events
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.PAYMENT_SUCCESSFUL]: 'Payment Successful',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.PAYMENT_FAILED]: 'Payment Failed',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.PAYMENT_REFUNDED]: 'Payment Refunded',

    // Lead Events
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.LEAD_CREATED]: 'Lead Created',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.LEAD_UPDATED]: 'Lead Updated',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.LEAD_CONVERTED]: 'Lead Converted',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.LEAD_SCORED]: 'Lead Scored',

    // Campaign Events
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.CAMPAIGN_STARTED]: 'Campaign Started',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.CAMPAIGN_ENDED]: 'Campaign Ended',
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.CAMPAIGN_PAUSED]: 'Campaign Paused',

    // Custom
    [MARKETINGAUTOMATION_TRIGGER.EVENTS.CUSTOM]: 'Custom Event',
  };
  return labels[event] || 'Unknown Event';
}

export function marketingautomationGetTimeTypeLabel(timeType: MarketingAutomationTimeType): string {
  const labels: Record<MarketingAutomationTimeType, string> = {
    [MARKETINGAUTOMATION_TRIGGER.TIME_TYPES.DATE]: 'Date',
    [MARKETINGAUTOMATION_TRIGGER.TIME_TYPES.TIME]: 'Time',
    [MARKETINGAUTOMATION_TRIGGER.TIME_TYPES.DAY_OF_WEEK]: 'Day of Week',
    [MARKETINGAUTOMATION_TRIGGER.TIME_TYPES.DAY_OF_MONTH]: 'Day of Month',
    [MARKETINGAUTOMATION_TRIGGER.TIME_TYPES.MONTH]: 'Month',
    [MARKETINGAUTOMATION_TRIGGER.TIME_TYPES.YEAR]: 'Year',
    [MARKETINGAUTOMATION_TRIGGER.TIME_TYPES.INTERVAL]: 'Interval',
    [MARKETINGAUTOMATION_TRIGGER.TIME_TYPES.CUSTOM]: 'Custom Time',
  };
  return labels[timeType] || 'Unknown Time Type';
}

export function marketingautomationGetConditionTypeLabel(
  conditionType: MarketingAutomationConditionType
): string {
  const labels: Record<MarketingAutomationConditionType, string> = {
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.EQUALS]: 'Equals',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.NOT_EQUALS]: 'Not Equals',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.GREATER_THAN]: 'Greater Than',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.LESS_THAN]: 'Less Than',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.CONTAINS]: 'Contains',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.STARTS_WITH]: 'Starts With',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.ENDS_WITH]: 'Ends With',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.BETWEEN]: 'Between',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.IN]: 'In',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.NOT_IN]: 'Not In',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.IS_TRUE]: 'Is True',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.IS_FALSE]: 'Is False',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.IS_NULL]: 'Is Null',
    [MARKETINGAUTOMATION_TRIGGER.CONDITION_TYPES.IS_NOT_NULL]: 'Is Not Null',
  };
  return labels[conditionType] || 'Unknown Condition Type';
}

export function marketingautomationGetTriggerStatusLabel(
  status: MarketingAutomationTriggerStatus
): string {
  const labels: Record<MarketingAutomationTriggerStatus, string> = {
    [MARKETINGAUTOMATION_TRIGGER.STATUSES.ACTIVE]: 'Active',
    [MARKETINGAUTOMATION_TRIGGER.STATUSES.INACTIVE]: 'Inactive',
    [MARKETINGAUTOMATION_TRIGGER.STATUSES.PAUSED]: 'Paused',
    [MARKETINGAUTOMATION_TRIGGER.STATUSES.FAILED]: 'Failed',
    [MARKETINGAUTOMATION_TRIGGER.STATUSES.COMPLETED]: 'Completed',
  };
  return labels[status] || 'Unknown Status';
}

export function marketingautomationIsEventTrigger(type: MarketingAutomationTriggerType): boolean {
  return type === MARKETINGAUTOMATION_TRIGGER.TYPES.EVENT;
}

export function marketingautomationIsTimeTrigger(type: MarketingAutomationTriggerType): boolean {
  return type === MARKETINGAUTOMATION_TRIGGER.TYPES.TIME;
}

export function marketingautomationIsConditionTrigger(
  type: MarketingAutomationTriggerType
): boolean {
  return type === MARKETINGAUTOMATION_TRIGGER.TYPES.CONDITION;
}

export function marketingautomationIsScheduleTrigger(
  type: MarketingAutomationTriggerType
): boolean {
  return type === MARKETINGAUTOMATION_TRIGGER.TYPES.SCHEDULE;
}
