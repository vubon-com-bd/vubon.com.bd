/**
 * @fileoverview Report permission definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Report permissions enum
 */
export enum ReportPermission {
  /** View reports */
  VIEW_REPORTS = 'VIEW_REPORTS',
  /** Create reports */
  CREATE_REPORTS = 'CREATE_REPORTS',
  /** Edit reports */
  EDIT_REPORTS = 'EDIT_REPORTS',
  /** Delete reports */
  DELETE_REPORTS = 'DELETE_REPORTS',
  /** Export reports */
  EXPORT_REPORTS = 'EXPORT_REPORTS',
  /** Schedule reports */
  SCHEDULE_REPORTS = 'SCHEDULE_REPORTS',
  /** Share reports */
  SHARE_REPORTS = 'SHARE_REPORTS',
  /** Publish reports */
  PUBLISH_REPORTS = 'PUBLISH_REPORTS',
  /** Unpublish reports */
  UNPUBLISH_REPORTS = 'UNPUBLISH_REPORTS',
  /** Archive reports */
  ARCHIVE_REPORTS = 'ARCHIVE_REPORTS',
  /** Restore reports */
  RESTORE_REPORTS = 'RESTORE_REPORTS',
  /** Duplicate reports */
  DUPLICATE_REPORTS = 'DUPLICATE_REPORTS',
  /** Merge reports */
  MERGE_REPORTS = 'MERGE_REPORTS',
  /** Split reports */
  SPLIT_REPORTS = 'SPLIT_REPORTS',
  /** Lock reports */
  LOCK_REPORTS = 'LOCK_REPORTS',
  /** Unlock reports */
  UNLOCK_REPORTS = 'UNLOCK_REPORTS',
  /** Rename reports */
  RENAME_REPORTS = 'RENAME_REPORTS',
  /** Move reports */
  MOVE_REPORTS = 'MOVE_REPORTS',
  /** Copy reports */
  COPY_REPORTS = 'COPY_REPORTS',
  /** Reorder reports */
  REORDER_REPORTS = 'REORDER_REPORTS',
  /** Pin reports */
  PIN_REPORTS = 'PIN_REPORTS',
  /** Unpin reports */
  UNPIN_REPORTS = 'UNPIN_REPORTS',
  /** Favorite reports */
  FAVORITE_REPORTS = 'FAVORITE_REPORTS',
  /** Unfavorite reports */
  UNFAVORITE_REPORTS = 'UNFAVORITE_REPORTS',
  /** Rate reports */
  RATE_REPORTS = 'RATE_REPORTS',
  /** Comment on reports */
  COMMENT_REPORTS = 'COMMENT_REPORTS',
  /** Tag reports */
  TAG_REPORTS = 'TAG_REPORTS',
  /** Categorize reports */
  CATEGORIZE_REPORTS = 'CATEGORIZE_REPORTS',
  /** View templates */
  VIEW_TEMPLATES = 'VIEW_TEMPLATES',
  /** Create templates */
  CREATE_TEMPLATES = 'CREATE_TEMPLATES',
  /** Edit templates */
  EDIT_TEMPLATES = 'EDIT_TEMPLATES',
  /** Delete templates */
  DELETE_TEMPLATES = 'DELETE_TEMPLATES',
  /** View dashboards */
  VIEW_DASHBOARDS = 'VIEW_DASHBOARDS',
  /** Create dashboards */
  CREATE_DASHBOARDS = 'CREATE_DASHBOARDS',
  /** Edit dashboards */
  EDIT_DASHBOARDS = 'EDIT_DASHBOARDS',
  /** Delete dashboards */
  DELETE_DASHBOARDS = 'DELETE_DASHBOARDS',
  /** View widgets */
  VIEW_WIDGETS = 'VIEW_WIDGETS',
  /** Create widgets */
  CREATE_WIDGETS = 'CREATE_WIDGETS',
  /** Edit widgets */
  EDIT_WIDGETS = 'EDIT_WIDGETS',
  /** Delete widgets */
  DELETE_WIDGETS = 'DELETE_WIDGETS',
  /** View exports */
  VIEW_EXPORTS = 'VIEW_EXPORTS',
  /** Create exports */
  CREATE_EXPORTS = 'CREATE_EXPORTS',
  /** Delete exports */
  DELETE_EXPORTS = 'DELETE_EXPORTS',
  /** View emails */
  VIEW_EMAILS = 'VIEW_EMAILS',
  /** Send emails */
  SEND_EMAILS = 'SEND_EMAILS',
  /** Manage schedules */
  MANAGE_SCHEDULES = 'MANAGE_SCHEDULES',
  /** View logs */
  VIEW_LOGS = 'VIEW_LOGS',
  /** View audit trail */
  VIEW_AUDIT_TRAIL = 'VIEW_AUDIT_TRAIL',
  /** Manage settings */
  MANAGE_SETTINGS = 'MANAGE_SETTINGS',
  /** View analytics */
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  /** Manage permissions */
  MANAGE_PERMISSIONS = 'MANAGE_PERMISSIONS',
  /** Admin access */
  ADMIN_ACCESS = 'ADMIN_ACCESS',
}

/**
 * Permission category for grouping
 */
export enum PermissionCategory {
  /** Report permissions */
  REPORT = 'REPORT',
  /** Template permissions */
  TEMPLATE = 'TEMPLATE',
  /** Dashboard permissions */
  DASHBOARD = 'DASHBOARD',
  /** Widget permissions */
  WIDGET = 'WIDGET',
  /** Export permissions */
  EXPORT = 'EXPORT',
  /** Email permissions */
  EMAIL = 'EMAIL',
  /** Schedule permissions */
  SCHEDULE = 'SCHEDULE',
  /** System permissions */
  SYSTEM = 'SYSTEM',
  /** Admin permissions */
  ADMIN = 'ADMIN',
}

/**
 * Permission category mapping
 */
export const REPORT_PERMISSION_CATEGORY_MAP: Record<ReportPermission, PermissionCategory> = {
  [ReportPermission.VIEW_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.CREATE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.EDIT_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.DELETE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.EXPORT_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.SCHEDULE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.SHARE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.PUBLISH_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.UNPUBLISH_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.ARCHIVE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.RESTORE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.DUPLICATE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.MERGE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.SPLIT_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.LOCK_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.UNLOCK_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.RENAME_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.MOVE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.COPY_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.REORDER_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.PIN_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.UNPIN_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.FAVORITE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.UNFAVORITE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.RATE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.COMMENT_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.TAG_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.CATEGORIZE_REPORTS]: PermissionCategory.REPORT,
  [ReportPermission.VIEW_TEMPLATES]: PermissionCategory.TEMPLATE,
  [ReportPermission.CREATE_TEMPLATES]: PermissionCategory.TEMPLATE,
  [ReportPermission.EDIT_TEMPLATES]: PermissionCategory.TEMPLATE,
  [ReportPermission.DELETE_TEMPLATES]: PermissionCategory.TEMPLATE,
  [ReportPermission.VIEW_DASHBOARDS]: PermissionCategory.DASHBOARD,
  [ReportPermission.CREATE_DASHBOARDS]: PermissionCategory.DASHBOARD,
  [ReportPermission.EDIT_DASHBOARDS]: PermissionCategory.DASHBOARD,
  [ReportPermission.DELETE_DASHBOARDS]: PermissionCategory.DASHBOARD,
  [ReportPermission.VIEW_WIDGETS]: PermissionCategory.WIDGET,
  [ReportPermission.CREATE_WIDGETS]: PermissionCategory.WIDGET,
  [ReportPermission.EDIT_WIDGETS]: PermissionCategory.WIDGET,
  [ReportPermission.DELETE_WIDGETS]: PermissionCategory.WIDGET,
  [ReportPermission.VIEW_EXPORTS]: PermissionCategory.EXPORT,
  [ReportPermission.CREATE_EXPORTS]: PermissionCategory.EXPORT,
  [ReportPermission.DELETE_EXPORTS]: PermissionCategory.EXPORT,
  [ReportPermission.VIEW_EMAILS]: PermissionCategory.EMAIL,
  [ReportPermission.SEND_EMAILS]: PermissionCategory.EMAIL,
  [ReportPermission.MANAGE_SCHEDULES]: PermissionCategory.SCHEDULE,
  [ReportPermission.VIEW_LOGS]: PermissionCategory.SYSTEM,
  [ReportPermission.VIEW_AUDIT_TRAIL]: PermissionCategory.SYSTEM,
  [ReportPermission.MANAGE_SETTINGS]: PermissionCategory.SYSTEM,
  [ReportPermission.VIEW_ANALYTICS]: PermissionCategory.SYSTEM,
  [ReportPermission.MANAGE_PERMISSIONS]: PermissionCategory.ADMIN,
  [ReportPermission.ADMIN_ACCESS]: PermissionCategory.ADMIN,
};

/**
 * Permission configuration
 */
export interface ReportPermissionConfig {
  permission: ReportPermission;
  label: string;
  description: string;
  category: PermissionCategory;
  defaultLevel: 'READ' | 'WRITE' | 'ADMIN' | 'NONE';
  requiresApproval: boolean;
  icon?: string;
}

export const REPORT_PERMISSION_CONFIG: Record<ReportPermission, ReportPermissionConfig> = {
  [ReportPermission.VIEW_REPORTS]: {
    permission: ReportPermission.VIEW_REPORTS,
    label: 'View Reports',
    description: 'Ability to view reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'READ',
    requiresApproval: false,
    icon: 'Eye',
  },
  [ReportPermission.CREATE_REPORTS]: {
    permission: ReportPermission.CREATE_REPORTS,
    label: 'Create Reports',
    description: 'Ability to create new reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'FilePlus',
  },
  [ReportPermission.EDIT_REPORTS]: {
    permission: ReportPermission.EDIT_REPORTS,
    label: 'Edit Reports',
    description: 'Ability to edit existing reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'FileText',
  },
  [ReportPermission.DELETE_REPORTS]: {
    permission: ReportPermission.DELETE_REPORTS,
    label: 'Delete Reports',
    description: 'Ability to delete reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'FileX',
  },
  [ReportPermission.EXPORT_REPORTS]: {
    permission: ReportPermission.EXPORT_REPORTS,
    label: 'Export Reports',
    description: 'Ability to export reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: true,
    icon: 'Download',
  },
  [ReportPermission.SCHEDULE_REPORTS]: {
    permission: ReportPermission.SCHEDULE_REPORTS,
    label: 'Schedule Reports',
    description: 'Ability to schedule reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: true,
    icon: 'Calendar',
  },
  [ReportPermission.SHARE_REPORTS]: {
    permission: ReportPermission.SHARE_REPORTS,
    label: 'Share Reports',
    description: 'Ability to share reports with others',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'Share2',
  },
  [ReportPermission.PUBLISH_REPORTS]: {
    permission: ReportPermission.PUBLISH_REPORTS,
    label: 'Publish Reports',
    description: 'Ability to publish reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'Globe',
  },
  [ReportPermission.UNPUBLISH_REPORTS]: {
    permission: ReportPermission.UNPUBLISH_REPORTS,
    label: 'Unpublish Reports',
    description: 'Ability to unpublish reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'EyeOff',
  },
  [ReportPermission.ARCHIVE_REPORTS]: {
    permission: ReportPermission.ARCHIVE_REPORTS,
    label: 'Archive Reports',
    description: 'Ability to archive reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'Archive',
  },
  [ReportPermission.RESTORE_REPORTS]: {
    permission: ReportPermission.RESTORE_REPORTS,
    label: 'Restore Reports',
    description: 'Ability to restore archived reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'RotateCcw',
  },
  [ReportPermission.DUPLICATE_REPORTS]: {
    permission: ReportPermission.DUPLICATE_REPORTS,
    label: 'Duplicate Reports',
    description: 'Ability to duplicate reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'Copy',
  },
  [ReportPermission.MERGE_REPORTS]: {
    permission: ReportPermission.MERGE_REPORTS,
    label: 'Merge Reports',
    description: 'Ability to merge reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'GitMerge',
  },
  [ReportPermission.SPLIT_REPORTS]: {
    permission: ReportPermission.SPLIT_REPORTS,
    label: 'Split Reports',
    description: 'Ability to split reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'GitBranch',
  },
  [ReportPermission.LOCK_REPORTS]: {
    permission: ReportPermission.LOCK_REPORTS,
    label: 'Lock Reports',
    description: 'Ability to lock reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'Lock',
  },
  [ReportPermission.UNLOCK_REPORTS]: {
    permission: ReportPermission.UNLOCK_REPORTS,
    label: 'Unlock Reports',
    description: 'Ability to unlock reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'Unlock',
  },
  [ReportPermission.RENAME_REPORTS]: {
    permission: ReportPermission.RENAME_REPORTS,
    label: 'Rename Reports',
    description: 'Ability to rename reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'Pencil',
  },
  [ReportPermission.MOVE_REPORTS]: {
    permission: ReportPermission.MOVE_REPORTS,
    label: 'Move Reports',
    description: 'Ability to move reports between folders',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'Move',
  },
  [ReportPermission.COPY_REPORTS]: {
    permission: ReportPermission.COPY_REPORTS,
    label: 'Copy Reports',
    description: 'Ability to copy reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'Copy',
  },
  [ReportPermission.REORDER_REPORTS]: {
    permission: ReportPermission.REORDER_REPORTS,
    label: 'Reorder Reports',
    description: 'Ability to reorder reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'ArrowUpDown',
  },
  [ReportPermission.PIN_REPORTS]: {
    permission: ReportPermission.PIN_REPORTS,
    label: 'Pin Reports',
    description: 'Ability to pin reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'Pin',
  },
  [ReportPermission.UNPIN_REPORTS]: {
    permission: ReportPermission.UNPIN_REPORTS,
    label: 'Unpin Reports',
    description: 'Ability to unpin reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'PinOff',
  },
  [ReportPermission.FAVORITE_REPORTS]: {
    permission: ReportPermission.FAVORITE_REPORTS,
    label: 'Favorite Reports',
    description: 'Ability to favorite reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'READ',
    requiresApproval: false,
    icon: 'Star',
  },
  [ReportPermission.UNFAVORITE_REPORTS]: {
    permission: ReportPermission.UNFAVORITE_REPORTS,
    label: 'Unfavorite Reports',
    description: 'Ability to unfavorite reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'READ',
    requiresApproval: false,
    icon: 'StarOff',
  },
  [ReportPermission.RATE_REPORTS]: {
    permission: ReportPermission.RATE_REPORTS,
    label: 'Rate Reports',
    description: 'Ability to rate reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'READ',
    requiresApproval: false,
    icon: 'ThumbsUp',
  },
  [ReportPermission.COMMENT_REPORTS]: {
    permission: ReportPermission.COMMENT_REPORTS,
    label: 'Comment Reports',
    description: 'Ability to comment on reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'READ',
    requiresApproval: false,
    icon: 'MessageSquare',
  },
  [ReportPermission.TAG_REPORTS]: {
    permission: ReportPermission.TAG_REPORTS,
    label: 'Tag Reports',
    description: 'Ability to tag reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'Tag',
  },
  [ReportPermission.CATEGORIZE_REPORTS]: {
    permission: ReportPermission.CATEGORIZE_REPORTS,
    label: 'Categorize Reports',
    description: 'Ability to categorize reports',
    category: PermissionCategory.REPORT,
    defaultLevel: 'WRITE',
    requiresApproval: false,
    icon: 'Folder',
  },
  [ReportPermission.VIEW_TEMPLATES]: {
    permission: ReportPermission.VIEW_TEMPLATES,
    label: 'View Templates',
    description: 'Ability to view report templates',
    category: PermissionCategory.TEMPLATE,
    defaultLevel: 'READ',
    requiresApproval: false,
    icon: 'FileText',
  },
  [ReportPermission.CREATE_TEMPLATES]: {
    permission: ReportPermission.CREATE_TEMPLATES,
    label: 'Create Templates',
    description: 'Ability to create report templates',
    category: PermissionCategory.TEMPLATE,
    defaultLevel: 'WRITE',
    requiresApproval: true,
    icon: 'FilePlus',
  },
  [ReportPermission.EDIT_TEMPLATES]: {
    permission: ReportPermission.EDIT_TEMPLATES,
    label: 'Edit Templates',
    description: 'Ability to edit report templates',
    category: PermissionCategory.TEMPLATE,
    defaultLevel: 'WRITE',
    requiresApproval: true,
    icon: 'FileText',
  },
  [ReportPermission.DELETE_TEMPLATES]: {
    permission: ReportPermission.DELETE_TEMPLATES,
    label: 'Delete Templates',
    description: 'Ability to delete report templates',
    category: PermissionCategory.TEMPLATE,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'FileX',
  },
  [ReportPermission.VIEW_DASHBOARDS]: {
    permission: ReportPermission.VIEW_DASHBOARDS,
    label: 'View Dashboards',
    description: 'Ability to view dashboards',
    category: PermissionCategory.DASHBOARD,
    defaultLevel: 'READ',
    requiresApproval: false,
    icon: 'Layout',
  },
  [ReportPermission.CREATE_DASHBOARDS]: {
    permission: ReportPermission.CREATE_DASHBOARDS,
    label: 'Create Dashboards',
    description: 'Ability to create dashboards',
    category: PermissionCategory.DASHBOARD,
    defaultLevel: 'WRITE',
    requiresApproval: true,
    icon: 'Layout',
  },
  [ReportPermission.EDIT_DASHBOARDS]: {
    permission: ReportPermission.EDIT_DASHBOARDS,
    label: 'Edit Dashboards',
    description: 'Ability to edit dashboards',
    category: PermissionCategory.DASHBOARD,
    defaultLevel: 'WRITE',
    requiresApproval: true,
    icon: 'Layout',
  },
  [ReportPermission.DELETE_DASHBOARDS]: {
    permission: ReportPermission.DELETE_DASHBOARDS,
    label: 'Delete Dashboards',
    description: 'Ability to delete dashboards',
    category: PermissionCategory.DASHBOARD,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'Layout',
  },
  [ReportPermission.VIEW_WIDGETS]: {
    permission: ReportPermission.VIEW_WIDGETS,
    label: 'View Widgets',
    description: 'Ability to view widgets',
    category: PermissionCategory.WIDGET,
    defaultLevel: 'READ',
    requiresApproval: false,
    icon: 'LayoutGrid',
  },
  [ReportPermission.CREATE_WIDGETS]: {
    permission: ReportPermission.CREATE_WIDGETS,
    label: 'Create Widgets',
    description: 'Ability to create widgets',
    category: PermissionCategory.WIDGET,
    defaultLevel: 'WRITE',
    requiresApproval: true,
    icon: 'LayoutGrid',
  },
  [ReportPermission.EDIT_WIDGETS]: {
    permission: ReportPermission.EDIT_WIDGETS,
    label: 'Edit Widgets',
    description: 'Ability to edit widgets',
    category: PermissionCategory.WIDGET,
    defaultLevel: 'WRITE',
    requiresApproval: true,
    icon: 'LayoutGrid',
  },
  [ReportPermission.DELETE_WIDGETS]: {
    permission: ReportPermission.DELETE_WIDGETS,
    label: 'Delete Widgets',
    description: 'Ability to delete widgets',
    category: PermissionCategory.WIDGET,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'LayoutGrid',
  },
  [ReportPermission.VIEW_EXPORTS]: {
    permission: ReportPermission.VIEW_EXPORTS,
    label: 'View Exports',
    description: 'Ability to view exports',
    category: PermissionCategory.EXPORT,
    defaultLevel: 'READ',
    requiresApproval: false,
    icon: 'Download',
  },
  [ReportPermission.CREATE_EXPORTS]: {
    permission: ReportPermission.CREATE_EXPORTS,
    label: 'Create Exports',
    description: 'Ability to create exports',
    category: PermissionCategory.EXPORT,
    defaultLevel: 'WRITE',
    requiresApproval: true,
    icon: 'Upload',
  },
  [ReportPermission.DELETE_EXPORTS]: {
    permission: ReportPermission.DELETE_EXPORTS,
    label: 'Delete Exports',
    description: 'Ability to delete exports',
    category: PermissionCategory.EXPORT,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'Trash',
  },
  [ReportPermission.VIEW_EMAILS]: {
    permission: ReportPermission.VIEW_EMAILS,
    label: 'View Emails',
    description: 'Ability to view emails',
    category: PermissionCategory.EMAIL,
    defaultLevel: 'READ',
    requiresApproval: false,
    icon: 'Mail',
  },
  [ReportPermission.SEND_EMAILS]: {
    permission: ReportPermission.SEND_EMAILS,
    label: 'Send Emails',
    description: 'Ability to send emails',
    category: PermissionCategory.EMAIL,
    defaultLevel: 'WRITE',
    requiresApproval: true,
    icon: 'Mail',
  },
  [ReportPermission.MANAGE_SCHEDULES]: {
    permission: ReportPermission.MANAGE_SCHEDULES,
    label: 'Manage Schedules',
    description: 'Ability to manage schedules',
    category: PermissionCategory.SCHEDULE,
    defaultLevel: 'WRITE',
    requiresApproval: true,
    icon: 'Calendar',
  },
  [ReportPermission.VIEW_LOGS]: {
    permission: ReportPermission.VIEW_LOGS,
    label: 'View Logs',
    description: 'Ability to view system logs',
    category: PermissionCategory.SYSTEM,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'FileText',
  },
  [ReportPermission.VIEW_AUDIT_TRAIL]: {
    permission: ReportPermission.VIEW_AUDIT_TRAIL,
    label: 'View Audit Trail',
    description: 'Ability to view audit trail',
    category: PermissionCategory.SYSTEM,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'Clipboard',
  },
  [ReportPermission.MANAGE_SETTINGS]: {
    permission: ReportPermission.MANAGE_SETTINGS,
    label: 'Manage Settings',
    description: 'Ability to manage system settings',
    category: PermissionCategory.SYSTEM,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'Settings',
  },
  [ReportPermission.VIEW_ANALYTICS]: {
    permission: ReportPermission.VIEW_ANALYTICS,
    label: 'View Analytics',
    description: 'Ability to view analytics',
    category: PermissionCategory.SYSTEM,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'BarChart',
  },
  [ReportPermission.MANAGE_PERMISSIONS]: {
    permission: ReportPermission.MANAGE_PERMISSIONS,
    label: 'Manage Permissions',
    description: 'Ability to manage permissions',
    category: PermissionCategory.ADMIN,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'Shield',
  },
  [ReportPermission.ADMIN_ACCESS]: {
    permission: ReportPermission.ADMIN_ACCESS,
    label: 'Admin Access',
    description: 'Full administrative access',
    category: PermissionCategory.ADMIN,
    defaultLevel: 'ADMIN',
    requiresApproval: true,
    icon: 'Shield',
  },
};

/**
 * Get permission label
 */
export function getPermissionLabel(permission: ReportPermission): string {
  return REPORT_PERMISSION_CONFIG[permission]?.label || permission;
}

/**
 * Get permission description
 */
export function getPermissionDescription(permission: ReportPermission): string {
  return REPORT_PERMISSION_CONFIG[permission]?.description || '';
}

/**
 * Get permission category
 */
export function getPermissionCategory(permission: ReportPermission): PermissionCategory {
  return REPORT_PERMISSION_CATEGORY_MAP[permission];
}

/**
 * Get permissions by category
 */
export function getPermissionsByCategory(category: PermissionCategory): ReportPermission[] {
  return Object.entries(REPORT_PERMISSION_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([permission]) => permission as ReportPermission);
}

/**
 * Get report permissions
 */
export function getReportPermissions(): ReportPermission[] {
  return getPermissionsByCategory(PermissionCategory.REPORT);
}

/**
 * Get template permissions
 */
export function getTemplatePermissions(): ReportPermission[] {
  return getPermissionsByCategory(PermissionCategory.TEMPLATE);
}

/**
 * Get dashboard permissions
 */
export function getDashboardPermissions(): ReportPermission[] {
  return getPermissionsByCategory(PermissionCategory.DASHBOARD);
}

/**
 * Get widget permissions
 */
export function getWidgetPermissions(): ReportPermission[] {
  return getPermissionsByCategory(PermissionCategory.WIDGET);
}

/**
 * Get export permissions
 */
export function getExportPermissions(): ReportPermission[] {
  return getPermissionsByCategory(PermissionCategory.EXPORT);
}

/**
 * Get email permissions
 */
export function getEmailPermissions(): ReportPermission[] {
  return getPermissionsByCategory(PermissionCategory.EMAIL);
}

/**
 * Get schedule permissions
 */
export function getSchedulePermissions(): ReportPermission[] {
  return getPermissionsByCategory(PermissionCategory.SCHEDULE);
}

/**
 * Get system permissions
 */
export function getSystemPermissions(): ReportPermission[] {
  return getPermissionsByCategory(PermissionCategory.SYSTEM);
}

/**
 * Get admin permissions
 */
export function getAdminPermissions(): ReportPermission[] {
  return getPermissionsByCategory(PermissionCategory.ADMIN);
}

/**
 * Check if user has permission
 */
export function hasPermission(
  userPermissions: ReportPermission[],
  requiredPermission: ReportPermission
): boolean {
  return userPermissions.includes(requiredPermission);
}

/**
 * Check if user has any of the permissions
 */
export function hasAnyPermission(
  userPermissions: ReportPermission[],
  requiredPermissions: ReportPermission[]
): boolean {
  return requiredPermissions.some((permission) => userPermissions.includes(permission));
}

/**
 * Check if user has all permissions
 */
export function hasAllPermissions(
  userPermissions: ReportPermission[],
  requiredPermissions: ReportPermission[]
): boolean {
  return requiredPermissions.every((permission) => userPermissions.includes(permission));
}

/**
 * Default role permissions
 */
export const DEFAULT_ROLE_PERMISSIONS = {
  /** Admin role - full access */
  ADMIN: Object.values(ReportPermission),
  /** Manager role - manage access */
  MANAGER: [
    ReportPermission.VIEW_REPORTS,
    ReportPermission.CREATE_REPORTS,
    ReportPermission.EDIT_REPORTS,
    ReportPermission.DELETE_REPORTS,
    ReportPermission.EXPORT_REPORTS,
    ReportPermission.SCHEDULE_REPORTS,
    ReportPermission.SHARE_REPORTS,
    ReportPermission.PUBLISH_REPORTS,
    ReportPermission.UNPUBLISH_REPORTS,
    ReportPermission.ARCHIVE_REPORTS,
    ReportPermission.RESTORE_REPORTS,
    ReportPermission.DUPLICATE_REPORTS,
    ReportPermission.RENAME_REPORTS,
    ReportPermission.MOVE_REPORTS,
    ReportPermission.COPY_REPORTS,
    ReportPermission.REORDER_REPORTS,
    ReportPermission.PIN_REPORTS,
    ReportPermission.UNPIN_REPORTS,
    ReportPermission.FAVORITE_REPORTS,
    ReportPermission.UNFAVORITE_REPORTS,
    ReportPermission.RATE_REPORTS,
    ReportPermission.COMMENT_REPORTS,
    ReportPermission.TAG_REPORTS,
    ReportPermission.CATEGORIZE_REPORTS,
    ReportPermission.VIEW_TEMPLATES,
    ReportPermission.VIEW_DASHBOARDS,
    ReportPermission.VIEW_WIDGETS,
    ReportPermission.VIEW_EXPORTS,
    ReportPermission.VIEW_EMAILS,
    ReportPermission.MANAGE_SCHEDULES,
  ],
  /** Analyst role - view and analyze */
  ANALYST: [
    ReportPermission.VIEW_REPORTS,
    ReportPermission.CREATE_REPORTS,
    ReportPermission.EDIT_REPORTS,
    ReportPermission.EXPORT_REPORTS,
    ReportPermission.SHARE_REPORTS,
    ReportPermission.PUBLISH_REPORTS,
    ReportPermission.FAVORITE_REPORTS,
    ReportPermission.UNFAVORITE_REPORTS,
    ReportPermission.RATE_REPORTS,
    ReportPermission.COMMENT_REPORTS,
    ReportPermission.TAG_REPORTS,
    ReportPermission.CATEGORIZE_REPORTS,
    ReportPermission.VIEW_TEMPLATES,
    ReportPermission.VIEW_DASHBOARDS,
    ReportPermission.VIEW_WIDGETS,
    ReportPermission.VIEW_EXPORTS,
    ReportPermission.VIEW_EMAILS,
  ],
  /** Viewer role - read-only */
  VIEWER: [
    ReportPermission.VIEW_REPORTS,
    ReportPermission.FAVORITE_REPORTS,
    ReportPermission.UNFAVORITE_REPORTS,
    ReportPermission.RATE_REPORTS,
    ReportPermission.COMMENT_REPORTS,
    ReportPermission.VIEW_TEMPLATES,
    ReportPermission.VIEW_DASHBOARDS,
    ReportPermission.VIEW_WIDGETS,
    ReportPermission.VIEW_EXPORTS,
    ReportPermission.VIEW_EMAILS,
  ],
} as const;

/**
 * Permission levels
 */
export enum PermissionLevel {
  /** No access */
  NONE = 'NONE',
  /** Read-only access */
  READ = 'READ',
  /** Write access */
  WRITE = 'WRITE',
  /** Admin access */
  ADMIN = 'ADMIN',
}
