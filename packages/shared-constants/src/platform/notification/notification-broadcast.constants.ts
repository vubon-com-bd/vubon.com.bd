export const NOTIFICATION_BROADCAST_TYPE = {
  ALL_USERS: 'all_users',
  SEGMENT: 'segment',
  ROLE_BASED: 'role_based',
  LOCATION_BASED: 'location_based',
  BEHAVIOR_BASED: 'behavior_based',
  CUSTOM_LIST: 'custom_list',
} as const;

export const NOTIFICATION_BROADCAST_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  SENDING: 'sending',
  SENT: 'sent',
  PARTIALLY_SENT: 'partially_sent',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

export const NOTIFICATION_BROADCAST_TARGET = {
  ALL: 'all',
  ACTIVE_USERS: 'active_users',
  INACTIVE_USERS: 'inactive_users',
  NEW_USERS: 'new_users',
  PREMIUM_USERS: 'premium_users',
  VENDORS: 'vendors',
  CUSTOMERS: 'customers',
  ADMINS: 'admins',
  CUSTOM: 'custom',
} as const;

export const NOTIFICATION_BROADCAST = {
  MAX_RECIPIENTS: 1000000,
  BATCH_SIZE: 1000,
  BATCH_DELAY_SECONDS: 1,
  MAX_CONCURRENT_BROADCASTS: 5,
  THROTTLE_PER_SECOND: 500,
  REQUIRE_APPROVAL: true,
  ALLOW_TEST_SEND: true,
  MAX_TEST_RECIPIENTS: 10,
  PREVIEW_ENABLED: true,
} as const;

export type NotificationBroadcastTypeType =
  (typeof NOTIFICATION_BROADCAST_TYPE)[keyof typeof NOTIFICATION_BROADCAST_TYPE];
export type NotificationBroadcastStatusType =
  (typeof NOTIFICATION_BROADCAST_STATUS)[keyof typeof NOTIFICATION_BROADCAST_STATUS];
export type NotificationBroadcastTargetType =
  (typeof NOTIFICATION_BROADCAST_TARGET)[keyof typeof NOTIFICATION_BROADCAST_TARGET];
