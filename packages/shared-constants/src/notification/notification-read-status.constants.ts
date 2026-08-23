/**
 * Notification Read Status Constants
 * Read status definitions for notifications
 */

export const NOTIFICATION_READ_STATUS = {
  // Read Statuses
  STATUSES: {
    UNREAD: 'unread',
    READ: 'read',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    UNREAD: '#3B82F6',
    READ: '#10B981',
    ARCHIVED: '#6B7280',
    DELETED: '#6B7280',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    UNREAD: '🔵',
    READ: '✅',
    ARCHIVED: '📁',
    DELETED: '🗑️',
  } as const,

  // Status Priority Order
  ORDER: {
    UNREAD: 0,
    READ: 1,
    ARCHIVED: 2,
    DELETED: 3,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    UNREAD_TO_READ: 'unread_to_read',
    UNREAD_TO_ARCHIVED: 'unread_to_archived',
    UNREAD_TO_DELETED: 'unread_to_deleted',
    READ_TO_UNREAD: 'read_to_unread',
    READ_TO_ARCHIVED: 'read_to_archived',
    READ_TO_DELETED: 'read_to_deleted',
    ARCHIVED_TO_READ: 'archived_to_read',
    ARCHIVED_TO_DELETED: 'archived_to_deleted',
    DELETED_TO_ARCHIVED: 'deleted_to_archived',
  } as const,

  // Read Defaults
  DEFAULTS: {
    DEFAULT_STATUS: 'unread',
    DEFAULT_COLOR: '#3B82F6',
    DEFAULT_ICON: '🔵',
    DEFAULT_ORDER: 0,
  } as const,
} as const;

// Read Statuses
export type NotificationReadStatusType =
  (typeof NOTIFICATION_READ_STATUS.STATUSES)[keyof typeof NOTIFICATION_READ_STATUS.STATUSES];

// Status Colors
export type NotificationReadStatusColor =
  (typeof NOTIFICATION_READ_STATUS.COLORS)[keyof typeof NOTIFICATION_READ_STATUS.COLORS];

// Status Icons
export type NotificationReadStatusIcon =
  (typeof NOTIFICATION_READ_STATUS.ICONS)[keyof typeof NOTIFICATION_READ_STATUS.ICONS];

// Status Priority Order
export type NotificationReadStatusOrder =
  (typeof NOTIFICATION_READ_STATUS.ORDER)[keyof typeof NOTIFICATION_READ_STATUS.ORDER];

// Status Transitions
export type NotificationReadStatusTransition =
  (typeof NOTIFICATION_READ_STATUS.TRANSITIONS)[keyof typeof NOTIFICATION_READ_STATUS.TRANSITIONS];

// Read Defaults
export type NotificationReadStatusDefault =
  (typeof NOTIFICATION_READ_STATUS.DEFAULTS)[keyof typeof NOTIFICATION_READ_STATUS.DEFAULTS];

// Utility Functions
export function notificationGetReadStatusLabel(status: NotificationReadStatusType): string {
  const labels: Record<NotificationReadStatusType, string> = {
    [NOTIFICATION_READ_STATUS.STATUSES.UNREAD]: 'Unread',
    [NOTIFICATION_READ_STATUS.STATUSES.READ]: 'Read',
    [NOTIFICATION_READ_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [NOTIFICATION_READ_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Read Status';
}

export function notificationGetReadStatusColor(
  status: NotificationReadStatusType
): NotificationReadStatusColor {
  const colors: Record<NotificationReadStatusType, NotificationReadStatusColor> = {
    [NOTIFICATION_READ_STATUS.STATUSES.UNREAD]: NOTIFICATION_READ_STATUS.COLORS.UNREAD,
    [NOTIFICATION_READ_STATUS.STATUSES.READ]: NOTIFICATION_READ_STATUS.COLORS.READ,
    [NOTIFICATION_READ_STATUS.STATUSES.ARCHIVED]: NOTIFICATION_READ_STATUS.COLORS.ARCHIVED,
    [NOTIFICATION_READ_STATUS.STATUSES.DELETED]: NOTIFICATION_READ_STATUS.COLORS.DELETED,
  };
  return colors[status] || NOTIFICATION_READ_STATUS.COLORS.UNREAD;
}

export function notificationGetReadStatusIcon(
  status: NotificationReadStatusType
): NotificationReadStatusIcon {
  const icons: Record<NotificationReadStatusType, NotificationReadStatusIcon> = {
    [NOTIFICATION_READ_STATUS.STATUSES.UNREAD]: NOTIFICATION_READ_STATUS.ICONS.UNREAD,
    [NOTIFICATION_READ_STATUS.STATUSES.READ]: NOTIFICATION_READ_STATUS.ICONS.READ,
    [NOTIFICATION_READ_STATUS.STATUSES.ARCHIVED]: NOTIFICATION_READ_STATUS.ICONS.ARCHIVED,
    [NOTIFICATION_READ_STATUS.STATUSES.DELETED]: NOTIFICATION_READ_STATUS.ICONS.DELETED,
  };
  return icons[status] || NOTIFICATION_READ_STATUS.ICONS.UNREAD;
}

export function notificationIsReadStatus(status: NotificationReadStatusType): boolean {
  return status === NOTIFICATION_READ_STATUS.STATUSES.READ;
}

export function notificationIsUnreadStatus(status: NotificationReadStatusType): boolean {
  return status === NOTIFICATION_READ_STATUS.STATUSES.UNREAD;
}

export function notificationIsArchivedStatus(status: NotificationReadStatusType): boolean {
  return status === NOTIFICATION_READ_STATUS.STATUSES.ARCHIVED;
}

export function notificationIsDeletedStatus(status: NotificationReadStatusType): boolean {
  return status === NOTIFICATION_READ_STATUS.STATUSES.DELETED;
}

export function notificationCanTransitionReadStatus(
  currentStatus: NotificationReadStatusType,
  targetStatus: NotificationReadStatusType
): boolean {
  const validTransitions: Record<NotificationReadStatusType, NotificationReadStatusType[]> = {
    [NOTIFICATION_READ_STATUS.STATUSES.UNREAD]: [
      NOTIFICATION_READ_STATUS.STATUSES.READ,
      NOTIFICATION_READ_STATUS.STATUSES.ARCHIVED,
      NOTIFICATION_READ_STATUS.STATUSES.DELETED,
    ],
    [NOTIFICATION_READ_STATUS.STATUSES.READ]: [
      NOTIFICATION_READ_STATUS.STATUSES.UNREAD,
      NOTIFICATION_READ_STATUS.STATUSES.ARCHIVED,
      NOTIFICATION_READ_STATUS.STATUSES.DELETED,
    ],
    [NOTIFICATION_READ_STATUS.STATUSES.ARCHIVED]: [
      NOTIFICATION_READ_STATUS.STATUSES.READ,
      NOTIFICATION_READ_STATUS.STATUSES.DELETED,
    ],
    [NOTIFICATION_READ_STATUS.STATUSES.DELETED]: [NOTIFICATION_READ_STATUS.STATUSES.ARCHIVED],
  };

  return validTransitions[currentStatus]?.includes(targetStatus) || false;
}

export function notificationGetDefaultReadStatus(): NotificationReadStatusType {
  return NOTIFICATION_READ_STATUS.DEFAULTS.DEFAULT_STATUS;
}
