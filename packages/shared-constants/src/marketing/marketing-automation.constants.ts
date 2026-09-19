export const MARKETING_AUTOMATION_TYPE = {
  WELCOME_SERIES: 'welcome_series',
  ABANDONED_CART: 'abandoned_cart',
  BROWSE_ABANDONMENT: 'browse_abandonment',
  RE_ENGAGEMENT: 're_engagement',
  BIRTHDAY: 'birthday',
  ANNIVERSARY: 'anniversary',
  POST_PURCHASE: 'post_purchase',
  WIN_BACK: 'win_back',
  UPSELL: 'upsell',
  CROSS_SELL: 'cross_sell',
  LOYALTY: 'loyalty',
  REVIEW_REQUEST: 'review_request',
  REFERRAL: 'referral',
  PRICE_DROP: 'price_drop',
  BACK_IN_STOCK: 'back_in_stock',
} as const;

export const MARKETING_AUTOMATION_TRIGGER = {
  USER_SIGNUP: 'user_signup',
  FIRST_PURCHASE: 'first_purchase',
  CART_ABANDONED: 'cart_abandoned',
  PRODUCT_VIEWED: 'product_viewed',
  ORDER_COMPLETED: 'order_completed',
  ORDER_DELIVERED: 'order_delivered',
  DAYS_SINCE_PURCHASE: 'days_since_purchase',
  DAYS_SINCE_LOGIN: 'days_since_login',
  BIRTHDAY: 'birthday',
  ANNIVERSARY: 'anniversary',
  PRICE_DROP: 'price_drop',
  BACK_IN_STOCK: 'back_in_stock',
  CUSTOM_EVENT: 'custom_event',
} as const;

export const MARKETING_AUTOMATION_ACTION = {
  SEND_EMAIL: 'send_email',
  SEND_SMS: 'send_sms',
  SEND_PUSH: 'send_push',
  SEND_IN_APP: 'send_in_app',
  ADD_TAG: 'add_tag',
  REMOVE_TAG: 'remove_tag',
  ADD_TO_SEGMENT: 'add_to_segment',
  REMOVE_FROM_SEGMENT: 'remove_from_segment',
  ASSIGN_COUPON: 'assign_coupon',
  ASSIGN_POINTS: 'assign_points',
  WAIT: 'wait',
  CONDITION: 'condition',
  WEBHOOK: 'webhook',
} as const;

export const MARKETING_AUTOMATION_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
  FAILED: 'failed',
} as const;

export const MARKETING_AUTOMATION = {
  TYPE: MARKETING_AUTOMATION_TYPE,
  TRIGGER: MARKETING_AUTOMATION_TRIGGER,
  ACTION: MARKETING_AUTOMATION_ACTION,
  STATUS: MARKETING_AUTOMATION_STATUS,
  MAX_STEPS_PER_WORKFLOW: 50,
  MAX_WORKFLOWS: 500,
  MAX_ACTIVE_WORKFLOWS: 100,
  MAX_DELAY_DAYS: 365,
  MAX_CONDITIONS: 20,
  MIN_WAIT_MINUTES: 1,
  MAX_WAIT_DAYS: 365,
  MAX_TRIGGERS_PER_WORKFLOW: 5,
  EVALUATION_TIMEOUT_MS: 5000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_SECONDS: 300,
  RETENTION_DAYS: 365,
} as const;

export type MarketingAutomationTypeType =
  (typeof MARKETING_AUTOMATION_TYPE)[keyof typeof MARKETING_AUTOMATION_TYPE];
export type MarketingAutomationTriggerType =
  (typeof MARKETING_AUTOMATION_TRIGGER)[keyof typeof MARKETING_AUTOMATION_TRIGGER];
export type MarketingAutomationActionType =
  (typeof MARKETING_AUTOMATION_ACTION)[keyof typeof MARKETING_AUTOMATION_ACTION];
export type MarketingAutomationStatusType =
  (typeof MARKETING_AUTOMATION_STATUS)[keyof typeof MARKETING_AUTOMATION_STATUS];
