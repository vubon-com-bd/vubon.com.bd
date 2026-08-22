/**
 * Admin Notification Constants Index
 * Export all admin notification constants for easy importing
 */

// Admin Notification Core Constants
export {
  ADMIN_NOTIFICATION,
  ADMIN_NOTIFICATION_CHANNEL_LABELS,
  ADMIN_NOTIFICATION_CHANNEL_ICONS,
  ADMIN_NOTIFICATION_TYPE_LABELS,
  ADMIN_NOTIFICATION_TYPE_COLORS,
  ADMIN_NOTIFICATION_STATUS_LABELS,
  ADMIN_NOTIFICATION_STATUS_COLORS,
  ADMIN_NOTIFICATION_PRIORITY_LABELS,
  ADMIN_NOTIFICATION_PRIORITY_LEVELS,
  ADMIN_NOTIFICATION_CATEGORY_LABELS,
  ADMIN_NOTIFICATION_DELIVERY_LABELS,
  ADMIN_NOTIFICATION_ACTION_LABELS,
  getAdminNotificationChannelLabel,
  getAdminNotificationChannelIcon,
  getAdminNotificationTypeLabel,
  getAdminNotificationTypeColor,
  getAdminNotificationStatusLabel,
  getAdminNotificationStatusColor,
  getAdminNotificationPriorityLabel,
  getAdminNotificationPriorityLevel,
  getAdminNotificationCategoryLabel,
  getAdminNotificationDeliveryLabel,
  getAdminNotificationActionLabel,
  isNotificationDelivered,
  isNotificationFailed,
  isNotificationPending,
  isNotificationRead,
  getNotificationTimeout,
  getNotificationTemplateLabel,
} from './admin-notification.constants';

export type {
  AdminNotificationChannel,
  AdminNotificationType,
  AdminNotificationStatus,
  AdminNotificationPriority,
  AdminNotificationCategory,
  AdminNotificationTemplate,
  AdminNotificationDelivery,
  AdminNotificationAction,
} from './admin-notification.constants';

// Admin Notification Type Constants
export {
  ADMIN_NOTIFICATION_TYPE,
  ADMIN_NOTIFICATION_TYPE_CATEGORIES,
  ADMIN_NOTIFICATION_TYPE_LABELS_DETAIL,
  getAdminNotificationTypeCategory,
  getAdminNotificationTypeLabel as getAdminNotificationTypeLabelDetail,
  isSystemNotification,
  isSecurityNotification,
  isUserNotification,
  isBusinessNotification,
  isPaymentNotification,
  isProductNotification,
  isReportNotification,
  isApprovalNotification,
  isAlertNotification,
  isReminderNotification,
  isMarketingNotification,
  isCollaborationNotification,
} from './admin-notification-type.constants';

export type { AdminNotificationTypeDetail } from './admin-notification-type.constants';

// Admin Notification Status Constants
export {
  ADMIN_NOTIFICATION_STATUS,
  ADMIN_NOTIFICATION_STATUS_LABELS_DETAIL,
  ADMIN_NOTIFICATION_STATUS_COLORS_DETAIL,
  ADMIN_NOTIFICATION_STATUS_GROUPS,
  getAdminNotificationStatusLabel as getAdminNotificationStatusLabelDetail,
  getAdminNotificationStatusColor as getAdminNotificationStatusColorDetail,
  isLifecycleStatus,
  isDeliveryStatus,
  isReadStatus,
  isFinalStatus,
  isErrorStatus,
  isDeliveredStatus,
  isFailedStatus,
  isPendingStatus,
  isUnreadStatus,
  isReadStatusType,
  isTerminalStatus,
  getStatusPriority,
  getAdminNotificationStatuses,
  getLifecycleStatuses,
  getDeliveryStatuses,
  getReadStatuses,
  getFinalStatuses,
  getErrorStatuses,
} from './admin-notification-status.constants';

export type { AdminNotificationStatusDetail } from './admin-notification-status.constants';
