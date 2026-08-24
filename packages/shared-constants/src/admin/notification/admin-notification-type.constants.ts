/**
 * Admin Notification Type Constants
 * Detailed notification type definitions
 */

export const ADMIN_NOTIFICATION_TYPE = {
  // System notifications
  SYSTEM_INFO: 'system_info',
  SYSTEM_WARNING: 'system_warning',
  SYSTEM_ERROR: 'system_error',
  SYSTEM_CRITICAL: 'system_critical',
  SYSTEM_UPDATE: 'system_update',
  SYSTEM_UPGRADE: 'system_upgrade',
  SYSTEM_MAINTENANCE: 'system_maintenance',
  SYSTEM_BACKUP: 'system_backup',
  SYSTEM_RESTORE: 'system_restore',

  // Security notifications
  SECURITY_LOGIN: 'security_login',
  SECURITY_LOGOUT: 'security_logout',
  SECURITY_FAILED_LOGIN: 'security_failed_login',
  SECURITY_PASSWORD_CHANGE: 'security_password_change',
  SECURITY_PASSWORD_RESET: 'security_password_reset',
  SECURITY_TWO_FA: 'security_two_fa',
  SECURITY_DEVICE_ADDED: 'security_device_added',
  SECURITY_DEVICE_REMOVED: 'security_device_removed',
  SECURITY_IP_BLOCKED: 'security_ip_blocked',
  SECURITY_SUSPICIOUS: 'security_suspicious',

  // User notifications
  USER_CREATED: 'user_created',
  USER_UPDATED: 'user_updated',
  USER_DELETED: 'user_deleted',
  USER_ACTIVATED: 'user_activated',
  USER_DEACTIVATED: 'user_deactivated',
  USER_BANNED: 'user_banned',
  USER_UNBANNED: 'user_unbanned',
  USER_ROLE_CHANGED: 'user_role_changed',

  // Admin notifications
  ADMIN_CREATED: 'admin_created',
  ADMIN_UPDATED: 'admin_updated',
  ADMIN_DELETED: 'admin_deleted',
  ADMIN_ACTIVATED: 'admin_activated',
  ADMIN_DEACTIVATED: 'admin_deactivated',
  ADMIN_ROLE_CHANGED: 'admin_role_changed',
  ADMIN_PERMISSION_CHANGED: 'admin_permission_changed',

  // Business notifications
  ORDER_CREATED: 'order_created',
  ORDER_UPDATED: 'order_updated',
  ORDER_CANCELLED: 'order_cancelled',
  ORDER_COMPLETED: 'order_completed',
  ORDER_SHIPPED: 'order_shipped',
  ORDER_DELIVERED: 'order_delivered',
  ORDER_RETURNED: 'order_returned',
  ORDER_REFUNDED: 'order_refunded',

  // Payment notifications
  PAYMENT_RECEIVED: 'payment_received',
  PAYMENT_FAILED: 'payment_failed',
  PAYMENT_REFUNDED: 'payment_refunded',
  PAYMENT_CAPTURED: 'payment_captured',
  PAYMENT_VOIDED: 'payment_voided',
  PAYMENT_DISPUTED: 'payment_disputed',
  PAYMENT_RESOLVED: 'payment_resolved',

  // Product notifications
  PRODUCT_CREATED: 'product_created',
  PRODUCT_UPDATED: 'product_updated',
  PRODUCT_DELETED: 'product_deleted',
  PRODUCT_ACTIVATED: 'product_activated',
  PRODUCT_DEACTIVATED: 'product_deactivated',
  PRODUCT_LOW_STOCK: 'product_low_stock',
  PRODUCT_OUT_OF_STOCK: 'product_out_of_stock',

  // Report notifications
  REPORT_GENERATED: 'report_generated',
  REPORT_EXPORTED: 'report_exported',
  REPORT_EMAILED: 'report_emailed',
  REPORT_VIEWED: 'report_viewed',
  REPORT_SHARED: 'report_shared',

  // Approval notifications
  APPROVAL_REQUESTED: 'approval_requested',
  APPROVAL_GRANTED: 'approval_granted',
  APPROVAL_DENIED: 'approval_denied',
  APPROVAL_ESCALATED: 'approval_escalated',

  // Maintenance notifications
  MAINTENANCE_SCHEDULED: 'maintenance_scheduled',
  MAINTENANCE_STARTED: 'maintenance_started',
  MAINTENANCE_COMPLETED: 'maintenance_completed',
  MAINTENANCE_EXTENDED: 'maintenance_extended',
  MAINTENANCE_CANCELLED: 'maintenance_cancelled',

  // Alert notifications
  ALERT_HIGH: 'alert_high',
  ALERT_MEDIUM: 'alert_medium',
  ALERT_LOW: 'alert_low',
  ALERT_CRITICAL: 'alert_critical',
  ALERT_RESOLVED: 'alert_resolved',

  // Reminder notifications
  REMINDER_TASK: 'reminder_task',
  REMINDER_DEADLINE: 'reminder_deadline',
  REMINDER_EVENT: 'reminder_event',
  REMINDER_SUBSCRIPTION: 'reminder_subscription',

  // Marketing notifications
  PROMOTION_NEW: 'promotion_new',
  PROMOTION_EXPIRING: 'promotion_expiring',
  PROMOTION_ENDED: 'promotion_ended',
  NEWSLETTER: 'newsletter',

  // Collaboration notifications
  COMMENT_ADDED: 'comment_added',
  MENTION: 'mention',
  SHARED: 'shared',
  ASSIGNED: 'assigned',
  UNASSIGNED: 'unassigned',
} as const;

export type AdminNotificationTypeDetail =
  (typeof ADMIN_NOTIFICATION_TYPE)[keyof typeof ADMIN_NOTIFICATION_TYPE];

export const ADMIN_NOTIFICATION_TYPE_CATEGORIES: Record<AdminNotificationTypeDetail, string> = {
  // System notifications
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_INFO]: 'system',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_WARNING]: 'system',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_ERROR]: 'system',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_CRITICAL]: 'system',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_UPDATE]: 'system',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_UPGRADE]: 'system',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_MAINTENANCE]: 'system',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_BACKUP]: 'system',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_RESTORE]: 'system',

  // Security notifications
  [ADMIN_NOTIFICATION_TYPE.SECURITY_LOGIN]: 'security',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_LOGOUT]: 'security',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_FAILED_LOGIN]: 'security',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_PASSWORD_CHANGE]: 'security',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_PASSWORD_RESET]: 'security',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_TWO_FA]: 'security',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_DEVICE_ADDED]: 'security',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_DEVICE_REMOVED]: 'security',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_IP_BLOCKED]: 'security',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_SUSPICIOUS]: 'security',

  // User notifications
  [ADMIN_NOTIFICATION_TYPE.USER_CREATED]: 'user',
  [ADMIN_NOTIFICATION_TYPE.USER_UPDATED]: 'user',
  [ADMIN_NOTIFICATION_TYPE.USER_DELETED]: 'user',
  [ADMIN_NOTIFICATION_TYPE.USER_ACTIVATED]: 'user',
  [ADMIN_NOTIFICATION_TYPE.USER_DEACTIVATED]: 'user',
  [ADMIN_NOTIFICATION_TYPE.USER_BANNED]: 'user',
  [ADMIN_NOTIFICATION_TYPE.USER_UNBANNED]: 'user',
  [ADMIN_NOTIFICATION_TYPE.USER_ROLE_CHANGED]: 'user',

  // Admin notifications
  [ADMIN_NOTIFICATION_TYPE.ADMIN_CREATED]: 'admin',
  [ADMIN_NOTIFICATION_TYPE.ADMIN_UPDATED]: 'admin',
  [ADMIN_NOTIFICATION_TYPE.ADMIN_DELETED]: 'admin',
  [ADMIN_NOTIFICATION_TYPE.ADMIN_ACTIVATED]: 'admin',
  [ADMIN_NOTIFICATION_TYPE.ADMIN_DEACTIVATED]: 'admin',
  [ADMIN_NOTIFICATION_TYPE.ADMIN_ROLE_CHANGED]: 'admin',
  [ADMIN_NOTIFICATION_TYPE.ADMIN_PERMISSION_CHANGED]: 'admin',

  // Business notifications
  [ADMIN_NOTIFICATION_TYPE.ORDER_CREATED]: 'business',
  [ADMIN_NOTIFICATION_TYPE.ORDER_UPDATED]: 'business',
  [ADMIN_NOTIFICATION_TYPE.ORDER_CANCELLED]: 'business',
  [ADMIN_NOTIFICATION_TYPE.ORDER_COMPLETED]: 'business',
  [ADMIN_NOTIFICATION_TYPE.ORDER_SHIPPED]: 'business',
  [ADMIN_NOTIFICATION_TYPE.ORDER_DELIVERED]: 'business',
  [ADMIN_NOTIFICATION_TYPE.ORDER_RETURNED]: 'business',
  [ADMIN_NOTIFICATION_TYPE.ORDER_REFUNDED]: 'business',

  // Payment notifications
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_RECEIVED]: 'payment',
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_FAILED]: 'payment',
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_REFUNDED]: 'payment',
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_CAPTURED]: 'payment',
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_VOIDED]: 'payment',
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_DISPUTED]: 'payment',
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_RESOLVED]: 'payment',

  // Product notifications
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_CREATED]: 'product',
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_UPDATED]: 'product',
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_DELETED]: 'product',
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_ACTIVATED]: 'product',
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_DEACTIVATED]: 'product',
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_LOW_STOCK]: 'product',
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_OUT_OF_STOCK]: 'product',

  // Report notifications
  [ADMIN_NOTIFICATION_TYPE.REPORT_GENERATED]: 'report',
  [ADMIN_NOTIFICATION_TYPE.REPORT_EXPORTED]: 'report',
  [ADMIN_NOTIFICATION_TYPE.REPORT_EMAILED]: 'report',
  [ADMIN_NOTIFICATION_TYPE.REPORT_VIEWED]: 'report',
  [ADMIN_NOTIFICATION_TYPE.REPORT_SHARED]: 'report',

  // Approval notifications
  [ADMIN_NOTIFICATION_TYPE.APPROVAL_REQUESTED]: 'approval',
  [ADMIN_NOTIFICATION_TYPE.APPROVAL_GRANTED]: 'approval',
  [ADMIN_NOTIFICATION_TYPE.APPROVAL_DENIED]: 'approval',
  [ADMIN_NOTIFICATION_TYPE.APPROVAL_ESCALATED]: 'approval',

  // Maintenance notifications
  [ADMIN_NOTIFICATION_TYPE.MAINTENANCE_SCHEDULED]: 'maintenance',
  [ADMIN_NOTIFICATION_TYPE.MAINTENANCE_STARTED]: 'maintenance',
  [ADMIN_NOTIFICATION_TYPE.MAINTENANCE_COMPLETED]: 'maintenance',
  [ADMIN_NOTIFICATION_TYPE.MAINTENANCE_EXTENDED]: 'maintenance',
  [ADMIN_NOTIFICATION_TYPE.MAINTENANCE_CANCELLED]: 'maintenance',

  // Alert notifications
  [ADMIN_NOTIFICATION_TYPE.ALERT_HIGH]: 'alert',
  [ADMIN_NOTIFICATION_TYPE.ALERT_MEDIUM]: 'alert',
  [ADMIN_NOTIFICATION_TYPE.ALERT_LOW]: 'alert',
  [ADMIN_NOTIFICATION_TYPE.ALERT_CRITICAL]: 'alert',
  [ADMIN_NOTIFICATION_TYPE.ALERT_RESOLVED]: 'alert',

  // Reminder notifications
  [ADMIN_NOTIFICATION_TYPE.REMINDER_TASK]: 'reminder',
  [ADMIN_NOTIFICATION_TYPE.REMINDER_DEADLINE]: 'reminder',
  [ADMIN_NOTIFICATION_TYPE.REMINDER_EVENT]: 'reminder',
  [ADMIN_NOTIFICATION_TYPE.REMINDER_SUBSCRIPTION]: 'reminder',

  // Marketing notifications
  [ADMIN_NOTIFICATION_TYPE.PROMOTION_NEW]: 'marketing',
  [ADMIN_NOTIFICATION_TYPE.PROMOTION_EXPIRING]: 'marketing',
  [ADMIN_NOTIFICATION_TYPE.PROMOTION_ENDED]: 'marketing',
  [ADMIN_NOTIFICATION_TYPE.NEWSLETTER]: 'marketing',

  // Collaboration notifications
  [ADMIN_NOTIFICATION_TYPE.COMMENT_ADDED]: 'collaboration',
  [ADMIN_NOTIFICATION_TYPE.MENTION]: 'collaboration',
  [ADMIN_NOTIFICATION_TYPE.SHARED]: 'collaboration',
  [ADMIN_NOTIFICATION_TYPE.ASSIGNED]: 'collaboration',
  [ADMIN_NOTIFICATION_TYPE.UNASSIGNED]: 'collaboration',
};

export const ADMIN_NOTIFICATION_TYPE_LABELS_DETAIL: Record<AdminNotificationTypeDetail, string> = {
  // System notifications
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_INFO]: 'System Info',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_WARNING]: 'System Warning',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_ERROR]: 'System Error',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_CRITICAL]: 'System Critical',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_UPDATE]: 'System Update',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_UPGRADE]: 'System Upgrade',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_MAINTENANCE]: 'System Maintenance',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_BACKUP]: 'System Backup',
  [ADMIN_NOTIFICATION_TYPE.SYSTEM_RESTORE]: 'System Restore',

  // Security notifications
  [ADMIN_NOTIFICATION_TYPE.SECURITY_LOGIN]: 'Security Login',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_LOGOUT]: 'Security Logout',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_FAILED_LOGIN]: 'Security Failed Login',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_PASSWORD_CHANGE]: 'Security Password Change',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_PASSWORD_RESET]: 'Security Password Reset',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_TWO_FA]: 'Security 2FA',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_DEVICE_ADDED]: 'Security Device Added',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_DEVICE_REMOVED]: 'Security Device Removed',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_IP_BLOCKED]: 'Security IP Blocked',
  [ADMIN_NOTIFICATION_TYPE.SECURITY_SUSPICIOUS]: 'Security Suspicious',

  // User notifications
  [ADMIN_NOTIFICATION_TYPE.USER_CREATED]: 'User Created',
  [ADMIN_NOTIFICATION_TYPE.USER_UPDATED]: 'User Updated',
  [ADMIN_NOTIFICATION_TYPE.USER_DELETED]: 'User Deleted',
  [ADMIN_NOTIFICATION_TYPE.USER_ACTIVATED]: 'User Activated',
  [ADMIN_NOTIFICATION_TYPE.USER_DEACTIVATED]: 'User Deactivated',
  [ADMIN_NOTIFICATION_TYPE.USER_BANNED]: 'User Banned',
  [ADMIN_NOTIFICATION_TYPE.USER_UNBANNED]: 'User Unbanned',
  [ADMIN_NOTIFICATION_TYPE.USER_ROLE_CHANGED]: 'User Role Changed',

  // Admin notifications
  [ADMIN_NOTIFICATION_TYPE.ADMIN_CREATED]: 'Admin Created',
  [ADMIN_NOTIFICATION_TYPE.ADMIN_UPDATED]: 'Admin Updated',
  [ADMIN_NOTIFICATION_TYPE.ADMIN_DELETED]: 'Admin Deleted',
  [ADMIN_NOTIFICATION_TYPE.ADMIN_ACTIVATED]: 'Admin Activated',
  [ADMIN_NOTIFICATION_TYPE.ADMIN_DEACTIVATED]: 'Admin Deactivated',
  [ADMIN_NOTIFICATION_TYPE.ADMIN_ROLE_CHANGED]: 'Admin Role Changed',
  [ADMIN_NOTIFICATION_TYPE.ADMIN_PERMISSION_CHANGED]: 'Admin Permission Changed',

  // Business notifications
  [ADMIN_NOTIFICATION_TYPE.ORDER_CREATED]: 'Order Created',
  [ADMIN_NOTIFICATION_TYPE.ORDER_UPDATED]: 'Order Updated',
  [ADMIN_NOTIFICATION_TYPE.ORDER_CANCELLED]: 'Order Cancelled',
  [ADMIN_NOTIFICATION_TYPE.ORDER_COMPLETED]: 'Order Completed',
  [ADMIN_NOTIFICATION_TYPE.ORDER_SHIPPED]: 'Order Shipped',
  [ADMIN_NOTIFICATION_TYPE.ORDER_DELIVERED]: 'Order Delivered',
  [ADMIN_NOTIFICATION_TYPE.ORDER_RETURNED]: 'Order Returned',
  [ADMIN_NOTIFICATION_TYPE.ORDER_REFUNDED]: 'Order Refunded',

  // Payment notifications
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_RECEIVED]: 'Payment Received',
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_FAILED]: 'Payment Failed',
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_REFUNDED]: 'Payment Refunded',
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_CAPTURED]: 'Payment Captured',
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_VOIDED]: 'Payment Voided',
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_DISPUTED]: 'Payment Disputed',
  [ADMIN_NOTIFICATION_TYPE.PAYMENT_RESOLVED]: 'Payment Resolved',

  // Product notifications
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_CREATED]: 'Product Created',
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_UPDATED]: 'Product Updated',
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_DELETED]: 'Product Deleted',
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_ACTIVATED]: 'Product Activated',
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_DEACTIVATED]: 'Product Deactivated',
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_LOW_STOCK]: 'Product Low Stock',
  [ADMIN_NOTIFICATION_TYPE.PRODUCT_OUT_OF_STOCK]: 'Product Out of Stock',

  // Report notifications
  [ADMIN_NOTIFICATION_TYPE.REPORT_GENERATED]: 'Report Generated',
  [ADMIN_NOTIFICATION_TYPE.REPORT_EXPORTED]: 'Report Exported',
  [ADMIN_NOTIFICATION_TYPE.REPORT_EMAILED]: 'Report Emailed',
  [ADMIN_NOTIFICATION_TYPE.REPORT_VIEWED]: 'Report Viewed',
  [ADMIN_NOTIFICATION_TYPE.REPORT_SHARED]: 'Report Shared',

  // Approval notifications
  [ADMIN_NOTIFICATION_TYPE.APPROVAL_REQUESTED]: 'Approval Requested',
  [ADMIN_NOTIFICATION_TYPE.APPROVAL_GRANTED]: 'Approval Granted',
  [ADMIN_NOTIFICATION_TYPE.APPROVAL_DENIED]: 'Approval Denied',
  [ADMIN_NOTIFICATION_TYPE.APPROVAL_ESCALATED]: 'Approval Escalated',

  // Maintenance notifications
  [ADMIN_NOTIFICATION_TYPE.MAINTENANCE_SCHEDULED]: 'Maintenance Scheduled',
  [ADMIN_NOTIFICATION_TYPE.MAINTENANCE_STARTED]: 'Maintenance Started',
  [ADMIN_NOTIFICATION_TYPE.MAINTENANCE_COMPLETED]: 'Maintenance Completed',
  [ADMIN_NOTIFICATION_TYPE.MAINTENANCE_EXTENDED]: 'Maintenance Extended',
  [ADMIN_NOTIFICATION_TYPE.MAINTENANCE_CANCELLED]: 'Maintenance Cancelled',

  // Alert notifications
  [ADMIN_NOTIFICATION_TYPE.ALERT_HIGH]: 'High Alert',
  [ADMIN_NOTIFICATION_TYPE.ALERT_MEDIUM]: 'Medium Alert',
  [ADMIN_NOTIFICATION_TYPE.ALERT_LOW]: 'Low Alert',
  [ADMIN_NOTIFICATION_TYPE.ALERT_CRITICAL]: 'Critical Alert',
  [ADMIN_NOTIFICATION_TYPE.ALERT_RESOLVED]: 'Alert Resolved',

  // Reminder notifications
  [ADMIN_NOTIFICATION_TYPE.REMINDER_TASK]: 'Task Reminder',
  [ADMIN_NOTIFICATION_TYPE.REMINDER_DEADLINE]: 'Deadline Reminder',
  [ADMIN_NOTIFICATION_TYPE.REMINDER_EVENT]: 'Event Reminder',
  [ADMIN_NOTIFICATION_TYPE.REMINDER_SUBSCRIPTION]: 'Subscription Reminder',

  // Marketing notifications
  [ADMIN_NOTIFICATION_TYPE.PROMOTION_NEW]: 'New Promotion',
  [ADMIN_NOTIFICATION_TYPE.PROMOTION_EXPIRING]: 'Promotion Expiring',
  [ADMIN_NOTIFICATION_TYPE.PROMOTION_ENDED]: 'Promotion Ended',
  [ADMIN_NOTIFICATION_TYPE.NEWSLETTER]: 'Newsletter',

  // Collaboration notifications
  [ADMIN_NOTIFICATION_TYPE.COMMENT_ADDED]: 'Comment Added',
  [ADMIN_NOTIFICATION_TYPE.MENTION]: 'Mention',
  [ADMIN_NOTIFICATION_TYPE.SHARED]: 'Shared',
  [ADMIN_NOTIFICATION_TYPE.ASSIGNED]: 'Assigned',
  [ADMIN_NOTIFICATION_TYPE.UNASSIGNED]: 'Unassigned',
};

export function getAdminNotificationTypeCategory(type: AdminNotificationTypeDetail): string {
  return ADMIN_NOTIFICATION_TYPE_CATEGORIES[type] || 'other';
}

export function getAdminNotificationTypeLabel(type: AdminNotificationTypeDetail): string {
  return ADMIN_NOTIFICATION_TYPE_LABELS_DETAIL[type] || 'Unknown Type';
}

export function isAdminNotificationSystemType(type: AdminNotificationTypeDetail): boolean {
  return getAdminNotificationTypeCategory(type) === 'system';
}

export function isAdminNotificationSecurityType(type: AdminNotificationTypeDetail): boolean {
  return getAdminNotificationTypeCategory(type) === 'security';
}

export function isAdminNotificationUserType(type: AdminNotificationTypeDetail): boolean {
  return getAdminNotificationTypeCategory(type) === 'user';
}

export function isAdminNotificationBusinessType(type: AdminNotificationTypeDetail): boolean {
  return getAdminNotificationTypeCategory(type) === 'business';
}

export function isAdminNotificationPaymentType(type: AdminNotificationTypeDetail): boolean {
  return getAdminNotificationTypeCategory(type) === 'payment';
}

export function isAdminNotificationProductType(type: AdminNotificationTypeDetail): boolean {
  return getAdminNotificationTypeCategory(type) === 'product';
}

export function isAdminNotificationReportType(type: AdminNotificationTypeDetail): boolean {
  return getAdminNotificationTypeCategory(type) === 'report';
}

export function isAdminNotificationApprovalType(type: AdminNotificationTypeDetail): boolean {
  return getAdminNotificationTypeCategory(type) === 'approval';
}

export function isAdminNotificationAlertType(type: AdminNotificationTypeDetail): boolean {
  return getAdminNotificationTypeCategory(type) === 'alert';
}

export function isAdminNotificationReminderType(type: AdminNotificationTypeDetail): boolean {
  return getAdminNotificationTypeCategory(type) === 'reminder';
}

export function isAdminNotificationMarketingType(type: AdminNotificationTypeDetail): boolean {
  return getAdminNotificationTypeCategory(type) === 'marketing';
}

export function isAdminNotificationCollaborationType(type: AdminNotificationTypeDetail): boolean {
  return getAdminNotificationTypeCategory(type) === 'collaboration';
}
