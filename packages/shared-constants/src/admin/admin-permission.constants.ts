/**
 * Admin Permission Constants
 * Permission definitions for admin access control
 */

export const ADMIN_PERMISSION = {
  // User Management
  USER_VIEW: 'user:view',
  USER_CREATE: 'user:create',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_BAN: 'user:ban',
  USER_UNBAN: 'user:unban',
  USER_VERIFY: 'user:verify',
  USER_SUSPEND: 'user:suspend',
  USER_ACTIVATE: 'user:activate',
  USER_DEACTIVATE: 'user:deactivate',

  // Admin Management
  ADMIN_VIEW: 'admin:view',
  ADMIN_CREATE: 'admin:create',
  ADMIN_UPDATE: 'admin:update',
  ADMIN_DELETE: 'admin:delete',
  ADMIN_ROLE: 'admin:role',
  ADMIN_PERMISSION: 'admin:permission',
  ADMIN_SUSPEND: 'admin:suspend',
  ADMIN_ACTIVATE: 'admin:activate',

  // Content Management
  CONTENT_VIEW: 'content:view',
  CONTENT_CREATE: 'content:create',
  CONTENT_UPDATE: 'content:update',
  CONTENT_DELETE: 'content:delete',
  CONTENT_PUBLISH: 'content:publish',
  CONTENT_UNPUBLISH: 'content:unpublish',
  CONTENT_ARCHIVE: 'content:archive',
  CONTENT_RESTORE: 'content:restore',
  CONTENT_REVIEW: 'content:review',
  CONTENT_APPROVE: 'content:approve',
  CONTENT_REJECT: 'content:reject',

  // Product Management
  PRODUCT_VIEW: 'product:view',
  PRODUCT_CREATE: 'product:create',
  PRODUCT_UPDATE: 'product:update',
  PRODUCT_DELETE: 'product:delete',
  PRODUCT_APPROVE: 'product:approve',
  PRODUCT_REJECT: 'product:reject',
  PRODUCT_FEATURE: 'product:feature',
  PRODUCT_UNFEATURE: 'product:unfeature',
  PRODUCT_ARCHIVE: 'product:archive',
  PRODUCT_RESTORE: 'product:restore',
  PRODUCT_INVENTORY: 'product:inventory',
  PRODUCT_CATEGORY: 'product:category',

  // Order Management
  ORDER_VIEW: 'order:view',
  ORDER_CREATE: 'order:create',
  ORDER_UPDATE: 'order:update',
  ORDER_CANCEL: 'order:cancel',
  ORDER_REFUND: 'order:refund',
  ORDER_SHIP: 'order:ship',
  ORDER_DELIVER: 'order:deliver',
  ORDER_RETURN: 'order:return',
  ORDER_ARCHIVE: 'order:archive',

  // Payment Management
  PAYMENT_VIEW: 'payment:view',
  PAYMENT_PROCESS: 'payment:process',
  PAYMENT_REFUND: 'payment:refund',
  PAYMENT_CAPTURE: 'payment:capture',
  PAYMENT_VOID: 'payment:void',
  PAYMENT_RECONCILE: 'payment:reconcile',
  PAYMENT_VERIFY: 'payment:verify',

  // Analytics
  ANALYTICS_VIEW: 'analytics:view',
  ANALYTICS_EXPORT: 'analytics:export',
  ANALYTICS_CREATE: 'analytics:create',
  ANALYTICS_DELETE: 'analytics:delete',
  ANALYTICS_REPORT: 'analytics:report',

  // Settings
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_UPDATE: 'settings:update',
  SETTINGS_OVERRIDE: 'settings:override',
  SETTINGS_RESET: 'settings:reset',

  // System
  SYSTEM_VIEW: 'system:view',
  SYSTEM_UPDATE: 'system:update',
  SYSTEM_MAINTENANCE: 'system:maintenance',
  SYSTEM_BACKUP: 'system:backup',
  SYSTEM_RESTORE: 'system:restore',
  SYSTEM_UPGRADE: 'system:upgrade',

  // Logs
  LOGS_VIEW: 'logs:view',
  LOGS_EXPORT: 'logs:export',
  LOGS_DELETE: 'logs:delete',
  LOGS_ARCHIVE: 'logs:archive',

  // Audit
  AUDIT_VIEW: 'audit:view',
  AUDIT_EXPORT: 'audit:export',
  AUDIT_DELETE: 'audit:delete',

  // Compliance
  COMPLIANCE_VIEW: 'compliance:view',
  COMPLIANCE_UPDATE: 'compliance:update',
  COMPLIANCE_REPORT: 'compliance:report',

  // Legal
  LEGAL_VIEW: 'legal:view',
  LEGAL_UPDATE: 'legal:update',
  LEGAL_DELETE: 'legal:delete',

  // Policy
  POLICY_VIEW: 'policy:view',
  POLICY_CREATE: 'policy:create',
  POLICY_UPDATE: 'policy:update',
  POLICY_DELETE: 'policy:delete',

  // Report
  REPORT_VIEW: 'report:view',
  REPORT_CREATE: 'report:create',
  REPORT_UPDATE: 'report:update',
  REPORT_DELETE: 'report:delete',
  REPORT_EXPORT: 'report:export',
  REPORT_SHARE: 'report:share',

  // Logistics
  LOGISTICS_VIEW: 'logistics:view',
  LOGISTICS_CREATE: 'logistics:create',
  LOGISTICS_UPDATE: 'logistics:update',
  LOGISTICS_DELETE: 'logistics:delete',
  LOGISTICS_SHIP: 'logistics:ship',
  LOGISTICS_TRACK: 'logistics:track',

  // Support
  SUPPORT_VIEW: 'support:view',
  SUPPORT_CREATE: 'support:create',
  SUPPORT_UPDATE: 'support:update',
  SUPPORT_DELETE: 'support:delete',
  SUPPORT_ESCALATE: 'support:escalate',
  SUPPORT_RESOLVE: 'support:resolve',

  // Marketing
  MARKETING_VIEW: 'marketing:view',
  MARKETING_CREATE: 'marketing:create',
  MARKETING_UPDATE: 'marketing:update',
  MARKETING_DELETE: 'marketing:delete',
  MARKETING_CAMPAIGN: 'marketing:campaign',

  // Vendor
  VENDOR_VIEW: 'vendor:view',
  VENDOR_CREATE: 'vendor:create',
  VENDOR_UPDATE: 'vendor:update',
  VENDOR_DELETE: 'vendor:delete',
  VENDOR_APPROVE: 'vendor:approve',
  VENDOR_SUSPEND: 'vendor:suspend',

  // AI
  AI_VIEW: 'ai:view',
  AI_CONFIGURE: 'ai:configure',
  AI_TRAIN: 'ai:train',
  AI_DEPLOY: 'ai:deploy',
  AI_MODEL: 'ai:model',

  // SEO
  SEO_VIEW: 'seo:view',
  SEO_UPDATE: 'seo:update',
  SEO_ANALYZE: 'seo:analyze',
  SEO_OPTIMIZE: 'seo:optimize',

  // Notification
  NOTIFICATION_VIEW: 'notification:view',
  NOTIFICATION_CREATE: 'notification:create',
  NOTIFICATION_UPDATE: 'notification:update',
  NOTIFICATION_DELETE: 'notification:delete',
  NOTIFICATION_BROADCAST: 'notification:broadcast',

  // Archive
  ARCHIVE_VIEW: 'archive:view',
  ARCHIVE_RESTORE: 'archive:restore',
  ARCHIVE_DELETE: 'archive:delete',

  // All permissions
  ALL: '*',
} as const;

export type AdminPermissionType = (typeof ADMIN_PERMISSION)[keyof typeof ADMIN_PERMISSION];

export const ADMIN_PERMISSION_GROUPS: Record<string, AdminPermissionType[]> = {
  USER: [
    ADMIN_PERMISSION.USER_VIEW,
    ADMIN_PERMISSION.USER_CREATE,
    ADMIN_PERMISSION.USER_UPDATE,
    ADMIN_PERMISSION.USER_DELETE,
    ADMIN_PERMISSION.USER_BAN,
    ADMIN_PERMISSION.USER_UNBAN,
    ADMIN_PERMISSION.USER_VERIFY,
    ADMIN_PERMISSION.USER_SUSPEND,
    ADMIN_PERMISSION.USER_ACTIVATE,
    ADMIN_PERMISSION.USER_DEACTIVATE,
  ],
  ADMIN: [
    ADMIN_PERMISSION.ADMIN_VIEW,
    ADMIN_PERMISSION.ADMIN_CREATE,
    ADMIN_PERMISSION.ADMIN_UPDATE,
    ADMIN_PERMISSION.ADMIN_DELETE,
    ADMIN_PERMISSION.ADMIN_ROLE,
    ADMIN_PERMISSION.ADMIN_PERMISSION,
    ADMIN_PERMISSION.ADMIN_SUSPEND,
    ADMIN_PERMISSION.ADMIN_ACTIVATE,
  ],
  CONTENT: [
    ADMIN_PERMISSION.CONTENT_VIEW,
    ADMIN_PERMISSION.CONTENT_CREATE,
    ADMIN_PERMISSION.CONTENT_UPDATE,
    ADMIN_PERMISSION.CONTENT_DELETE,
    ADMIN_PERMISSION.CONTENT_PUBLISH,
    ADMIN_PERMISSION.CONTENT_UNPUBLISH,
    ADMIN_PERMISSION.CONTENT_ARCHIVE,
    ADMIN_PERMISSION.CONTENT_RESTORE,
    ADMIN_PERMISSION.CONTENT_REVIEW,
    ADMIN_PERMISSION.CONTENT_APPROVE,
    ADMIN_PERMISSION.CONTENT_REJECT,
  ],
  PRODUCT: [
    ADMIN_PERMISSION.PRODUCT_VIEW,
    ADMIN_PERMISSION.PRODUCT_CREATE,
    ADMIN_PERMISSION.PRODUCT_UPDATE,
    ADMIN_PERMISSION.PRODUCT_DELETE,
    ADMIN_PERMISSION.PRODUCT_APPROVE,
    ADMIN_PERMISSION.PRODUCT_REJECT,
    ADMIN_PERMISSION.PRODUCT_FEATURE,
    ADMIN_PERMISSION.PRODUCT_UNFEATURE,
    ADMIN_PERMISSION.PRODUCT_ARCHIVE,
    ADMIN_PERMISSION.PRODUCT_RESTORE,
    ADMIN_PERMISSION.PRODUCT_INVENTORY,
    ADMIN_PERMISSION.PRODUCT_CATEGORY,
  ],
  ORDER: [
    ADMIN_PERMISSION.ORDER_VIEW,
    ADMIN_PERMISSION.ORDER_CREATE,
    ADMIN_PERMISSION.ORDER_UPDATE,
    ADMIN_PERMISSION.ORDER_CANCEL,
    ADMIN_PERMISSION.ORDER_REFUND,
    ADMIN_PERMISSION.ORDER_SHIP,
    ADMIN_PERMISSION.ORDER_DELIVER,
    ADMIN_PERMISSION.ORDER_RETURN,
    ADMIN_PERMISSION.ORDER_ARCHIVE,
  ],
  PAYMENT: [
    ADMIN_PERMISSION.PAYMENT_VIEW,
    ADMIN_PERMISSION.PAYMENT_PROCESS,
    ADMIN_PERMISSION.PAYMENT_REFUND,
    ADMIN_PERMISSION.PAYMENT_CAPTURE,
    ADMIN_PERMISSION.PAYMENT_VOID,
    ADMIN_PERMISSION.PAYMENT_RECONCILE,
    ADMIN_PERMISSION.PAYMENT_VERIFY,
  ],
  ANALYTICS: [
    ADMIN_PERMISSION.ANALYTICS_VIEW,
    ADMIN_PERMISSION.ANALYTICS_EXPORT,
    ADMIN_PERMISSION.ANALYTICS_CREATE,
    ADMIN_PERMISSION.ANALYTICS_DELETE,
    ADMIN_PERMISSION.ANALYTICS_REPORT,
  ],
  SYSTEM: [
    ADMIN_PERMISSION.SYSTEM_VIEW,
    ADMIN_PERMISSION.SYSTEM_UPDATE,
    ADMIN_PERMISSION.SYSTEM_MAINTENANCE,
    ADMIN_PERMISSION.SYSTEM_BACKUP,
    ADMIN_PERMISSION.SYSTEM_RESTORE,
    ADMIN_PERMISSION.SYSTEM_UPGRADE,
  ],
  SETTINGS: [
    ADMIN_PERMISSION.SETTINGS_VIEW,
    ADMIN_PERMISSION.SETTINGS_UPDATE,
    ADMIN_PERMISSION.SETTINGS_OVERRIDE,
    ADMIN_PERMISSION.SETTINGS_RESET,
  ],
};

export type AdminPermissionGroup = keyof typeof ADMIN_PERMISSION_GROUPS;

export const ADMIN_PERMISSION_LABELS: Record<AdminPermissionType, string> = {
  [ADMIN_PERMISSION.USER_VIEW]: 'View Users',
  [ADMIN_PERMISSION.USER_CREATE]: 'Create Users',
  [ADMIN_PERMISSION.USER_UPDATE]: 'Update Users',
  [ADMIN_PERMISSION.USER_DELETE]: 'Delete Users',
  [ADMIN_PERMISSION.USER_BAN]: 'Ban Users',
  [ADMIN_PERMISSION.USER_UNBAN]: 'Unban Users',
  [ADMIN_PERMISSION.USER_VERIFY]: 'Verify Users',
  [ADMIN_PERMISSION.USER_SUSPEND]: 'Suspend Users',
  [ADMIN_PERMISSION.USER_ACTIVATE]: 'Activate Users',
  [ADMIN_PERMISSION.USER_DEACTIVATE]: 'Deactivate Users',
  [ADMIN_PERMISSION.ADMIN_VIEW]: 'View Admins',
  [ADMIN_PERMISSION.ADMIN_CREATE]: 'Create Admins',
  [ADMIN_PERMISSION.ADMIN_UPDATE]: 'Update Admins',
  [ADMIN_PERMISSION.ADMIN_DELETE]: 'Delete Admins',
  [ADMIN_PERMISSION.ADMIN_ROLE]: 'Manage Admin Roles',
  [ADMIN_PERMISSION.ADMIN_PERMISSION]: 'Manage Admin Permissions',
  [ADMIN_PERMISSION.ADMIN_SUSPEND]: 'Suspend Admins',
  [ADMIN_PERMISSION.ADMIN_ACTIVATE]: 'Activate Admins',
  [ADMIN_PERMISSION.CONTENT_VIEW]: 'View Content',
  [ADMIN_PERMISSION.CONTENT_CREATE]: 'Create Content',
  [ADMIN_PERMISSION.CONTENT_UPDATE]: 'Update Content',
  [ADMIN_PERMISSION.CONTENT_DELETE]: 'Delete Content',
  [ADMIN_PERMISSION.CONTENT_PUBLISH]: 'Publish Content',
  [ADMIN_PERMISSION.CONTENT_UNPUBLISH]: 'Unpublish Content',
  [ADMIN_PERMISSION.CONTENT_ARCHIVE]: 'Archive Content',
  [ADMIN_PERMISSION.CONTENT_RESTORE]: 'Restore Content',
  [ADMIN_PERMISSION.CONTENT_REVIEW]: 'Review Content',
  [ADMIN_PERMISSION.CONTENT_APPROVE]: 'Approve Content',
  [ADMIN_PERMISSION.CONTENT_REJECT]: 'Reject Content',
  [ADMIN_PERMISSION.PRODUCT_VIEW]: 'View Products',
  [ADMIN_PERMISSION.PRODUCT_CREATE]: 'Create Products',
  [ADMIN_PERMISSION.PRODUCT_UPDATE]: 'Update Products',
  [ADMIN_PERMISSION.PRODUCT_DELETE]: 'Delete Products',
  [ADMIN_PERMISSION.PRODUCT_APPROVE]: 'Approve Products',
  [ADMIN_PERMISSION.PRODUCT_REJECT]: 'Reject Products',
  [ADMIN_PERMISSION.PRODUCT_FEATURE]: 'Feature Products',
  [ADMIN_PERMISSION.PRODUCT_UNFEATURE]: 'Unfeature Products',
  [ADMIN_PERMISSION.PRODUCT_ARCHIVE]: 'Archive Products',
  [ADMIN_PERMISSION.PRODUCT_RESTORE]: 'Restore Products',
  [ADMIN_PERMISSION.PRODUCT_INVENTORY]: 'Manage Product Inventory',
  [ADMIN_PERMISSION.PRODUCT_CATEGORY]: 'Manage Product Categories',
  [ADMIN_PERMISSION.ORDER_VIEW]: 'View Orders',
  [ADMIN_PERMISSION.ORDER_CREATE]: 'Create Orders',
  [ADMIN_PERMISSION.ORDER_UPDATE]: 'Update Orders',
  [ADMIN_PERMISSION.ORDER_CANCEL]: 'Cancel Orders',
  [ADMIN_PERMISSION.ORDER_REFUND]: 'Refund Orders',
  [ADMIN_PERMISSION.ORDER_SHIP]: 'Ship Orders',
  [ADMIN_PERMISSION.ORDER_DELIVER]: 'Deliver Orders',
  [ADMIN_PERMISSION.ORDER_RETURN]: 'Process Order Returns',
  [ADMIN_PERMISSION.ORDER_ARCHIVE]: 'Archive Orders',
  [ADMIN_PERMISSION.PAYMENT_VIEW]: 'View Payments',
  [ADMIN_PERMISSION.PAYMENT_PROCESS]: 'Process Payments',
  [ADMIN_PERMISSION.PAYMENT_REFUND]: 'Refund Payments',
  [ADMIN_PERMISSION.PAYMENT_CAPTURE]: 'Capture Payments',
  [ADMIN_PERMISSION.PAYMENT_VOID]: 'Void Payments',
  [ADMIN_PERMISSION.PAYMENT_RECONCILE]: 'Reconcile Payments',
  [ADMIN_PERMISSION.PAYMENT_VERIFY]: 'Verify Payments',
  [ADMIN_PERMISSION.ANALYTICS_VIEW]: 'View Analytics',
  [ADMIN_PERMISSION.ANALYTICS_EXPORT]: 'Export Analytics',
  [ADMIN_PERMISSION.ANALYTICS_CREATE]: 'Create Analytics',
  [ADMIN_PERMISSION.ANALYTICS_DELETE]: 'Delete Analytics',
  [ADMIN_PERMISSION.ANALYTICS_REPORT]: 'Generate Analytics Reports',
  [ADMIN_PERMISSION.SETTINGS_VIEW]: 'View Settings',
  [ADMIN_PERMISSION.SETTINGS_UPDATE]: 'Update Settings',
  [ADMIN_PERMISSION.SETTINGS_OVERRIDE]: 'Override Settings',
  [ADMIN_PERMISSION.SETTINGS_RESET]: 'Reset Settings',
  [ADMIN_PERMISSION.SYSTEM_VIEW]: 'View System',
  [ADMIN_PERMISSION.SYSTEM_UPDATE]: 'Update System',
  [ADMIN_PERMISSION.SYSTEM_MAINTENANCE]: 'System Maintenance',
  [ADMIN_PERMISSION.SYSTEM_BACKUP]: 'System Backup',
  [ADMIN_PERMISSION.SYSTEM_RESTORE]: 'System Restore',
  [ADMIN_PERMISSION.SYSTEM_UPGRADE]: 'System Upgrade',
  [ADMIN_PERMISSION.LOGS_VIEW]: 'View Logs',
  [ADMIN_PERMISSION.LOGS_EXPORT]: 'Export Logs',
  [ADMIN_PERMISSION.LOGS_DELETE]: 'Delete Logs',
  [ADMIN_PERMISSION.LOGS_ARCHIVE]: 'Archive Logs',
  [ADMIN_PERMISSION.AUDIT_VIEW]: 'View Audit',
  [ADMIN_PERMISSION.AUDIT_EXPORT]: 'Export Audit',
  [ADMIN_PERMISSION.AUDIT_DELETE]: 'Delete Audit',
  [ADMIN_PERMISSION.COMPLIANCE_VIEW]: 'View Compliance',
  [ADMIN_PERMISSION.COMPLIANCE_UPDATE]: 'Update Compliance',
  [ADMIN_PERMISSION.COMPLIANCE_REPORT]: 'Compliance Reports',
  [ADMIN_PERMISSION.LEGAL_VIEW]: 'View Legal',
  [ADMIN_PERMISSION.LEGAL_UPDATE]: 'Update Legal',
  [ADMIN_PERMISSION.LEGAL_DELETE]: 'Delete Legal',
  [ADMIN_PERMISSION.POLICY_VIEW]: 'View Policies',
  [ADMIN_PERMISSION.POLICY_CREATE]: 'Create Policies',
  [ADMIN_PERMISSION.POLICY_UPDATE]: 'Update Policies',
  [ADMIN_PERMISSION.POLICY_DELETE]: 'Delete Policies',
  [ADMIN_PERMISSION.REPORT_VIEW]: 'View Reports',
  [ADMIN_PERMISSION.REPORT_CREATE]: 'Create Reports',
  [ADMIN_PERMISSION.REPORT_UPDATE]: 'Update Reports',
  [ADMIN_PERMISSION.REPORT_DELETE]: 'Delete Reports',
  [ADMIN_PERMISSION.REPORT_EXPORT]: 'Export Reports',
  [ADMIN_PERMISSION.REPORT_SHARE]: 'Share Reports',
  [ADMIN_PERMISSION.LOGISTICS_VIEW]: 'View Logistics',
  [ADMIN_PERMISSION.LOGISTICS_CREATE]: 'Create Logistics',
  [ADMIN_PERMISSION.LOGISTICS_UPDATE]: 'Update Logistics',
  [ADMIN_PERMISSION.LOGISTICS_DELETE]: 'Delete Logistics',
  [ADMIN_PERMISSION.LOGISTICS_SHIP]: 'Ship Logistics',
  [ADMIN_PERMISSION.LOGISTICS_TRACK]: 'Track Logistics',
  [ADMIN_PERMISSION.SUPPORT_VIEW]: 'View Support',
  [ADMIN_PERMISSION.SUPPORT_CREATE]: 'Create Support',
  [ADMIN_PERMISSION.SUPPORT_UPDATE]: 'Update Support',
  [ADMIN_PERMISSION.SUPPORT_DELETE]: 'Delete Support',
  [ADMIN_PERMISSION.SUPPORT_ESCALATE]: 'Escalate Support',
  [ADMIN_PERMISSION.SUPPORT_RESOLVE]: 'Resolve Support',
  [ADMIN_PERMISSION.MARKETING_VIEW]: 'View Marketing',
  [ADMIN_PERMISSION.MARKETING_CREATE]: 'Create Marketing',
  [ADMIN_PERMISSION.MARKETING_UPDATE]: 'Update Marketing',
  [ADMIN_PERMISSION.MARKETING_DELETE]: 'Delete Marketing',
  [ADMIN_PERMISSION.MARKETING_CAMPAIGN]: 'Manage Campaigns',
  [ADMIN_PERMISSION.VENDOR_VIEW]: 'View Vendors',
  [ADMIN_PERMISSION.VENDOR_CREATE]: 'Create Vendors',
  [ADMIN_PERMISSION.VENDOR_UPDATE]: 'Update Vendors',
  [ADMIN_PERMISSION.VENDOR_DELETE]: 'Delete Vendors',
  [ADMIN_PERMISSION.VENDOR_APPROVE]: 'Approve Vendors',
  [ADMIN_PERMISSION.VENDOR_SUSPEND]: 'Suspend Vendors',
  [ADMIN_PERMISSION.AI_VIEW]: 'View AI',
  [ADMIN_PERMISSION.AI_CONFIGURE]: 'Configure AI',
  [ADMIN_PERMISSION.AI_TRAIN]: 'Train AI Models',
  [ADMIN_PERMISSION.AI_DEPLOY]: 'Deploy AI Models',
  [ADMIN_PERMISSION.AI_MODEL]: 'Manage AI Models',
  [ADMIN_PERMISSION.SEO_VIEW]: 'View SEO',
  [ADMIN_PERMISSION.SEO_UPDATE]: 'Update SEO',
  [ADMIN_PERMISSION.SEO_ANALYZE]: 'Analyze SEO',
  [ADMIN_PERMISSION.SEO_OPTIMIZE]: 'Optimize SEO',
  [ADMIN_PERMISSION.NOTIFICATION_VIEW]: 'View Notifications',
  [ADMIN_PERMISSION.NOTIFICATION_CREATE]: 'Create Notifications',
  [ADMIN_PERMISSION.NOTIFICATION_UPDATE]: 'Update Notifications',
  [ADMIN_PERMISSION.NOTIFICATION_DELETE]: 'Delete Notifications',
  [ADMIN_PERMISSION.NOTIFICATION_BROADCAST]: 'Broadcast Notifications',
  [ADMIN_PERMISSION.ARCHIVE_VIEW]: 'View Archive',
  [ADMIN_PERMISSION.ARCHIVE_RESTORE]: 'Restore Archive',
  [ADMIN_PERMISSION.ARCHIVE_DELETE]: 'Delete Archive',
  [ADMIN_PERMISSION.ALL]: 'All Permissions',
};

export type AdminPermissionLabel =
  (typeof ADMIN_PERMISSION_LABELS)[keyof typeof ADMIN_PERMISSION_LABELS];

export function getAdminPermissionLabel(permission: AdminPermissionType): string {
  return ADMIN_PERMISSION_LABELS[permission] || 'Unknown Permission';
}

export function getAdminPermissionsByGroup(group: AdminPermissionGroup): AdminPermissionType[] {
  return ADMIN_PERMISSION_GROUPS[group] || [];
}

export function getAllAdminPermissions(): AdminPermissionType[] {
  return Object.values(ADMIN_PERMISSION).filter(
    (permission) => permission !== ADMIN_PERMISSION.ALL
  );
}

export function isAdminWildcardPermission(permission: string): boolean {
  return permission === ADMIN_PERMISSION.ALL || permission.endsWith(':*');
}

export function matchAdminPermission(permission: string, pattern: string): boolean {
  if (pattern === ADMIN_PERMISSION.ALL) {
    return true;
  }

  if (pattern.endsWith(':*')) {
    const prefix = pattern.slice(0, -2);
    return permission.startsWith(prefix);
  }

  return permission === pattern;
}
