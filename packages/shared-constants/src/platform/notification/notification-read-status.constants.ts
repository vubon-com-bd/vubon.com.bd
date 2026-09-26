export const NOTIFICATION_READ_STATUS = {
  UNREAD: 'unread',
  READ: 'read',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  STARRED: 'starred',
  SNOOZED: 'snoozed',
} as const;

export const NOTIFICATION_READ = {
  MARK_READ_ON_OPEN: true,
  AUTO_ARCHIVE_DAYS: 90,
  MAX_UNREAD: 1000,
  SNOOZE_OPTIONS_MINUTES: [15, 60, 1440, 10080],
  STARRED_RETENTION_DAYS: 365,
} as const;

export type NotificationReadStatusType =
  (typeof NOTIFICATION_READ_STATUS)[keyof typeof NOTIFICATION_READ_STATUS];
