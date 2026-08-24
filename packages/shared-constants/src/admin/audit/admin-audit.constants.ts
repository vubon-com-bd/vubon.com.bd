/**
 * Admin Audit Constants
 * Admin audit trail and compliance definitions
 */

export const ADMIN_AUDIT = {
  // Audit actions
  ACTIONS: {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    VIEW: 'view',
    EXPORT: 'export',
    IMPORT: 'import',
    APPROVE: 'approve',
    REJECT: 'reject',
    PUBLISH: 'publish',
    UNPUBLISH: 'unpublish',
    ARCHIVE: 'archive',
    RESTORE: 'restore',
    ASSIGN: 'assign',
    UNASSIGN: 'unassign',
    SUSPEND: 'suspend',
    UNSUSPEND: 'unsuspend',
    BAN: 'ban',
    UNBAN: 'unban',
    VERIFY: 'verify',
    UNVERIFY: 'unverify',
    LOCK: 'lock',
    UNLOCK: 'unlock',
    RESET: 'reset',
    CHANGE: 'change',
    TRANSFER: 'transfer',
    MERGE: 'merge',
    SPLIT: 'split',
    CANCEL: 'cancel',
    REFUND: 'refund',
    SHIP: 'ship',
    DELIVER: 'deliver',
    RETURN: 'return',
    PAYMENT: 'payment',
    SETTLEMENT: 'settlement',
    RECONCILE: 'reconcile',
    REVIEW: 'review',
    COMMENT: 'comment',
    NOTE: 'note',
    TAG: 'tag',
    UNTAG: 'untag',
    SHARE: 'share',
    UNSHARE: 'unshare',
    DOWNLOAD: 'download',
    UPLOAD: 'upload',
    SYNC: 'sync',
    BACKUP: 'backup',
    RESTORE_SYSTEM: 'restore_system',
    MAINTENANCE: 'maintenance',
    UPGRADE: 'upgrade',
    CONFIGURE: 'configure',
    INSTALL: 'install',
    UNINSTALL: 'uninstall',
    ENABLE: 'enable',
    DISABLE: 'disable',
    START: 'start',
    STOP: 'stop',
    PAUSE: 'pause',
    RESUME: 'resume',
    SCHEDULE: 'schedule',
    UNSCHEDULE: 'unschedule',
    NOTIFY: 'notify',
    ALERT: 'alert',
    ESCALATE: 'escalate',
    RESOLVE: 'resolve',
    CLOSE: 'close',
    REOPEN: 'reopen',
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
    VERIFY_EMAIL: 'verify_email',
    RESET_PASSWORD: 'reset_password',
    CHANGE_PASSWORD: 'change_password',
    TWO_FA: 'two_fa',
    PERMISSION_CHANGE: 'permission_change',
    ROLE_CHANGE: 'role_change',
    PROFILE_UPDATE: 'profile_update',
    SETTINGS_UPDATE: 'settings_update',
  },

  // Audit severity
  SEVERITY: {
    INFO: 'info',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Audit categories
  CATEGORIES: {
    AUTHENTICATION: 'authentication',
    AUTHORIZATION: 'authorization',
    USER_MANAGEMENT: 'user_management',
    ADMIN_MANAGEMENT: 'admin_management',
    CONTENT_MANAGEMENT: 'content_management',
    PRODUCT_MANAGEMENT: 'product_management',
    ORDER_MANAGEMENT: 'order_management',
    PAYMENT_MANAGEMENT: 'payment_management',
    SYSTEM_MANAGEMENT: 'system_management',
    CONFIGURATION: 'configuration',
    MAINTENANCE: 'maintenance',
    SECURITY: 'security',
    DATA: 'data',
    REPORTING: 'reporting',
    ANALYTICS: 'analytics',
    SUPPORT: 'support',
    LOGISTICS: 'logistics',
    VENDOR_MANAGEMENT: 'vendor_management',
    MARKETING: 'marketing',
    NOTIFICATION: 'notification',
    COMPLIANCE: 'compliance',
    LEGAL: 'legal',
    FINANCE: 'finance',
    HR: 'hr',
  },

  // Audit status
  STATUSES: {
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ERROR: 'error',
    TIMEOUT: 'timeout',
    RETRY: 'retry',
    SKIPPED: 'skipped',
    ABORTED: 'aborted',
    INITIATED: 'initiated',
    QUEUED: 'queued',
    RUNNING: 'running',
    PAUSED: 'paused',
    RESUMED: 'resumed',
    STOPPED: 'stopped',
    EXPIRED: 'expired',
    REJECTED: 'rejected',
    APPROVED: 'approved',
    VERIFIED: 'verified',
    VALIDATED: 'validated',
    AUTHENTICATED: 'authenticated',
    AUTHORIZED: 'authorized',
    DECLINED: 'declined',
    ACCEPTED: 'accepted',
    RECEIVED: 'received',
    PROCESSED: 'processed',
  },

  // Audit sources
  SOURCES: {
    WEB: 'web',
    MOBILE: 'mobile',
    API: 'api',
    CLI: 'cli',
    CRON: 'cron',
    QUEUE: 'queue',
    WEBHOOK: 'webhook',
    EVENT: 'event',
    SYSTEM: 'system',
    EXTERNAL: 'external',
    INTERNAL: 'internal',
  },

  // Audit retention
  RETENTION: {
    DAYS_7: 7,
    DAYS_14: 14,
    DAYS_30: 30,
    DAYS_60: 60,
    DAYS_90: 90,
    DAYS_180: 180,
    DAYS_365: 365,
    FOREVER: -1,
  },
} as const;

export type AdminAuditAction = (typeof ADMIN_AUDIT.ACTIONS)[keyof typeof ADMIN_AUDIT.ACTIONS];
export type AdminAuditSeverity = (typeof ADMIN_AUDIT.SEVERITY)[keyof typeof ADMIN_AUDIT.SEVERITY];
export type AdminAuditCategory =
  (typeof ADMIN_AUDIT.CATEGORIES)[keyof typeof ADMIN_AUDIT.CATEGORIES];
export type AdminAuditStatus = (typeof ADMIN_AUDIT.STATUSES)[keyof typeof ADMIN_AUDIT.STATUSES];
export type AdminAuditSource = (typeof ADMIN_AUDIT.SOURCES)[keyof typeof ADMIN_AUDIT.SOURCES];
export type AdminAuditRetention =
  (typeof ADMIN_AUDIT.RETENTION)[keyof typeof ADMIN_AUDIT.RETENTION];

export const ADMIN_AUDIT_ACTION_LABELS: Record<AdminAuditAction, string> = {
  [ADMIN_AUDIT.ACTIONS.CREATE]: 'Create',
  [ADMIN_AUDIT.ACTIONS.UPDATE]: 'Update',
  [ADMIN_AUDIT.ACTIONS.DELETE]: 'Delete',
  [ADMIN_AUDIT.ACTIONS.VIEW]: 'View',
  [ADMIN_AUDIT.ACTIONS.EXPORT]: 'Export',
  [ADMIN_AUDIT.ACTIONS.IMPORT]: 'Import',
  [ADMIN_AUDIT.ACTIONS.APPROVE]: 'Approve',
  [ADMIN_AUDIT.ACTIONS.REJECT]: 'Reject',
  [ADMIN_AUDIT.ACTIONS.PUBLISH]: 'Publish',
  [ADMIN_AUDIT.ACTIONS.UNPUBLISH]: 'Unpublish',
  [ADMIN_AUDIT.ACTIONS.ARCHIVE]: 'Archive',
  [ADMIN_AUDIT.ACTIONS.RESTORE]: 'Restore',
  [ADMIN_AUDIT.ACTIONS.ASSIGN]: 'Assign',
  [ADMIN_AUDIT.ACTIONS.UNASSIGN]: 'Unassign',
  [ADMIN_AUDIT.ACTIONS.SUSPEND]: 'Suspend',
  [ADMIN_AUDIT.ACTIONS.UNSUSPEND]: 'Unsuspend',
  [ADMIN_AUDIT.ACTIONS.BAN]: 'Ban',
  [ADMIN_AUDIT.ACTIONS.UNBAN]: 'Unban',
  [ADMIN_AUDIT.ACTIONS.VERIFY]: 'Verify',
  [ADMIN_AUDIT.ACTIONS.UNVERIFY]: 'Unverify',
  [ADMIN_AUDIT.ACTIONS.LOCK]: 'Lock',
  [ADMIN_AUDIT.ACTIONS.UNLOCK]: 'Unlock',
  [ADMIN_AUDIT.ACTIONS.RESET]: 'Reset',
  [ADMIN_AUDIT.ACTIONS.CHANGE]: 'Change',
  [ADMIN_AUDIT.ACTIONS.TRANSFER]: 'Transfer',
  [ADMIN_AUDIT.ACTIONS.MERGE]: 'Merge',
  [ADMIN_AUDIT.ACTIONS.SPLIT]: 'Split',
  [ADMIN_AUDIT.ACTIONS.CANCEL]: 'Cancel',
  [ADMIN_AUDIT.ACTIONS.REFUND]: 'Refund',
  [ADMIN_AUDIT.ACTIONS.SHIP]: 'Ship',
  [ADMIN_AUDIT.ACTIONS.DELIVER]: 'Deliver',
  [ADMIN_AUDIT.ACTIONS.RETURN]: 'Return',
  [ADMIN_AUDIT.ACTIONS.PAYMENT]: 'Payment',
  [ADMIN_AUDIT.ACTIONS.SETTLEMENT]: 'Settlement',
  [ADMIN_AUDIT.ACTIONS.RECONCILE]: 'Reconcile',
  [ADMIN_AUDIT.ACTIONS.REVIEW]: 'Review',
  [ADMIN_AUDIT.ACTIONS.COMMENT]: 'Comment',
  [ADMIN_AUDIT.ACTIONS.NOTE]: 'Note',
  [ADMIN_AUDIT.ACTIONS.TAG]: 'Tag',
  [ADMIN_AUDIT.ACTIONS.UNTAG]: 'Untag',
  [ADMIN_AUDIT.ACTIONS.SHARE]: 'Share',
  [ADMIN_AUDIT.ACTIONS.UNSHARE]: 'Unshare',
  [ADMIN_AUDIT.ACTIONS.DOWNLOAD]: 'Download',
  [ADMIN_AUDIT.ACTIONS.UPLOAD]: 'Upload',
  [ADMIN_AUDIT.ACTIONS.SYNC]: 'Sync',
  [ADMIN_AUDIT.ACTIONS.BACKUP]: 'Backup',
  [ADMIN_AUDIT.ACTIONS.RESTORE_SYSTEM]: 'Restore System',
  [ADMIN_AUDIT.ACTIONS.MAINTENANCE]: 'Maintenance',
  [ADMIN_AUDIT.ACTIONS.UPGRADE]: 'Upgrade',
  [ADMIN_AUDIT.ACTIONS.CONFIGURE]: 'Configure',
  [ADMIN_AUDIT.ACTIONS.INSTALL]: 'Install',
  [ADMIN_AUDIT.ACTIONS.UNINSTALL]: 'Uninstall',
  [ADMIN_AUDIT.ACTIONS.ENABLE]: 'Enable',
  [ADMIN_AUDIT.ACTIONS.DISABLE]: 'Disable',
  [ADMIN_AUDIT.ACTIONS.START]: 'Start',
  [ADMIN_AUDIT.ACTIONS.STOP]: 'Stop',
  [ADMIN_AUDIT.ACTIONS.PAUSE]: 'Pause',
  [ADMIN_AUDIT.ACTIONS.RESUME]: 'Resume',
  [ADMIN_AUDIT.ACTIONS.SCHEDULE]: 'Schedule',
  [ADMIN_AUDIT.ACTIONS.UNSCHEDULE]: 'Unschedule',
  [ADMIN_AUDIT.ACTIONS.NOTIFY]: 'Notify',
  [ADMIN_AUDIT.ACTIONS.ALERT]: 'Alert',
  [ADMIN_AUDIT.ACTIONS.ESCALATE]: 'Escalate',
  [ADMIN_AUDIT.ACTIONS.RESOLVE]: 'Resolve',
  [ADMIN_AUDIT.ACTIONS.CLOSE]: 'Close',
  [ADMIN_AUDIT.ACTIONS.REOPEN]: 'Reopen',
  [ADMIN_AUDIT.ACTIONS.LOGIN]: 'Login',
  [ADMIN_AUDIT.ACTIONS.LOGOUT]: 'Logout',
  [ADMIN_AUDIT.ACTIONS.REGISTER]: 'Register',
  [ADMIN_AUDIT.ACTIONS.VERIFY_EMAIL]: 'Verify Email',
  [ADMIN_AUDIT.ACTIONS.RESET_PASSWORD]: 'Reset Password',
  [ADMIN_AUDIT.ACTIONS.CHANGE_PASSWORD]: 'Change Password',
  [ADMIN_AUDIT.ACTIONS.TWO_FA]: 'Two Factor Auth',
  [ADMIN_AUDIT.ACTIONS.PERMISSION_CHANGE]: 'Permission Change',
  [ADMIN_AUDIT.ACTIONS.ROLE_CHANGE]: 'Role Change',
  [ADMIN_AUDIT.ACTIONS.PROFILE_UPDATE]: 'Profile Update',
  [ADMIN_AUDIT.ACTIONS.SETTINGS_UPDATE]: 'Settings Update',
};

export const ADMIN_AUDIT_SEVERITY_LABELS: Record<AdminAuditSeverity, string> = {
  [ADMIN_AUDIT.SEVERITY.INFO]: 'Info',
  [ADMIN_AUDIT.SEVERITY.LOW]: 'Low',
  [ADMIN_AUDIT.SEVERITY.MEDIUM]: 'Medium',
  [ADMIN_AUDIT.SEVERITY.HIGH]: 'High',
  [ADMIN_AUDIT.SEVERITY.CRITICAL]: 'Critical',
};

export const ADMIN_AUDIT_SEVERITY_COLORS: Record<AdminAuditSeverity, string> = {
  [ADMIN_AUDIT.SEVERITY.INFO]: '#3498DB',
  [ADMIN_AUDIT.SEVERITY.LOW]: '#2ECC71',
  [ADMIN_AUDIT.SEVERITY.MEDIUM]: '#F39C12',
  [ADMIN_AUDIT.SEVERITY.HIGH]: '#E67E22',
  [ADMIN_AUDIT.SEVERITY.CRITICAL]: '#E74C3C',
};

export const ADMIN_AUDIT_SEVERITY_PRIORITY: Record<AdminAuditSeverity, number> = {
  [ADMIN_AUDIT.SEVERITY.INFO]: 1,
  [ADMIN_AUDIT.SEVERITY.LOW]: 2,
  [ADMIN_AUDIT.SEVERITY.MEDIUM]: 3,
  [ADMIN_AUDIT.SEVERITY.HIGH]: 4,
  [ADMIN_AUDIT.SEVERITY.CRITICAL]: 5,
};

export const ADMIN_AUDIT_CATEGORY_LABELS: Record<AdminAuditCategory, string> = {
  [ADMIN_AUDIT.CATEGORIES.AUTHENTICATION]: 'Authentication',
  [ADMIN_AUDIT.CATEGORIES.AUTHORIZATION]: 'Authorization',
  [ADMIN_AUDIT.CATEGORIES.USER_MANAGEMENT]: 'User Management',
  [ADMIN_AUDIT.CATEGORIES.ADMIN_MANAGEMENT]: 'Admin Management',
  [ADMIN_AUDIT.CATEGORIES.CONTENT_MANAGEMENT]: 'Content Management',
  [ADMIN_AUDIT.CATEGORIES.PRODUCT_MANAGEMENT]: 'Product Management',
  [ADMIN_AUDIT.CATEGORIES.ORDER_MANAGEMENT]: 'Order Management',
  [ADMIN_AUDIT.CATEGORIES.PAYMENT_MANAGEMENT]: 'Payment Management',
  [ADMIN_AUDIT.CATEGORIES.SYSTEM_MANAGEMENT]: 'System Management',
  [ADMIN_AUDIT.CATEGORIES.CONFIGURATION]: 'Configuration',
  [ADMIN_AUDIT.CATEGORIES.MAINTENANCE]: 'Maintenance',
  [ADMIN_AUDIT.CATEGORIES.SECURITY]: 'Security',
  [ADMIN_AUDIT.CATEGORIES.DATA]: 'Data',
  [ADMIN_AUDIT.CATEGORIES.REPORTING]: 'Reporting',
  [ADMIN_AUDIT.CATEGORIES.ANALYTICS]: 'Analytics',
  [ADMIN_AUDIT.CATEGORIES.SUPPORT]: 'Support',
  [ADMIN_AUDIT.CATEGORIES.LOGISTICS]: 'Logistics',
  [ADMIN_AUDIT.CATEGORIES.VENDOR_MANAGEMENT]: 'Vendor Management',
  [ADMIN_AUDIT.CATEGORIES.MARKETING]: 'Marketing',
  [ADMIN_AUDIT.CATEGORIES.NOTIFICATION]: 'Notification',
  [ADMIN_AUDIT.CATEGORIES.COMPLIANCE]: 'Compliance',
  [ADMIN_AUDIT.CATEGORIES.LEGAL]: 'Legal',
  [ADMIN_AUDIT.CATEGORIES.FINANCE]: 'Finance',
  [ADMIN_AUDIT.CATEGORIES.HR]: 'Human Resources',
};

export const ADMIN_AUDIT_STATUS_LABELS: Record<AdminAuditStatus, string> = {
  [ADMIN_AUDIT.STATUSES.SUCCESS]: 'Success',
  [ADMIN_AUDIT.STATUSES.FAILED]: 'Failed',
  [ADMIN_AUDIT.STATUSES.PENDING]: 'Pending',
  [ADMIN_AUDIT.STATUSES.PROCESSING]: 'Processing',
  [ADMIN_AUDIT.STATUSES.COMPLETED]: 'Completed',
  [ADMIN_AUDIT.STATUSES.CANCELLED]: 'Cancelled',
  [ADMIN_AUDIT.STATUSES.ERROR]: 'Error',
  [ADMIN_AUDIT.STATUSES.TIMEOUT]: 'Timeout',
  [ADMIN_AUDIT.STATUSES.RETRY]: 'Retry',
  [ADMIN_AUDIT.STATUSES.SKIPPED]: 'Skipped',
  [ADMIN_AUDIT.STATUSES.ABORTED]: 'Aborted',
  [ADMIN_AUDIT.STATUSES.INITIATED]: 'Initiated',
  [ADMIN_AUDIT.STATUSES.QUEUED]: 'Queued',
  [ADMIN_AUDIT.STATUSES.RUNNING]: 'Running',
  [ADMIN_AUDIT.STATUSES.PAUSED]: 'Paused',
  [ADMIN_AUDIT.STATUSES.RESUMED]: 'Resumed',
  [ADMIN_AUDIT.STATUSES.STOPPED]: 'Stopped',
  [ADMIN_AUDIT.STATUSES.EXPIRED]: 'Expired',
  [ADMIN_AUDIT.STATUSES.REJECTED]: 'Rejected',
  [ADMIN_AUDIT.STATUSES.APPROVED]: 'Approved',
  [ADMIN_AUDIT.STATUSES.VERIFIED]: 'Verified',
  [ADMIN_AUDIT.STATUSES.VALIDATED]: 'Validated',
  [ADMIN_AUDIT.STATUSES.AUTHENTICATED]: 'Authenticated',
  [ADMIN_AUDIT.STATUSES.AUTHORIZED]: 'Authorized',
  [ADMIN_AUDIT.STATUSES.DECLINED]: 'Declined',
  [ADMIN_AUDIT.STATUSES.ACCEPTED]: 'Accepted',
  [ADMIN_AUDIT.STATUSES.RECEIVED]: 'Received',
  [ADMIN_AUDIT.STATUSES.PROCESSED]: 'Processed',
};

export const ADMIN_AUDIT_STATUS_COLORS: Record<AdminAuditStatus, string> = {
  [ADMIN_AUDIT.STATUSES.SUCCESS]: '#10B981',
  [ADMIN_AUDIT.STATUSES.FAILED]: '#EF4444',
  [ADMIN_AUDIT.STATUSES.PENDING]: '#F59E0B',
  [ADMIN_AUDIT.STATUSES.PROCESSING]: '#3B82F6',
  [ADMIN_AUDIT.STATUSES.COMPLETED]: '#34D399',
  [ADMIN_AUDIT.STATUSES.CANCELLED]: '#6B7280',
  [ADMIN_AUDIT.STATUSES.ERROR]: '#DC2626',
  [ADMIN_AUDIT.STATUSES.TIMEOUT]: '#F97316',
  [ADMIN_AUDIT.STATUSES.RETRY]: '#8B5CF6',
  [ADMIN_AUDIT.STATUSES.SKIPPED]: '#9CA3AF',
  [ADMIN_AUDIT.STATUSES.ABORTED]: '#7F1D1D',
  [ADMIN_AUDIT.STATUSES.INITIATED]: '#93C5FD',
  [ADMIN_AUDIT.STATUSES.QUEUED]: '#A7F3D0',
  [ADMIN_AUDIT.STATUSES.RUNNING]: '#34D399',
  [ADMIN_AUDIT.STATUSES.PAUSED]: '#FCD34D',
  [ADMIN_AUDIT.STATUSES.RESUMED]: '#6EE7B7',
  [ADMIN_AUDIT.STATUSES.STOPPED]: '#D1D5DB',
  [ADMIN_AUDIT.STATUSES.EXPIRED]: '#9CA3AF',
  [ADMIN_AUDIT.STATUSES.REJECTED]: '#EF4444',
  [ADMIN_AUDIT.STATUSES.APPROVED]: '#10B981',
  [ADMIN_AUDIT.STATUSES.VERIFIED]: '#34D399',
  [ADMIN_AUDIT.STATUSES.VALIDATED]: '#60A5FA',
  [ADMIN_AUDIT.STATUSES.AUTHENTICATED]: '#818CF8',
  [ADMIN_AUDIT.STATUSES.AUTHORIZED]: '#A78BFA',
  [ADMIN_AUDIT.STATUSES.DECLINED]: '#F87171',
  [ADMIN_AUDIT.STATUSES.ACCEPTED]: '#6EE7B7',
  [ADMIN_AUDIT.STATUSES.RECEIVED]: '#93C5FD',
  [ADMIN_AUDIT.STATUSES.PROCESSED]: '#34D399',
};

export const ADMIN_AUDIT_SOURCE_LABELS: Record<AdminAuditSource, string> = {
  [ADMIN_AUDIT.SOURCES.WEB]: 'Web Application',
  [ADMIN_AUDIT.SOURCES.MOBILE]: 'Mobile Application',
  [ADMIN_AUDIT.SOURCES.API]: 'API',
  [ADMIN_AUDIT.SOURCES.CLI]: 'Command Line',
  [ADMIN_AUDIT.SOURCES.CRON]: 'Cron Job',
  [ADMIN_AUDIT.SOURCES.QUEUE]: 'Queue Worker',
  [ADMIN_AUDIT.SOURCES.WEBHOOK]: 'Webhook',
  [ADMIN_AUDIT.SOURCES.EVENT]: 'Event Listener',
  [ADMIN_AUDIT.SOURCES.SYSTEM]: 'System',
  [ADMIN_AUDIT.SOURCES.EXTERNAL]: 'External',
  [ADMIN_AUDIT.SOURCES.INTERNAL]: 'Internal',
};

export function getAdminAuditActionLabel(action: AdminAuditAction): string {
  return ADMIN_AUDIT_ACTION_LABELS[action] || 'Unknown Action';
}

export function getAdminAuditSeverityLabel(severity: AdminAuditSeverity): string {
  return ADMIN_AUDIT_SEVERITY_LABELS[severity] || 'Unknown Severity';
}

export function getAdminAuditSeverityColor(severity: AdminAuditSeverity): string {
  return ADMIN_AUDIT_SEVERITY_COLORS[severity] || '#6B7280';
}

export function getAdminAuditSeverityPriority(severity: AdminAuditSeverity): number {
  return ADMIN_AUDIT_SEVERITY_PRIORITY[severity] || 0;
}

export function getAdminAuditCategoryLabel(category: AdminAuditCategory): string {
  return ADMIN_AUDIT_CATEGORY_LABELS[category] || 'Unknown Category';
}

export function getAdminAuditStatusLabel(status: AdminAuditStatus): string {
  return ADMIN_AUDIT_STATUS_LABELS[status] || 'Unknown Status';
}

export function getAdminAuditStatusColor(status: AdminAuditStatus): string {
  return ADMIN_AUDIT_STATUS_COLORS[status] || '#6B7280';
}

export function getAdminAuditSourceLabel(source: AdminAuditSource): string {
  return ADMIN_AUDIT_SOURCE_LABELS[source] || 'Unknown Source';
}

export function isAdminAuditHighSeverity(severity: AdminAuditSeverity): boolean {
  return severity === ADMIN_AUDIT.SEVERITY.HIGH || severity === ADMIN_AUDIT.SEVERITY.CRITICAL;
}

export function isAdminAuditSuccessStatus(status: AdminAuditStatus): boolean {
  return (
    status === ADMIN_AUDIT.STATUSES.SUCCESS ||
    status === ADMIN_AUDIT.STATUSES.COMPLETED ||
    status === ADMIN_AUDIT.STATUSES.APPROVED ||
    status === ADMIN_AUDIT.STATUSES.VERIFIED
  );
}

export function isAdminAuditFailureStatus(status: AdminAuditStatus): boolean {
  return (
    status === ADMIN_AUDIT.STATUSES.FAILED ||
    status === ADMIN_AUDIT.STATUSES.ERROR ||
    status === ADMIN_AUDIT.STATUSES.TIMEOUT ||
    status === ADMIN_AUDIT.STATUSES.REJECTED
  );
}

export function isAdminAuditPendingStatus(status: AdminAuditStatus): boolean {
  return (
    status === ADMIN_AUDIT.STATUSES.PENDING ||
    status === ADMIN_AUDIT.STATUSES.PROCESSING ||
    status === ADMIN_AUDIT.STATUSES.INITIATED ||
    status === ADMIN_AUDIT.STATUSES.QUEUED ||
    status === ADMIN_AUDIT.STATUSES.RUNNING
  );
}

export function getAdminAuditRetentionDays(retention: AdminAuditRetention): number {
  return retention;
}
