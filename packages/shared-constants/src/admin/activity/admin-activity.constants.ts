/**
 * Admin Activity Constants
 * Admin activity logging and tracking definitions
 */

export const ADMIN_ACTIVITY = {
  // Activity types
  TYPES: {
    LOGIN: 'login',
    LOGOUT: 'logout',
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
    FEATURE: 'feature',
    UNFEATURE: 'unfeature',
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
    AUDIT: 'audit',
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
  },

  // Activity statuses
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
    SCHEDULED: 'scheduled',
    IN_PROGRESS: 'in_progress',
    PARTIAL: 'partial',
    SKIPPED: 'skipped',
    ABORTED: 'aborted',
  },

  // Activity severity
  SEVERITY: {
    DEBUG: 'debug',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    EMERGENCY: 'emergency',
  },

  // Activity categories
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
    AUDIT: 'audit',
    REPORTING: 'reporting',
    ANALYTICS: 'analytics',
    SUPPORT: 'support',
    LOGISTICS: 'logistics',
    VENDOR_MANAGEMENT: 'vendor_management',
    MARKETING: 'marketing',
    NOTIFICATION: 'notification',
  },

  // Activity sources
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

  // Activity actions
  ACTIONS: {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
    EXECUTE: 'execute',
    PROCESS: 'process',
    GENERATE: 'generate',
    ANALYZE: 'analyze',
    VALIDATE: 'validate',
    AUTHORIZE: 'authorize',
    AUTHENTICATE: 'authenticate',
    ENCRYPT: 'encrypt',
    DECRYPT: 'decrypt',
    SIGN: 'sign',
    VERIFY_SIGNATURE: 'verify_signature',
    HASH: 'hash',
    COMPARE: 'compare',
    CHECK: 'check',
    TEST: 'test',
    DEPLOY: 'deploy',
    ROLLBACK: 'rollback',
    MIGRATE: 'migrate',
    SEED: 'seed',
    CLEAR: 'clear',
    PURGE: 'purge',
    OPTIMIZE: 'optimize',
    COMPRESS: 'compress',
    EXTRACT: 'extract',
    CONVERT: 'convert',
    TRANSFORM: 'transform',
    FILTER: 'filter',
    SORT: 'sort',
    GROUP: 'group',
    AGGREGATE: 'aggregate',
    CALCULATE: 'calculate',
    ESTIMATE: 'estimate',
    PREDICT: 'predict',
    RECOMMEND: 'recommend',
    PERSONALIZE: 'personalize',
    CUSTOMIZE: 'customize',
    LOCALIZE: 'localize',
    TRANSLATE: 'translate',
  },
} as const;

export type AdminActivityType = (typeof ADMIN_ACTIVITY.TYPES)[keyof typeof ADMIN_ACTIVITY.TYPES];
export type AdminActivityStatus =
  (typeof ADMIN_ACTIVITY.STATUSES)[keyof typeof ADMIN_ACTIVITY.STATUSES];
export type AdminActivitySeverity =
  (typeof ADMIN_ACTIVITY.SEVERITY)[keyof typeof ADMIN_ACTIVITY.SEVERITY];
export type AdminActivityCategory =
  (typeof ADMIN_ACTIVITY.CATEGORIES)[keyof typeof ADMIN_ACTIVITY.CATEGORIES];
export type AdminActivitySource =
  (typeof ADMIN_ACTIVITY.SOURCES)[keyof typeof ADMIN_ACTIVITY.SOURCES];
export type AdminActivityAction =
  (typeof ADMIN_ACTIVITY.ACTIONS)[keyof typeof ADMIN_ACTIVITY.ACTIONS];

export const ADMIN_ACTIVITY_TYPE_LABELS: Record<AdminActivityType, string> = {
  [ADMIN_ACTIVITY.TYPES.LOGIN]: 'Login',
  [ADMIN_ACTIVITY.TYPES.LOGOUT]: 'Logout',
  [ADMIN_ACTIVITY.TYPES.CREATE]: 'Create',
  [ADMIN_ACTIVITY.TYPES.UPDATE]: 'Update',
  [ADMIN_ACTIVITY.TYPES.DELETE]: 'Delete',
  [ADMIN_ACTIVITY.TYPES.VIEW]: 'View',
  [ADMIN_ACTIVITY.TYPES.EXPORT]: 'Export',
  [ADMIN_ACTIVITY.TYPES.IMPORT]: 'Import',
  [ADMIN_ACTIVITY.TYPES.APPROVE]: 'Approve',
  [ADMIN_ACTIVITY.TYPES.REJECT]: 'Reject',
  [ADMIN_ACTIVITY.TYPES.PUBLISH]: 'Publish',
  [ADMIN_ACTIVITY.TYPES.UNPUBLISH]: 'Unpublish',
  [ADMIN_ACTIVITY.TYPES.ARCHIVE]: 'Archive',
  [ADMIN_ACTIVITY.TYPES.RESTORE]: 'Restore',
  [ADMIN_ACTIVITY.TYPES.ASSIGN]: 'Assign',
  [ADMIN_ACTIVITY.TYPES.UNASSIGN]: 'Unassign',
  [ADMIN_ACTIVITY.TYPES.SUSPEND]: 'Suspend',
  [ADMIN_ACTIVITY.TYPES.UNSUSPEND]: 'Unsuspend',
  [ADMIN_ACTIVITY.TYPES.BAN]: 'Ban',
  [ADMIN_ACTIVITY.TYPES.UNBAN]: 'Unban',
  [ADMIN_ACTIVITY.TYPES.VERIFY]: 'Verify',
  [ADMIN_ACTIVITY.TYPES.UNVERIFY]: 'Unverify',
  [ADMIN_ACTIVITY.TYPES.FEATURE]: 'Feature',
  [ADMIN_ACTIVITY.TYPES.UNFEATURE]: 'Unfeature',
  [ADMIN_ACTIVITY.TYPES.LOCK]: 'Lock',
  [ADMIN_ACTIVITY.TYPES.UNLOCK]: 'Unlock',
  [ADMIN_ACTIVITY.TYPES.RESET]: 'Reset',
  [ADMIN_ACTIVITY.TYPES.CHANGE]: 'Change',
  [ADMIN_ACTIVITY.TYPES.TRANSFER]: 'Transfer',
  [ADMIN_ACTIVITY.TYPES.MERGE]: 'Merge',
  [ADMIN_ACTIVITY.TYPES.SPLIT]: 'Split',
  [ADMIN_ACTIVITY.TYPES.CANCEL]: 'Cancel',
  [ADMIN_ACTIVITY.TYPES.REFUND]: 'Refund',
  [ADMIN_ACTIVITY.TYPES.SHIP]: 'Ship',
  [ADMIN_ACTIVITY.TYPES.DELIVER]: 'Deliver',
  [ADMIN_ACTIVITY.TYPES.RETURN]: 'Return',
  [ADMIN_ACTIVITY.TYPES.PAYMENT]: 'Payment',
  [ADMIN_ACTIVITY.TYPES.SETTLEMENT]: 'Settlement',
  [ADMIN_ACTIVITY.TYPES.RECONCILE]: 'Reconcile',
  [ADMIN_ACTIVITY.TYPES.AUDIT]: 'Audit',
  [ADMIN_ACTIVITY.TYPES.REVIEW]: 'Review',
  [ADMIN_ACTIVITY.TYPES.COMMENT]: 'Comment',
  [ADMIN_ACTIVITY.TYPES.NOTE]: 'Note',
  [ADMIN_ACTIVITY.TYPES.TAG]: 'Tag',
  [ADMIN_ACTIVITY.TYPES.UNTAG]: 'Untag',
  [ADMIN_ACTIVITY.TYPES.SHARE]: 'Share',
  [ADMIN_ACTIVITY.TYPES.UNSHARE]: 'Unshare',
  [ADMIN_ACTIVITY.TYPES.DOWNLOAD]: 'Download',
  [ADMIN_ACTIVITY.TYPES.UPLOAD]: 'Upload',
  [ADMIN_ACTIVITY.TYPES.SYNC]: 'Sync',
  [ADMIN_ACTIVITY.TYPES.BACKUP]: 'Backup',
  [ADMIN_ACTIVITY.TYPES.RESTORE_SYSTEM]: 'Restore System',
  [ADMIN_ACTIVITY.TYPES.MAINTENANCE]: 'Maintenance',
  [ADMIN_ACTIVITY.TYPES.UPGRADE]: 'Upgrade',
  [ADMIN_ACTIVITY.TYPES.CONFIGURE]: 'Configure',
  [ADMIN_ACTIVITY.TYPES.INSTALL]: 'Install',
  [ADMIN_ACTIVITY.TYPES.UNINSTALL]: 'Uninstall',
  [ADMIN_ACTIVITY.TYPES.ENABLE]: 'Enable',
  [ADMIN_ACTIVITY.TYPES.DISABLE]: 'Disable',
  [ADMIN_ACTIVITY.TYPES.START]: 'Start',
  [ADMIN_ACTIVITY.TYPES.STOP]: 'Stop',
  [ADMIN_ACTIVITY.TYPES.PAUSE]: 'Pause',
  [ADMIN_ACTIVITY.TYPES.RESUME]: 'Resume',
  [ADMIN_ACTIVITY.TYPES.SCHEDULE]: 'Schedule',
  [ADMIN_ACTIVITY.TYPES.UNSCHEDULE]: 'Unschedule',
  [ADMIN_ACTIVITY.TYPES.NOTIFY]: 'Notify',
  [ADMIN_ACTIVITY.TYPES.ALERT]: 'Alert',
  [ADMIN_ACTIVITY.TYPES.ESCALATE]: 'Escalate',
  [ADMIN_ACTIVITY.TYPES.RESOLVE]: 'Resolve',
  [ADMIN_ACTIVITY.TYPES.CLOSE]: 'Close',
  [ADMIN_ACTIVITY.TYPES.REOPEN]: 'Reopen',
};

export const ADMIN_ACTIVITY_STATUS_LABELS: Record<AdminActivityStatus, string> = {
  [ADMIN_ACTIVITY.STATUSES.SUCCESS]: 'Success',
  [ADMIN_ACTIVITY.STATUSES.FAILED]: 'Failed',
  [ADMIN_ACTIVITY.STATUSES.PENDING]: 'Pending',
  [ADMIN_ACTIVITY.STATUSES.PROCESSING]: 'Processing',
  [ADMIN_ACTIVITY.STATUSES.COMPLETED]: 'Completed',
  [ADMIN_ACTIVITY.STATUSES.CANCELLED]: 'Cancelled',
  [ADMIN_ACTIVITY.STATUSES.ERROR]: 'Error',
  [ADMIN_ACTIVITY.STATUSES.TIMEOUT]: 'Timeout',
  [ADMIN_ACTIVITY.STATUSES.RETRY]: 'Retry',
  [ADMIN_ACTIVITY.STATUSES.SCHEDULED]: 'Scheduled',
  [ADMIN_ACTIVITY.STATUSES.IN_PROGRESS]: 'In Progress',
  [ADMIN_ACTIVITY.STATUSES.PARTIAL]: 'Partial',
  [ADMIN_ACTIVITY.STATUSES.SKIPPED]: 'Skipped',
  [ADMIN_ACTIVITY.STATUSES.ABORTED]: 'Aborted',
};

export const ADMIN_ACTIVITY_SEVERITY_COLORS: Record<AdminActivitySeverity, string> = {
  [ADMIN_ACTIVITY.SEVERITY.DEBUG]: '#808080',
  [ADMIN_ACTIVITY.SEVERITY.INFO]: '#3498DB',
  [ADMIN_ACTIVITY.SEVERITY.WARNING]: '#F39C12',
  [ADMIN_ACTIVITY.SEVERITY.ERROR]: '#E74C3C',
  [ADMIN_ACTIVITY.SEVERITY.CRITICAL]: '#C0392B',
  [ADMIN_ACTIVITY.SEVERITY.EMERGENCY]: '#8B0000',
};

export function getAdminActivityTypeLabel(type: AdminActivityType): string {
  return ADMIN_ACTIVITY_TYPE_LABELS[type] || 'Unknown Activity';
}

export function getAdminActivityStatusLabel(status: AdminActivityStatus): string {
  return ADMIN_ACTIVITY_STATUS_LABELS[status] || 'Unknown Status';
}

export function getAdminActivitySeverityColor(severity: AdminActivitySeverity): string {
  return ADMIN_ACTIVITY_SEVERITY_COLORS[severity] || '#808080';
}

export function isSuccessfulActivity(status: AdminActivityStatus): boolean {
  return status === ADMIN_ACTIVITY.STATUSES.SUCCESS || status === ADMIN_ACTIVITY.STATUSES.COMPLETED;
}

export function isFailedActivity(status: AdminActivityStatus): boolean {
  return (
    status === ADMIN_ACTIVITY.STATUSES.FAILED ||
    status === ADMIN_ACTIVITY.STATUSES.ERROR ||
    status === ADMIN_ACTIVITY.STATUSES.TIMEOUT
  );
}

export function isPendingActivity(status: AdminActivityStatus): boolean {
  return (
    status === ADMIN_ACTIVITY.STATUSES.PENDING ||
    status === ADMIN_ACTIVITY.STATUSES.PROCESSING ||
    status === ADMIN_ACTIVITY.STATUSES.IN_PROGRESS ||
    status === ADMIN_ACTIVITY.STATUSES.SCHEDULED
  );
}

export function isTerminalActivity(status: AdminActivityStatus): boolean {
  return (
    status === ADMIN_ACTIVITY.STATUSES.SUCCESS ||
    status === ADMIN_ACTIVITY.STATUSES.COMPLETED ||
    status === ADMIN_ACTIVITY.STATUSES.FAILED ||
    status === ADMIN_ACTIVITY.STATUSES.ERROR ||
    status === ADMIN_ACTIVITY.STATUSES.CANCELLED ||
    status === ADMIN_ACTIVITY.STATUSES.ABORTED
  );
}
