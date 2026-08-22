/**
 * Admin Notification Constants
 * Admin notification and alert definitions
 */

export const ADMIN_NOTIFICATION = {
  // Notification channels
  CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WEBHOOK: 'webhook',
    SLACK: 'slack',
    TEAMS: 'teams',
    DISCORD: 'discord',
    TELEGRAM: 'telegram',
    WHATSAPP: 'whatsapp',
    CALL: 'call',
    FAX: 'fax',
    MAIL: 'mail',
  },

  // Notification types
  TYPES: {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    ALERT: 'alert',
    REMINDER: 'reminder',
    UPDATE: 'update',
    PROMOTION: 'promotion',
    TRANSACTION: 'transaction',
    SECURITY: 'security',
    SYSTEM: 'system',
    MAINTENANCE: 'maintenance',
    REPORT: 'report',
    ANALYTICS: 'analytics',
    USER_ACTION: 'user_action',
    ADMIN_ACTION: 'admin_action',
    APPROVAL: 'approval',
    REJECTION: 'rejection',
    ESCALATION: 'escalation',
    RESOLUTION: 'resolution',
  },

  // Notification statuses
  STATUSES: {
    PENDING: 'pending',
    QUEUED: 'queued',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    UNREAD: 'unread',
    VIEWED: 'viewed',
    CLICKED: 'clicked',
    ACTIONED: 'actioned',
    FAILED: 'failed',
    BOUNCED: 'bounced',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    DRAFT: 'draft',
    SCHEDULED: 'scheduled',
    PROCESSING: 'processing',
    RETRY: 'retry',
    SUPPRESSED: 'suppressed',
  },

  // Notification priorities
  PRIORITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
    CRITICAL: 'critical',
  },

  // Notification categories
  CATEGORIES: {
    SYSTEM: 'system',
    SECURITY: 'security',
    BUSINESS: 'business',
    USER: 'user',
    ADMIN: 'admin',
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    TECHNICAL: 'technical',
    COMPLIANCE: 'compliance',
  },

  // Notification templates
  TEMPLATES: {
    WELCOME: 'welcome',
    PASSWORD_RESET: 'password_reset',
    EMAIL_VERIFICATION: 'email_verification',
    TWO_FA: 'two_fa',
    LOGIN_ALERT: 'login_alert',
    DEVICE_ADDED: 'device_added',
    ORDER_CONFIRMATION: 'order_confirmation',
    ORDER_SHIPPED: 'order_shipped',
    ORDER_DELIVERED: 'order_delivered',
    PAYMENT_RECEIVED: 'payment_received',
    PAYMENT_FAILED: 'payment_failed',
    REFUND_PROCESSED: 'refund_processed',
    SUBSCRIPTION_RENEWAL: 'subscription_renewal',
    SUBSCRIPTION_EXPIRY: 'subscription_expiry',
    ACCOUNT_SUSPENDED: 'account_suspended',
    ACCOUNT_REACTIVATED: 'account_reactivated',
    REPORT_READY: 'report_ready',
    MAINTENANCE_SCHEDULED: 'maintenance_scheduled',
    MAINTENANCE_COMPLETED: 'maintenance_completed',
    SECURITY_ALERT: 'security_alert',
    SYSTEM_UPDATE: 'system_update',
    NEW_COMMENT: 'new_comment',
    MENTION: 'mention',
    APPROVAL_REQUEST: 'approval_request',
    APPROVAL_GRANTED: 'approval_granted',
    APPROVAL_DENIED: 'approval_denied',
  },

  // Notification timeouts (in seconds)
  TIMEOUTS: {
    PUSH: 86400, // 24 hours
    EMAIL: 604800, // 7 days
    SMS: 3600, // 1 hour
    IN_APP: 2592000, // 30 days
    WEBHOOK: 30,
    SLACK: 30,
  },

  // Notification limits
  LIMITS: {
    MAX_RETRY: 3,
    MAX_BATCH: 100,
    MAX_PER_USER: 50,
    MAX_PER_DAY: 1000,
    RATE_LIMIT: 100,
    BURST_LIMIT: 200,
  },

  // Notification delivery
  DELIVERY: {
    IMMEDIATE: 'immediate',
    SCHEDULED: 'scheduled',
    BATCHED: 'batched',
    DIGEST: 'digest',
    REAL_TIME: 'real_time',
  },

  // Notification actions
  ACTIONS: {
    VIEW: 'view',
    APPROVE: 'approve',
    REJECT: 'reject',
    RESOLVE: 'resolve',
    ESCALATE: 'escalate',
    IGNORE: 'ignore',
    ARCHIVE: 'archive',
    DELETE: 'delete',
    MARK_READ: 'mark_read',
    MARK_UNREAD: 'mark_unread',
    REPLY: 'reply',
    FORWARD: 'forward',
  },
} as const;

export type AdminNotificationChannel =
  (typeof ADMIN_NOTIFICATION.CHANNELS)[keyof typeof ADMIN_NOTIFICATION.CHANNELS];
export type AdminNotificationType =
  (typeof ADMIN_NOTIFICATION.TYPES)[keyof typeof ADMIN_NOTIFICATION.TYPES];
export type AdminNotificationStatus =
  (typeof ADMIN_NOTIFICATION.STATUSES)[keyof typeof ADMIN_NOTIFICATION.STATUSES];
export type AdminNotificationPriority =
  (typeof ADMIN_NOTIFICATION.PRIORITIES)[keyof typeof ADMIN_NOTIFICATION.PRIORITIES];
export type AdminNotificationCategory =
  (typeof ADMIN_NOTIFICATION.CATEGORIES)[keyof typeof ADMIN_NOTIFICATION.CATEGORIES];
export type AdminNotificationTemplate =
  (typeof ADMIN_NOTIFICATION.TEMPLATES)[keyof typeof ADMIN_NOTIFICATION.TEMPLATES];
export type AdminNotificationDelivery =
  (typeof ADMIN_NOTIFICATION.DELIVERY)[keyof typeof ADMIN_NOTIFICATION.DELIVERY];
export type AdminNotificationAction =
  (typeof ADMIN_NOTIFICATION.ACTIONS)[keyof typeof ADMIN_NOTIFICATION.ACTIONS];

export const ADMIN_NOTIFICATION_CHANNEL_LABELS: Record<AdminNotificationChannel, string> = {
  [ADMIN_NOTIFICATION.CHANNELS.EMAIL]: 'Email',
  [ADMIN_NOTIFICATION.CHANNELS.SMS]: 'SMS',
  [ADMIN_NOTIFICATION.CHANNELS.PUSH]: 'Push Notification',
  [ADMIN_NOTIFICATION.CHANNELS.IN_APP]: 'In-App',
  [ADMIN_NOTIFICATION.CHANNELS.WEBHOOK]: 'Webhook',
  [ADMIN_NOTIFICATION.CHANNELS.SLACK]: 'Slack',
  [ADMIN_NOTIFICATION.CHANNELS.TEAMS]: 'Microsoft Teams',
  [ADMIN_NOTIFICATION.CHANNELS.DISCORD]: 'Discord',
  [ADMIN_NOTIFICATION.CHANNELS.TELEGRAM]: 'Telegram',
  [ADMIN_NOTIFICATION.CHANNELS.WHATSAPP]: 'WhatsApp',
  [ADMIN_NOTIFICATION.CHANNELS.CALL]: 'Phone Call',
  [ADMIN_NOTIFICATION.CHANNELS.FAX]: 'Fax',
  [ADMIN_NOTIFICATION.CHANNELS.MAIL]: 'Postal Mail',
};

export const ADMIN_NOTIFICATION_CHANNEL_ICONS: Record<AdminNotificationChannel, string> = {
  [ADMIN_NOTIFICATION.CHANNELS.EMAIL]: '✉️',
  [ADMIN_NOTIFICATION.CHANNELS.SMS]: '💬',
  [ADMIN_NOTIFICATION.CHANNELS.PUSH]: '📱',
  [ADMIN_NOTIFICATION.CHANNELS.IN_APP]: '📲',
  [ADMIN_NOTIFICATION.CHANNELS.WEBHOOK]: '🔗',
  [ADMIN_NOTIFICATION.CHANNELS.SLACK]: '💬',
  [ADMIN_NOTIFICATION.CHANNELS.TEAMS]: '👥',
  [ADMIN_NOTIFICATION.CHANNELS.DISCORD]: '🎮',
  [ADMIN_NOTIFICATION.CHANNELS.TELEGRAM]: '📨',
  [ADMIN_NOTIFICATION.CHANNELS.WHATSAPP]: '📱',
  [ADMIN_NOTIFICATION.CHANNELS.CALL]: '📞',
  [ADMIN_NOTIFICATION.CHANNELS.FAX]: '📠',
  [ADMIN_NOTIFICATION.CHANNELS.MAIL]: '📬',
};

export const ADMIN_NOTIFICATION_TYPE_LABELS: Record<AdminNotificationType, string> = {
  [ADMIN_NOTIFICATION.TYPES.INFO]: 'Info',
  [ADMIN_NOTIFICATION.TYPES.SUCCESS]: 'Success',
  [ADMIN_NOTIFICATION.TYPES.WARNING]: 'Warning',
  [ADMIN_NOTIFICATION.TYPES.ERROR]: 'Error',
  [ADMIN_NOTIFICATION.TYPES.CRITICAL]: 'Critical',
  [ADMIN_NOTIFICATION.TYPES.ALERT]: 'Alert',
  [ADMIN_NOTIFICATION.TYPES.REMINDER]: 'Reminder',
  [ADMIN_NOTIFICATION.TYPES.UPDATE]: 'Update',
  [ADMIN_NOTIFICATION.TYPES.PROMOTION]: 'Promotion',
  [ADMIN_NOTIFICATION.TYPES.TRANSACTION]: 'Transaction',
  [ADMIN_NOTIFICATION.TYPES.SECURITY]: 'Security',
  [ADMIN_NOTIFICATION.TYPES.SYSTEM]: 'System',
  [ADMIN_NOTIFICATION.TYPES.MAINTENANCE]: 'Maintenance',
  [ADMIN_NOTIFICATION.TYPES.REPORT]: 'Report',
  [ADMIN_NOTIFICATION.TYPES.ANALYTICS]: 'Analytics',
  [ADMIN_NOTIFICATION.TYPES.USER_ACTION]: 'User Action',
  [ADMIN_NOTIFICATION.TYPES.ADMIN_ACTION]: 'Admin Action',
  [ADMIN_NOTIFICATION.TYPES.APPROVAL]: 'Approval',
  [ADMIN_NOTIFICATION.TYPES.REJECTION]: 'Rejection',
  [ADMIN_NOTIFICATION.TYPES.ESCALATION]: 'Escalation',
  [ADMIN_NOTIFICATION.TYPES.RESOLUTION]: 'Resolution',
};

export const ADMIN_NOTIFICATION_TYPE_COLORS: Record<AdminNotificationType, string> = {
  [ADMIN_NOTIFICATION.TYPES.INFO]: '#3B82F6',
  [ADMIN_NOTIFICATION.TYPES.SUCCESS]: '#10B981',
  [ADMIN_NOTIFICATION.TYPES.WARNING]: '#F59E0B',
  [ADMIN_NOTIFICATION.TYPES.ERROR]: '#EF4444',
  [ADMIN_NOTIFICATION.TYPES.CRITICAL]: '#DC2626',
  [ADMIN_NOTIFICATION.TYPES.ALERT]: '#F97316',
  [ADMIN_NOTIFICATION.TYPES.REMINDER]: '#8B5CF6',
  [ADMIN_NOTIFICATION.TYPES.UPDATE]: '#6366F1',
  [ADMIN_NOTIFICATION.TYPES.PROMOTION]: '#EC4899',
  [ADMIN_NOTIFICATION.TYPES.TRANSACTION]: '#14B8A6',
  [ADMIN_NOTIFICATION.TYPES.SECURITY]: '#EF4444',
  [ADMIN_NOTIFICATION.TYPES.SYSTEM]: '#6B7280',
  [ADMIN_NOTIFICATION.TYPES.MAINTENANCE]: '#F97316',
  [ADMIN_NOTIFICATION.TYPES.REPORT]: '#8B5CF6',
  [ADMIN_NOTIFICATION.TYPES.ANALYTICS]: '#6366F1',
  [ADMIN_NOTIFICATION.TYPES.USER_ACTION]: '#3B82F6',
  [ADMIN_NOTIFICATION.TYPES.ADMIN_ACTION]: '#8B5CF6',
  [ADMIN_NOTIFICATION.TYPES.APPROVAL]: '#10B981',
  [ADMIN_NOTIFICATION.TYPES.REJECTION]: '#EF4444',
  [ADMIN_NOTIFICATION.TYPES.ESCALATION]: '#F97316',
  [ADMIN_NOTIFICATION.TYPES.RESOLUTION]: '#10B981',
};

export const ADMIN_NOTIFICATION_STATUS_LABELS: Record<AdminNotificationStatus, string> = {
  [ADMIN_NOTIFICATION.STATUSES.PENDING]: 'Pending',
  [ADMIN_NOTIFICATION.STATUSES.QUEUED]: 'Queued',
  [ADMIN_NOTIFICATION.STATUSES.SENT]: 'Sent',
  [ADMIN_NOTIFICATION.STATUSES.DELIVERED]: 'Delivered',
  [ADMIN_NOTIFICATION.STATUSES.READ]: 'Read',
  [ADMIN_NOTIFICATION.STATUSES.UNREAD]: 'Unread',
  [ADMIN_NOTIFICATION.STATUSES.VIEWED]: 'Viewed',
  [ADMIN_NOTIFICATION.STATUSES.CLICKED]: 'Clicked',
  [ADMIN_NOTIFICATION.STATUSES.ACTIONED]: 'Actioned',
  [ADMIN_NOTIFICATION.STATUSES.FAILED]: 'Failed',
  [ADMIN_NOTIFICATION.STATUSES.BOUNCED]: 'Bounced',
  [ADMIN_NOTIFICATION.STATUSES.REJECTED]: 'Rejected',
  [ADMIN_NOTIFICATION.STATUSES.EXPIRED]: 'Expired',
  [ADMIN_NOTIFICATION.STATUSES.CANCELLED]: 'Cancelled',
  [ADMIN_NOTIFICATION.STATUSES.DRAFT]: 'Draft',
  [ADMIN_NOTIFICATION.STATUSES.SCHEDULED]: 'Scheduled',
  [ADMIN_NOTIFICATION.STATUSES.PROCESSING]: 'Processing',
  [ADMIN_NOTIFICATION.STATUSES.RETRY]: 'Retry',
  [ADMIN_NOTIFICATION.STATUSES.SUPPRESSED]: 'Suppressed',
};

export const ADMIN_NOTIFICATION_STATUS_COLORS: Record<AdminNotificationStatus, string> = {
  [ADMIN_NOTIFICATION.STATUSES.PENDING]: '#F59E0B',
  [ADMIN_NOTIFICATION.STATUSES.QUEUED]: '#8B5CF6',
  [ADMIN_NOTIFICATION.STATUSES.SENT]: '#3B82F6',
  [ADMIN_NOTIFICATION.STATUSES.DELIVERED]: '#10B981',
  [ADMIN_NOTIFICATION.STATUSES.READ]: '#34D399',
  [ADMIN_NOTIFICATION.STATUSES.UNREAD]: '#6366F1',
  [ADMIN_NOTIFICATION.STATUSES.VIEWED]: '#6EE7B7',
  [ADMIN_NOTIFICATION.STATUSES.CLICKED]: '#60A5FA',
  [ADMIN_NOTIFICATION.STATUSES.ACTIONED]: '#34D399',
  [ADMIN_NOTIFICATION.STATUSES.FAILED]: '#EF4444',
  [ADMIN_NOTIFICATION.STATUSES.BOUNCED]: '#DC2626',
  [ADMIN_NOTIFICATION.STATUSES.REJECTED]: '#EF4444',
  [ADMIN_NOTIFICATION.STATUSES.EXPIRED]: '#9CA3AF',
  [ADMIN_NOTIFICATION.STATUSES.CANCELLED]: '#6B7280',
  [ADMIN_NOTIFICATION.STATUSES.DRAFT]: '#9CA3AF',
  [ADMIN_NOTIFICATION.STATUSES.SCHEDULED]: '#6366F1',
  [ADMIN_NOTIFICATION.STATUSES.PROCESSING]: '#8B5CF6',
  [ADMIN_NOTIFICATION.STATUSES.RETRY]: '#F59E0B',
  [ADMIN_NOTIFICATION.STATUSES.SUPPRESSED]: '#6B7280',
};

export const ADMIN_NOTIFICATION_PRIORITY_LABELS: Record<AdminNotificationPriority, string> = {
  [ADMIN_NOTIFICATION.PRIORITIES.LOW]: 'Low',
  [ADMIN_NOTIFICATION.PRIORITIES.MEDIUM]: 'Medium',
  [ADMIN_NOTIFICATION.PRIORITIES.HIGH]: 'High',
  [ADMIN_NOTIFICATION.PRIORITIES.URGENT]: 'Urgent',
  [ADMIN_NOTIFICATION.PRIORITIES.CRITICAL]: 'Critical',
};

export const ADMIN_NOTIFICATION_PRIORITY_LEVELS: Record<AdminNotificationPriority, number> = {
  [ADMIN_NOTIFICATION.PRIORITIES.LOW]: 1,
  [ADMIN_NOTIFICATION.PRIORITIES.MEDIUM]: 2,
  [ADMIN_NOTIFICATION.PRIORITIES.HIGH]: 3,
  [ADMIN_NOTIFICATION.PRIORITIES.URGENT]: 4,
  [ADMIN_NOTIFICATION.PRIORITIES.CRITICAL]: 5,
};

export const ADMIN_NOTIFICATION_CATEGORY_LABELS: Record<AdminNotificationCategory, string> = {
  [ADMIN_NOTIFICATION.CATEGORIES.SYSTEM]: 'System',
  [ADMIN_NOTIFICATION.CATEGORIES.SECURITY]: 'Security',
  [ADMIN_NOTIFICATION.CATEGORIES.BUSINESS]: 'Business',
  [ADMIN_NOTIFICATION.CATEGORIES.USER]: 'User',
  [ADMIN_NOTIFICATION.CATEGORIES.ADMIN]: 'Admin',
  [ADMIN_NOTIFICATION.CATEGORIES.MARKETING]: 'Marketing',
  [ADMIN_NOTIFICATION.CATEGORIES.TRANSACTIONAL]: 'Transactional',
  [ADMIN_NOTIFICATION.CATEGORIES.OPERATIONAL]: 'Operational',
  [ADMIN_NOTIFICATION.CATEGORIES.TECHNICAL]: 'Technical',
  [ADMIN_NOTIFICATION.CATEGORIES.COMPLIANCE]: 'Compliance',
};

export const ADMIN_NOTIFICATION_DELIVERY_LABELS: Record<AdminNotificationDelivery, string> = {
  [ADMIN_NOTIFICATION.DELIVERY.IMMEDIATE]: 'Immediate',
  [ADMIN_NOTIFICATION.DELIVERY.SCHEDULED]: 'Scheduled',
  [ADMIN_NOTIFICATION.DELIVERY.BATCHED]: 'Batched',
  [ADMIN_NOTIFICATION.DELIVERY.DIGEST]: 'Digest',
  [ADMIN_NOTIFICATION.DELIVERY.REAL_TIME]: 'Real-Time',
};

export const ADMIN_NOTIFICATION_ACTION_LABELS: Record<AdminNotificationAction, string> = {
  [ADMIN_NOTIFICATION.ACTIONS.VIEW]: 'View',
  [ADMIN_NOTIFICATION.ACTIONS.APPROVE]: 'Approve',
  [ADMIN_NOTIFICATION.ACTIONS.REJECT]: 'Reject',
  [ADMIN_NOTIFICATION.ACTIONS.RESOLVE]: 'Resolve',
  [ADMIN_NOTIFICATION.ACTIONS.ESCALATE]: 'Escalate',
  [ADMIN_NOTIFICATION.ACTIONS.IGNORE]: 'Ignore',
  [ADMIN_NOTIFICATION.ACTIONS.ARCHIVE]: 'Archive',
  [ADMIN_NOTIFICATION.ACTIONS.DELETE]: 'Delete',
  [ADMIN_NOTIFICATION.ACTIONS.MARK_READ]: 'Mark as Read',
  [ADMIN_NOTIFICATION.ACTIONS.MARK_UNREAD]: 'Mark as Unread',
  [ADMIN_NOTIFICATION.ACTIONS.REPLY]: 'Reply',
  [ADMIN_NOTIFICATION.ACTIONS.FORWARD]: 'Forward',
};

export function getAdminNotificationChannelLabel(channel: AdminNotificationChannel): string {
  return ADMIN_NOTIFICATION_CHANNEL_LABELS[channel] || 'Unknown Channel';
}

export function getAdminNotificationChannelIcon(channel: AdminNotificationChannel): string {
  return ADMIN_NOTIFICATION_CHANNEL_ICONS[channel] || '❓';
}

export function getAdminNotificationTypeLabel(type: AdminNotificationType): string {
  return ADMIN_NOTIFICATION_TYPE_LABELS[type] || 'Unknown Type';
}

export function getAdminNotificationTypeColor(type: AdminNotificationType): string {
  return ADMIN_NOTIFICATION_TYPE_COLORS[type] || '#6B7280';
}

export function getAdminNotificationStatusLabel(status: AdminNotificationStatus): string {
  return ADMIN_NOTIFICATION_STATUS_LABELS[status] || 'Unknown Status';
}

export function getAdminNotificationStatusColor(status: AdminNotificationStatus): string {
  return ADMIN_NOTIFICATION_STATUS_COLORS[status] || '#6B7280';
}

export function getAdminNotificationPriorityLabel(priority: AdminNotificationPriority): string {
  return ADMIN_NOTIFICATION_PRIORITY_LABELS[priority] || 'Unknown Priority';
}

export function getAdminNotificationPriorityLevel(priority: AdminNotificationPriority): number {
  return ADMIN_NOTIFICATION_PRIORITY_LEVELS[priority] || 0;
}

export function getAdminNotificationCategoryLabel(category: AdminNotificationCategory): string {
  return ADMIN_NOTIFICATION_CATEGORY_LABELS[category] || 'Unknown Category';
}

export function getAdminNotificationDeliveryLabel(delivery: AdminNotificationDelivery): string {
  return ADMIN_NOTIFICATION_DELIVERY_LABELS[delivery] || 'Unknown Delivery';
}

export function getAdminNotificationActionLabel(action: AdminNotificationAction): string {
  return ADMIN_NOTIFICATION_ACTION_LABELS[action] || 'Unknown Action';
}

export function isNotificationDelivered(status: AdminNotificationStatus): boolean {
  return (
    status === ADMIN_NOTIFICATION.STATUSES.DELIVERED ||
    status === ADMIN_NOTIFICATION.STATUSES.READ ||
    status === ADMIN_NOTIFICATION.STATUSES.VIEWED ||
    status === ADMIN_NOTIFICATION.STATUSES.CLICKED ||
    status === ADMIN_NOTIFICATION.STATUSES.ACTIONED
  );
}

export function isNotificationFailed(status: AdminNotificationStatus): boolean {
  return (
    status === ADMIN_NOTIFICATION.STATUSES.FAILED ||
    status === ADMIN_NOTIFICATION.STATUSES.BOUNCED ||
    status === ADMIN_NOTIFICATION.STATUSES.REJECTED
  );
}

export function isNotificationPending(status: AdminNotificationStatus): boolean {
  return (
    status === ADMIN_NOTIFICATION.STATUSES.PENDING ||
    status === ADMIN_NOTIFICATION.STATUSES.QUEUED ||
    status === ADMIN_NOTIFICATION.STATUSES.PROCESSING ||
    status === ADMIN_NOTIFICATION.STATUSES.RETRY
  );
}

export function isNotificationRead(status: AdminNotificationStatus): boolean {
  return (
    status === ADMIN_NOTIFICATION.STATUSES.READ ||
    status === ADMIN_NOTIFICATION.STATUSES.VIEWED ||
    status === ADMIN_NOTIFICATION.STATUSES.CLICKED ||
    status === ADMIN_NOTIFICATION.STATUSES.ACTIONED
  );
}

export function getNotificationTimeout(channel: AdminNotificationChannel): number {
  const timeoutMap: Record<AdminNotificationChannel, number> = {
    [ADMIN_NOTIFICATION.CHANNELS.EMAIL]: ADMIN_NOTIFICATION.TIMEOUTS.EMAIL,
    [ADMIN_NOTIFICATION.CHANNELS.SMS]: ADMIN_NOTIFICATION.TIMEOUTS.SMS,
    [ADMIN_NOTIFICATION.CHANNELS.PUSH]: ADMIN_NOTIFICATION.TIMEOUTS.PUSH,
    [ADMIN_NOTIFICATION.CHANNELS.IN_APP]: ADMIN_NOTIFICATION.TIMEOUTS.IN_APP,
    [ADMIN_NOTIFICATION.CHANNELS.WEBHOOK]: ADMIN_NOTIFICATION.TIMEOUTS.WEBHOOK,
    [ADMIN_NOTIFICATION.CHANNELS.SLACK]: ADMIN_NOTIFICATION.TIMEOUTS.SLACK,
    [ADMIN_NOTIFICATION.CHANNELS.TEAMS]: ADMIN_NOTIFICATION.TIMEOUTS.SLACK,
    [ADMIN_NOTIFICATION.CHANNELS.DISCORD]: ADMIN_NOTIFICATION.TIMEOUTS.SLACK,
    [ADMIN_NOTIFICATION.CHANNELS.TELEGRAM]: ADMIN_NOTIFICATION.TIMEOUTS.SLACK,
    [ADMIN_NOTIFICATION.CHANNELS.WHATSAPP]: ADMIN_NOTIFICATION.TIMEOUTS.SMS,
    [ADMIN_NOTIFICATION.CHANNELS.CALL]: ADMIN_NOTIFICATION.TIMEOUTS.SMS,
    [ADMIN_NOTIFICATION.CHANNELS.FAX]: ADMIN_NOTIFICATION.TIMEOUTS.EMAIL,
    [ADMIN_NOTIFICATION.CHANNELS.MAIL]: ADMIN_NOTIFICATION.TIMEOUTS.EMAIL,
  };
  return timeoutMap[channel] || ADMIN_NOTIFICATION.TIMEOUTS.EMAIL;
}

export function getNotificationTemplateLabel(template: AdminNotificationTemplate): string {
  const labels: Record<AdminNotificationTemplate, string> = {
    [ADMIN_NOTIFICATION.TEMPLATES.WELCOME]: 'Welcome Email',
    [ADMIN_NOTIFICATION.TEMPLATES.PASSWORD_RESET]: 'Password Reset',
    [ADMIN_NOTIFICATION.TEMPLATES.EMAIL_VERIFICATION]: 'Email Verification',
    [ADMIN_NOTIFICATION.TEMPLATES.TWO_FA]: 'Two-Factor Authentication',
    [ADMIN_NOTIFICATION.TEMPLATES.LOGIN_ALERT]: 'Login Alert',
    [ADMIN_NOTIFICATION.TEMPLATES.DEVICE_ADDED]: 'Device Added',
    [ADMIN_NOTIFICATION.TEMPLATES.ORDER_CONFIRMATION]: 'Order Confirmation',
    [ADMIN_NOTIFICATION.TEMPLATES.ORDER_SHIPPED]: 'Order Shipped',
    [ADMIN_NOTIFICATION.TEMPLATES.ORDER_DELIVERED]: 'Order Delivered',
    [ADMIN_NOTIFICATION.TEMPLATES.PAYMENT_RECEIVED]: 'Payment Received',
    [ADMIN_NOTIFICATION.TEMPLATES.PAYMENT_FAILED]: 'Payment Failed',
    [ADMIN_NOTIFICATION.TEMPLATES.REFUND_PROCESSED]: 'Refund Processed',
    [ADMIN_NOTIFICATION.TEMPLATES.SUBSCRIPTION_RENEWAL]: 'Subscription Renewal',
    [ADMIN_NOTIFICATION.TEMPLATES.SUBSCRIPTION_EXPIRY]: 'Subscription Expiry',
    [ADMIN_NOTIFICATION.TEMPLATES.ACCOUNT_SUSPENDED]: 'Account Suspended',
    [ADMIN_NOTIFICATION.TEMPLATES.ACCOUNT_REACTIVATED]: 'Account Reactivated',
    [ADMIN_NOTIFICATION.TEMPLATES.REPORT_READY]: 'Report Ready',
    [ADMIN_NOTIFICATION.TEMPLATES.MAINTENANCE_SCHEDULED]: 'Maintenance Scheduled',
    [ADMIN_NOTIFICATION.TEMPLATES.MAINTENANCE_COMPLETED]: 'Maintenance Completed',
    [ADMIN_NOTIFICATION.TEMPLATES.SECURITY_ALERT]: 'Security Alert',
    [ADMIN_NOTIFICATION.TEMPLATES.SYSTEM_UPDATE]: 'System Update',
    [ADMIN_NOTIFICATION.TEMPLATES.NEW_COMMENT]: 'New Comment',
    [ADMIN_NOTIFICATION.TEMPLATES.MENTION]: 'Mention',
    [ADMIN_NOTIFICATION.TEMPLATES.APPROVAL_REQUEST]: 'Approval Request',
    [ADMIN_NOTIFICATION.TEMPLATES.APPROVAL_GRANTED]: 'Approval Granted',
    [ADMIN_NOTIFICATION.TEMPLATES.APPROVAL_DENIED]: 'Approval Denied',
  };
  return labels[template] || 'Unknown Template';
}
