export const NOTIFICATION_PRIORITY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  NORMAL: 'normal',
  LOW: 'low',
  SILENT: 'silent',
} as const;

export const NOTIFICATION_PRIORITY_WEIGHT = {
  critical: 5,
  high: 4,
  normal: 3,
  low: 2,
  silent: 1,
} as const;

export const NOTIFICATION_PRIORITY_TTL = {
  critical: 604800,
  high: 259200,
  normal: 86400,
  low: 43200,
  silent: 21600,
} as const;

export type NotificationPriorityType =
  (typeof NOTIFICATION_PRIORITY)[keyof typeof NOTIFICATION_PRIORITY];
