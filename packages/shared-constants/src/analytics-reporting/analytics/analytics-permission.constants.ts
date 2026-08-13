/**
 * @fileoverview Analytics permissions and access control definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Analytics permissions
 */
export enum AnalyticsPermission {
  /** View analytics data */
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  /** Export analytics data */
  EXPORT_ANALYTICS = 'EXPORT_ANALYTICS',
  /** Create reports */
  CREATE_REPORT = 'CREATE_REPORT',
  /** Delete reports */
  DELETE_REPORT = 'DELETE_REPORT',
  /** View reports */
  VIEW_REPORT = 'VIEW_REPORT',
  /** Manage dashboards */
  MANAGE_DASHBOARD = 'MANAGE_DASHBOARD',
  /** View dashboards */
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',
  /** Manage widgets */
  MANAGE_WIDGET = 'MANAGE_WIDGET',
  /** View widgets */
  VIEW_WIDGET = 'VIEW_WIDGET',
  /** Manage filters */
  MANAGE_FILTER = 'MANAGE_FILTER',
  /** View filters */
  VIEW_FILTER = 'VIEW_FILTER',
  /** Manage metrics */
  MANAGE_METRIC = 'MANAGE_METRIC',
  /** View metrics */
  VIEW_METRIC = 'VIEW_METRIC',
  /** Manage dimensions */
  MANAGE_DIMENSION = 'MANAGE_DIMENSION',
  /** View dimensions */
  VIEW_DIMENSION = 'VIEW_DIMENSION',
  /** Manage intervals */
  MANAGE_INTERVAL = 'MANAGE_INTERVAL',
  /** View intervals */
  VIEW_INTERVAL = 'VIEW_INTERVAL',
  /** Manage periods */
  MANAGE_PERIOD = 'MANAGE_PERIOD',
  /** View periods */
  VIEW_PERIOD = 'VIEW_PERIOD',
  /** Manage comparisons */
  MANAGE_COMPARISON = 'MANAGE_COMPARISON',
  /** View comparisons */
  VIEW_COMPARISON = 'VIEW_COMPARISON',
  /** Manage trends */
  MANAGE_TREND = 'MANAGE_TREND',
  /** View trends */
  VIEW_TREND = 'VIEW_TREND',
  /** Manage aggregations */
  MANAGE_AGGREGATION = 'MANAGE_AGGREGATION',
  /** View aggregations */
  VIEW_AGGREGATION = 'VIEW_AGGREGATION',
  /** Manage data sources */
  MANAGE_DATA_SOURCE = 'MANAGE_DATA_SOURCE',
  /** View data sources */
  VIEW_DATA_SOURCE = 'VIEW_DATA_SOURCE',
  /** Manage categories */
  MANAGE_CATEGORY = 'MANAGE_CATEGORY',
  /** View categories */
  VIEW_CATEGORY = 'VIEW_CATEGORY',
  /** Manage events */
  MANAGE_EVENT = 'MANAGE_EVENT',
  /** View events */
  VIEW_EVENT = 'VIEW_EVENT',
  /** Manage campaigns */
  MANAGE_CAMPAIGN = 'MANAGE_CAMPAIGN',
  /** View campaigns */
  VIEW_CAMPAIGN = 'VIEW_CAMPAIGN',
  /** Manage statuses */
  MANAGE_STATUS = 'MANAGE_STATUS',
  /** View statuses */
  VIEW_STATUS = 'VIEW_STATUS',
  /** Manage errors */
  MANAGE_ERROR = 'MANAGE_ERROR',
  /** View errors */
  VIEW_ERROR = 'VIEW_ERROR',
  /** Manage permissions */
  MANAGE_PERMISSION = 'MANAGE_PERMISSION',
  /** View permissions */
  VIEW_PERMISSION = 'VIEW_PERMISSION',
  /** Manage users */
  MANAGE_USER = 'MANAGE_USER',
  /** View users */
  VIEW_USER = 'VIEW_USER',
  /** Manage roles */
  MANAGE_ROLE = 'MANAGE_ROLE',
  /** View roles */
  VIEW_ROLE = 'VIEW_ROLE',
  /** Manage API keys */
  MANAGE_API_KEY = 'MANAGE_API_KEY',
  /** View API keys */
  VIEW_API_KEY = 'VIEW_API_KEY',
  /** Manage webhooks */
  MANAGE_WEBHOOK = 'MANAGE_WEBHOOK',
  /** View webhooks */
  VIEW_WEBHOOK = 'VIEW_WEBHOOK',
  /** Manage integrations */
  MANAGE_INTEGRATION = 'MANAGE_INTEGRATION',
  /** View integrations */
  VIEW_INTEGRATION = 'VIEW_INTEGRATION',
  /** Manage alerts */
  MANAGE_ALERT = 'MANAGE_ALERT',
  /** View alerts */
  VIEW_ALERT = 'VIEW_ALERT',
  /** Manage notifications */
  MANAGE_NOTIFICATION = 'MANAGE_NOTIFICATION',
  /** View notifications */
  VIEW_NOTIFICATION = 'VIEW_NOTIFICATION',
}

/**
 * Permission category classification
 */
export enum AnalyticsPermissionCategory {
  /** Data view permissions */
  VIEW = 'VIEW',
  /** Data export permissions */
  EXPORT = 'EXPORT',
  /** Data management permissions */
  MANAGE = 'MANAGE',
  /** Report permissions */
  REPORT = 'REPORT',
  /** Dashboard permissions */
  DASHBOARD = 'DASHBOARD',
  /** Widget permissions */
  WIDGET = 'WIDGET',
  /** Filter permissions */
  FILTER = 'FILTER',
  /** Metric permissions */
  METRIC = 'METRIC',
  /** Dimension permissions */
  DIMENSION = 'DIMENSION',
  /** Configuration permissions */
  CONFIG = 'CONFIG',
  /** User management permissions */
  USER = 'USER',
  /** System management permissions */
  SYSTEM = 'SYSTEM',
  /** Integration permissions */
  INTEGRATION = 'INTEGRATION',
  /** Alert permissions */
  ALERT = 'ALERT',
}

/**
 * Permission category mapping
 */
export const ANALYTICS_PERMISSION_CATEGORY_MAP: Record<
  AnalyticsPermission,
  AnalyticsPermissionCategory
> = {
  [AnalyticsPermission.VIEW_ANALYTICS]: AnalyticsPermissionCategory.VIEW,
  [AnalyticsPermission.EXPORT_ANALYTICS]: AnalyticsPermissionCategory.EXPORT,
  [AnalyticsPermission.CREATE_REPORT]: AnalyticsPermissionCategory.REPORT,
  [AnalyticsPermission.DELETE_REPORT]: AnalyticsPermissionCategory.REPORT,
  [AnalyticsPermission.VIEW_REPORT]: AnalyticsPermissionCategory.REPORT,
  [AnalyticsPermission.MANAGE_DASHBOARD]: AnalyticsPermissionCategory.DASHBOARD,
  [AnalyticsPermission.VIEW_DASHBOARD]: AnalyticsPermissionCategory.DASHBOARD,
  [AnalyticsPermission.MANAGE_WIDGET]: AnalyticsPermissionCategory.WIDGET,
  [AnalyticsPermission.VIEW_WIDGET]: AnalyticsPermissionCategory.WIDGET,
  [AnalyticsPermission.MANAGE_FILTER]: AnalyticsPermissionCategory.FILTER,
  [AnalyticsPermission.VIEW_FILTER]: AnalyticsPermissionCategory.FILTER,
  [AnalyticsPermission.MANAGE_METRIC]: AnalyticsPermissionCategory.METRIC,
  [AnalyticsPermission.VIEW_METRIC]: AnalyticsPermissionCategory.METRIC,
  [AnalyticsPermission.MANAGE_DIMENSION]: AnalyticsPermissionCategory.DIMENSION,
  [AnalyticsPermission.VIEW_DIMENSION]: AnalyticsPermissionCategory.DIMENSION,
  [AnalyticsPermission.MANAGE_INTERVAL]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.VIEW_INTERVAL]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.MANAGE_PERIOD]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.VIEW_PERIOD]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.MANAGE_COMPARISON]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.VIEW_COMPARISON]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.MANAGE_TREND]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.VIEW_TREND]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.MANAGE_AGGREGATION]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.VIEW_AGGREGATION]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.MANAGE_DATA_SOURCE]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.VIEW_DATA_SOURCE]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.MANAGE_CATEGORY]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.VIEW_CATEGORY]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.MANAGE_EVENT]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.VIEW_EVENT]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.MANAGE_CAMPAIGN]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.VIEW_CAMPAIGN]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.MANAGE_STATUS]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.VIEW_STATUS]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.MANAGE_ERROR]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.VIEW_ERROR]: AnalyticsPermissionCategory.CONFIG,
  [AnalyticsPermission.MANAGE_PERMISSION]: AnalyticsPermissionCategory.SYSTEM,
  [AnalyticsPermission.VIEW_PERMISSION]: AnalyticsPermissionCategory.SYSTEM,
  [AnalyticsPermission.MANAGE_USER]: AnalyticsPermissionCategory.USER,
  [AnalyticsPermission.VIEW_USER]: AnalyticsPermissionCategory.USER,
  [AnalyticsPermission.MANAGE_ROLE]: AnalyticsPermissionCategory.USER,
  [AnalyticsPermission.VIEW_ROLE]: AnalyticsPermissionCategory.USER,
  [AnalyticsPermission.MANAGE_API_KEY]: AnalyticsPermissionCategory.SYSTEM,
  [AnalyticsPermission.VIEW_API_KEY]: AnalyticsPermissionCategory.SYSTEM,
  [AnalyticsPermission.MANAGE_WEBHOOK]: AnalyticsPermissionCategory.INTEGRATION,
  [AnalyticsPermission.VIEW_WEBHOOK]: AnalyticsPermissionCategory.INTEGRATION,
  [AnalyticsPermission.MANAGE_INTEGRATION]: AnalyticsPermissionCategory.INTEGRATION,
  [AnalyticsPermission.VIEW_INTEGRATION]: AnalyticsPermissionCategory.INTEGRATION,
  [AnalyticsPermission.MANAGE_ALERT]: AnalyticsPermissionCategory.ALERT,
  [AnalyticsPermission.VIEW_ALERT]: AnalyticsPermissionCategory.ALERT,
  [AnalyticsPermission.MANAGE_NOTIFICATION]: AnalyticsPermissionCategory.ALERT,
  [AnalyticsPermission.VIEW_NOTIFICATION]: AnalyticsPermissionCategory.ALERT,
};

/**
 * Permission level
 */
export enum AnalyticsPermissionLevel {
  /** No access */
  NONE = 'NONE',
  /** Read-only access */
  READ = 'READ',
  /** Write access */
  WRITE = 'WRITE',
  /** Delete access */
  DELETE = 'DELETE',
  /** Full access */
  FULL = 'FULL',
}

/**
 * Permission configuration
 */
export interface AnalyticsPermissionConfig {
  permission: AnalyticsPermission;
  label: string;
  description: string;
  category: AnalyticsPermissionCategory;
  defaultLevel: AnalyticsPermissionLevel;
  requiresApproval: boolean;
  icon?: string;
}

export const ANALYTICS_PERMISSION_CONFIG: Record<AnalyticsPermission, AnalyticsPermissionConfig> = {
  [AnalyticsPermission.VIEW_ANALYTICS]: {
    permission: AnalyticsPermission.VIEW_ANALYTICS,
    label: 'View Analytics',
    description: 'Ability to view analytics data and reports',
    category: AnalyticsPermissionCategory.VIEW,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Eye',
  },
  [AnalyticsPermission.EXPORT_ANALYTICS]: {
    permission: AnalyticsPermission.EXPORT_ANALYTICS,
    label: 'Export Analytics',
    description: 'Ability to export analytics data',
    category: AnalyticsPermissionCategory.EXPORT,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: true,
    icon: 'Download',
  },
  [AnalyticsPermission.CREATE_REPORT]: {
    permission: AnalyticsPermission.CREATE_REPORT,
    label: 'Create Report',
    description: 'Ability to create new reports',
    category: AnalyticsPermissionCategory.REPORT,
    defaultLevel: AnalyticsPermissionLevel.WRITE,
    requiresApproval: false,
    icon: 'FilePlus',
  },
  [AnalyticsPermission.DELETE_REPORT]: {
    permission: AnalyticsPermission.DELETE_REPORT,
    label: 'Delete Report',
    description: 'Ability to delete reports',
    category: AnalyticsPermissionCategory.REPORT,
    defaultLevel: AnalyticsPermissionLevel.DELETE,
    requiresApproval: true,
    icon: 'FileX',
  },
  [AnalyticsPermission.VIEW_REPORT]: {
    permission: AnalyticsPermission.VIEW_REPORT,
    label: 'View Report',
    description: 'Ability to view reports',
    category: AnalyticsPermissionCategory.REPORT,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'FileText',
  },
  [AnalyticsPermission.MANAGE_DASHBOARD]: {
    permission: AnalyticsPermission.MANAGE_DASHBOARD,
    label: 'Manage Dashboard',
    description: 'Ability to create, edit, and delete dashboards',
    category: AnalyticsPermissionCategory.DASHBOARD,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'Layout',
  },
  [AnalyticsPermission.VIEW_DASHBOARD]: {
    permission: AnalyticsPermission.VIEW_DASHBOARD,
    label: 'View Dashboard',
    description: 'Ability to view dashboards',
    category: AnalyticsPermissionCategory.DASHBOARD,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Layout',
  },
  [AnalyticsPermission.MANAGE_WIDGET]: {
    permission: AnalyticsPermission.MANAGE_WIDGET,
    label: 'Manage Widget',
    description: 'Ability to create, edit, and delete widgets',
    category: AnalyticsPermissionCategory.WIDGET,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'LayoutGrid',
  },
  [AnalyticsPermission.VIEW_WIDGET]: {
    permission: AnalyticsPermission.VIEW_WIDGET,
    label: 'View Widget',
    description: 'Ability to view widgets',
    category: AnalyticsPermissionCategory.WIDGET,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'LayoutGrid',
  },
  [AnalyticsPermission.MANAGE_FILTER]: {
    permission: AnalyticsPermission.MANAGE_FILTER,
    label: 'Manage Filter',
    description: 'Ability to create, edit, and delete filters',
    category: AnalyticsPermissionCategory.FILTER,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'Filter',
  },
  [AnalyticsPermission.VIEW_FILTER]: {
    permission: AnalyticsPermission.VIEW_FILTER,
    label: 'View Filter',
    description: 'Ability to view filters',
    category: AnalyticsPermissionCategory.FILTER,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Filter',
  },
  [AnalyticsPermission.MANAGE_METRIC]: {
    permission: AnalyticsPermission.MANAGE_METRIC,
    label: 'Manage Metric',
    description: 'Ability to create, edit, and delete metrics',
    category: AnalyticsPermissionCategory.METRIC,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'BarChart',
  },
  [AnalyticsPermission.VIEW_METRIC]: {
    permission: AnalyticsPermission.VIEW_METRIC,
    label: 'View Metric',
    description: 'Ability to view metrics',
    category: AnalyticsPermissionCategory.METRIC,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'BarChart',
  },
  [AnalyticsPermission.MANAGE_DIMENSION]: {
    permission: AnalyticsPermission.MANAGE_DIMENSION,
    label: 'Manage Dimension',
    description: 'Ability to create, edit, and delete dimensions',
    category: AnalyticsPermissionCategory.DIMENSION,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'Grid',
  },
  [AnalyticsPermission.VIEW_DIMENSION]: {
    permission: AnalyticsPermission.VIEW_DIMENSION,
    label: 'View Dimension',
    description: 'Ability to view dimensions',
    category: AnalyticsPermissionCategory.DIMENSION,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Grid',
  },
  [AnalyticsPermission.MANAGE_INTERVAL]: {
    permission: AnalyticsPermission.MANAGE_INTERVAL,
    label: 'Manage Interval',
    description: 'Ability to manage time intervals',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.WRITE,
    requiresApproval: true,
    icon: 'Clock',
  },
  [AnalyticsPermission.VIEW_INTERVAL]: {
    permission: AnalyticsPermission.VIEW_INTERVAL,
    label: 'View Interval',
    description: 'Ability to view time intervals',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Clock',
  },
  [AnalyticsPermission.MANAGE_PERIOD]: {
    permission: AnalyticsPermission.MANAGE_PERIOD,
    label: 'Manage Period',
    description: 'Ability to manage time periods',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.WRITE,
    requiresApproval: true,
    icon: 'Calendar',
  },
  [AnalyticsPermission.VIEW_PERIOD]: {
    permission: AnalyticsPermission.VIEW_PERIOD,
    label: 'View Period',
    description: 'Ability to view time periods',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Calendar',
  },
  [AnalyticsPermission.MANAGE_COMPARISON]: {
    permission: AnalyticsPermission.MANAGE_COMPARISON,
    label: 'Manage Comparison',
    description: 'Ability to manage comparison methods',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.WRITE,
    requiresApproval: true,
    icon: 'GitCompare',
  },
  [AnalyticsPermission.VIEW_COMPARISON]: {
    permission: AnalyticsPermission.VIEW_COMPARISON,
    label: 'View Comparison',
    description: 'Ability to view comparison methods',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'GitCompare',
  },
  [AnalyticsPermission.MANAGE_TREND]: {
    permission: AnalyticsPermission.MANAGE_TREND,
    label: 'Manage Trend',
    description: 'Ability to manage trend analysis',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.WRITE,
    requiresApproval: true,
    icon: 'TrendingUp',
  },
  [AnalyticsPermission.VIEW_TREND]: {
    permission: AnalyticsPermission.VIEW_TREND,
    label: 'View Trend',
    description: 'Ability to view trend analysis',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'TrendingUp',
  },
  [AnalyticsPermission.MANAGE_AGGREGATION]: {
    permission: AnalyticsPermission.MANAGE_AGGREGATION,
    label: 'Manage Aggregation',
    description: 'Ability to manage aggregation methods',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.WRITE,
    requiresApproval: true,
    icon: 'Sigma',
  },
  [AnalyticsPermission.VIEW_AGGREGATION]: {
    permission: AnalyticsPermission.VIEW_AGGREGATION,
    label: 'View Aggregation',
    description: 'Ability to view aggregation methods',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Sigma',
  },
  [AnalyticsPermission.MANAGE_DATA_SOURCE]: {
    permission: AnalyticsPermission.MANAGE_DATA_SOURCE,
    label: 'Manage Data Source',
    description: 'Ability to manage data sources',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'Database',
  },
  [AnalyticsPermission.VIEW_DATA_SOURCE]: {
    permission: AnalyticsPermission.VIEW_DATA_SOURCE,
    label: 'View Data Source',
    description: 'Ability to view data sources',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Database',
  },
  [AnalyticsPermission.MANAGE_CATEGORY]: {
    permission: AnalyticsPermission.MANAGE_CATEGORY,
    label: 'Manage Category',
    description: 'Ability to manage data categories',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.WRITE,
    requiresApproval: true,
    icon: 'Folder',
  },
  [AnalyticsPermission.VIEW_CATEGORY]: {
    permission: AnalyticsPermission.VIEW_CATEGORY,
    label: 'View Category',
    description: 'Ability to view data categories',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Folder',
  },
  [AnalyticsPermission.MANAGE_EVENT]: {
    permission: AnalyticsPermission.MANAGE_EVENT,
    label: 'Manage Event',
    description: 'Ability to manage events',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.WRITE,
    requiresApproval: true,
    icon: 'Activity',
  },
  [AnalyticsPermission.VIEW_EVENT]: {
    permission: AnalyticsPermission.VIEW_EVENT,
    label: 'View Event',
    description: 'Ability to view events',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Activity',
  },
  [AnalyticsPermission.MANAGE_CAMPAIGN]: {
    permission: AnalyticsPermission.MANAGE_CAMPAIGN,
    label: 'Manage Campaign',
    description: 'Ability to manage campaigns',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.WRITE,
    requiresApproval: true,
    icon: 'Megaphone',
  },
  [AnalyticsPermission.VIEW_CAMPAIGN]: {
    permission: AnalyticsPermission.VIEW_CAMPAIGN,
    label: 'View Campaign',
    description: 'Ability to view campaigns',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Megaphone',
  },
  [AnalyticsPermission.MANAGE_STATUS]: {
    permission: AnalyticsPermission.MANAGE_STATUS,
    label: 'Manage Status',
    description: 'Ability to manage data statuses',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.WRITE,
    requiresApproval: true,
    icon: 'CheckCircle',
  },
  [AnalyticsPermission.VIEW_STATUS]: {
    permission: AnalyticsPermission.VIEW_STATUS,
    label: 'View Status',
    description: 'Ability to view data statuses',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'CheckCircle',
  },
  [AnalyticsPermission.MANAGE_ERROR]: {
    permission: AnalyticsPermission.MANAGE_ERROR,
    label: 'Manage Error',
    description: 'Ability to manage error codes',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.WRITE,
    requiresApproval: true,
    icon: 'AlertCircle',
  },
  [AnalyticsPermission.VIEW_ERROR]: {
    permission: AnalyticsPermission.VIEW_ERROR,
    label: 'View Error',
    description: 'Ability to view error codes',
    category: AnalyticsPermissionCategory.CONFIG,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'AlertCircle',
  },
  [AnalyticsPermission.MANAGE_PERMISSION]: {
    permission: AnalyticsPermission.MANAGE_PERMISSION,
    label: 'Manage Permission',
    description: 'Ability to manage permissions',
    category: AnalyticsPermissionCategory.SYSTEM,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'Shield',
  },
  [AnalyticsPermission.VIEW_PERMISSION]: {
    permission: AnalyticsPermission.VIEW_PERMISSION,
    label: 'View Permission',
    description: 'Ability to view permissions',
    category: AnalyticsPermissionCategory.SYSTEM,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Shield',
  },
  [AnalyticsPermission.MANAGE_USER]: {
    permission: AnalyticsPermission.MANAGE_USER,
    label: 'Manage User',
    description: 'Ability to manage users',
    category: AnalyticsPermissionCategory.USER,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'Users',
  },
  [AnalyticsPermission.VIEW_USER]: {
    permission: AnalyticsPermission.VIEW_USER,
    label: 'View User',
    description: 'Ability to view users',
    category: AnalyticsPermissionCategory.USER,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Users',
  },
  [AnalyticsPermission.MANAGE_ROLE]: {
    permission: AnalyticsPermission.MANAGE_ROLE,
    label: 'Manage Role',
    description: 'Ability to manage user roles',
    category: AnalyticsPermissionCategory.USER,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'UserCog',
  },
  [AnalyticsPermission.VIEW_ROLE]: {
    permission: AnalyticsPermission.VIEW_ROLE,
    label: 'View Role',
    description: 'Ability to view user roles',
    category: AnalyticsPermissionCategory.USER,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'UserCog',
  },
  [AnalyticsPermission.MANAGE_API_KEY]: {
    permission: AnalyticsPermission.MANAGE_API_KEY,
    label: 'Manage API Key',
    description: 'Ability to manage API keys',
    category: AnalyticsPermissionCategory.SYSTEM,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'Key',
  },
  [AnalyticsPermission.VIEW_API_KEY]: {
    permission: AnalyticsPermission.VIEW_API_KEY,
    label: 'View API Key',
    description: 'Ability to view API keys',
    category: AnalyticsPermissionCategory.SYSTEM,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Key',
  },
  [AnalyticsPermission.MANAGE_WEBHOOK]: {
    permission: AnalyticsPermission.MANAGE_WEBHOOK,
    label: 'Manage Webhook',
    description: 'Ability to manage webhooks',
    category: AnalyticsPermissionCategory.INTEGRATION,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'Zap',
  },
  [AnalyticsPermission.VIEW_WEBHOOK]: {
    permission: AnalyticsPermission.VIEW_WEBHOOK,
    label: 'View Webhook',
    description: 'Ability to view webhooks',
    category: AnalyticsPermissionCategory.INTEGRATION,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Zap',
  },
  [AnalyticsPermission.MANAGE_INTEGRATION]: {
    permission: AnalyticsPermission.MANAGE_INTEGRATION,
    label: 'Manage Integration',
    description: 'Ability to manage integrations',
    category: AnalyticsPermissionCategory.INTEGRATION,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'Plug',
  },
  [AnalyticsPermission.VIEW_INTEGRATION]: {
    permission: AnalyticsPermission.VIEW_INTEGRATION,
    label: 'View Integration',
    description: 'Ability to view integrations',
    category: AnalyticsPermissionCategory.INTEGRATION,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Plug',
  },
  [AnalyticsPermission.MANAGE_ALERT]: {
    permission: AnalyticsPermission.MANAGE_ALERT,
    label: 'Manage Alert',
    description: 'Ability to manage alerts',
    category: AnalyticsPermissionCategory.ALERT,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'Bell',
  },
  [AnalyticsPermission.VIEW_ALERT]: {
    permission: AnalyticsPermission.VIEW_ALERT,
    label: 'View Alert',
    description: 'Ability to view alerts',
    category: AnalyticsPermissionCategory.ALERT,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'Bell',
  },
  [AnalyticsPermission.MANAGE_NOTIFICATION]: {
    permission: AnalyticsPermission.MANAGE_NOTIFICATION,
    label: 'Manage Notification',
    description: 'Ability to manage notifications',
    category: AnalyticsPermissionCategory.ALERT,
    defaultLevel: AnalyticsPermissionLevel.FULL,
    requiresApproval: true,
    icon: 'MessageSquare',
  },
  [AnalyticsPermission.VIEW_NOTIFICATION]: {
    permission: AnalyticsPermission.VIEW_NOTIFICATION,
    label: 'View Notification',
    description: 'Ability to view notifications',
    category: AnalyticsPermissionCategory.ALERT,
    defaultLevel: AnalyticsPermissionLevel.READ,
    requiresApproval: false,
    icon: 'MessageSquare',
  },
};

/**
 * Get permission category
 */
export function getPermissionCategory(
  permission: AnalyticsPermission
): AnalyticsPermissionCategory {
  return ANALYTICS_PERMISSION_CATEGORY_MAP[permission];
}

/**
 * Get permission label
 */
export function getPermissionLabel(permission: AnalyticsPermission): string {
  return ANALYTICS_PERMISSION_CONFIG[permission]?.label || permission;
}

/**
 * Get permission description
 */
export function getPermissionDescription(permission: AnalyticsPermission): string {
  return ANALYTICS_PERMISSION_CONFIG[permission]?.description || '';
}

/**
 * Get permission default level
 */
export function getPermissionDefaultLevel(
  permission: AnalyticsPermission
): AnalyticsPermissionLevel {
  return ANALYTICS_PERMISSION_CONFIG[permission]?.defaultLevel || AnalyticsPermissionLevel.NONE;
}

/**
 * Check if permission requires approval
 */
export function permissionRequiresApproval(permission: AnalyticsPermission): boolean {
  return ANALYTICS_PERMISSION_CONFIG[permission]?.requiresApproval || false;
}

/**
 * Get permissions by category
 */
export function getPermissionsByCategory(
  category: AnalyticsPermissionCategory
): AnalyticsPermission[] {
  return Object.entries(ANALYTICS_PERMISSION_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([permission]) => permission as AnalyticsPermission);
}

/**
 * Get view permissions
 */
export function getViewPermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.VIEW);
}

/**
 * Get manage permissions
 */
export function getManagePermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.MANAGE);
}

/**
 * Get report permissions
 */
export function getReportPermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.REPORT);
}

/**
 * Get dashboard permissions
 */
export function getDashboardPermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.DASHBOARD);
}

/**
 * Get widget permissions
 */
export function getWidgetPermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.WIDGET);
}

/**
 * Get filter permissions
 */
export function getFilterPermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.FILTER);
}

/**
 * Get metric permissions
 */
export function getMetricPermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.METRIC);
}

/**
 * Get dimension permissions
 */
export function getDimensionPermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.DIMENSION);
}

/**
 * Get config permissions
 */
export function getConfigPermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.CONFIG);
}

/**
 * Get user permissions
 */
export function getUserPermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.USER);
}

/**
 * Get system permissions
 */
export function getSystemPermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.SYSTEM);
}

/**
 * Get integration permissions
 */
export function getIntegrationPermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.INTEGRATION);
}

/**
 * Get alert permissions
 */
export function getAlertPermissions(): AnalyticsPermission[] {
  return getPermissionsByCategory(AnalyticsPermissionCategory.ALERT);
}

/**
 * Check if user has permission
 */
export function hasPermission(
  userPermissions: AnalyticsPermission[],
  requiredPermission: AnalyticsPermission
): boolean {
  return userPermissions.includes(requiredPermission);
}

/**
 * Check if user has any of the permissions
 */
export function hasAnyPermission(
  userPermissions: AnalyticsPermission[],
  requiredPermissions: AnalyticsPermission[]
): boolean {
  return requiredPermissions.some((permission) => userPermissions.includes(permission));
}

/**
 * Check if user has all permissions
 */
export function hasAllPermissions(
  userPermissions: AnalyticsPermission[],
  requiredPermissions: AnalyticsPermission[]
): boolean {
  return requiredPermissions.every((permission) => userPermissions.includes(permission));
}

/**
 * Default role permissions
 */
export const DEFAULT_ROLE_PERMISSIONS = {
  /** Admin role - full access */
  ADMIN: Object.values(AnalyticsPermission),
  /** Manager role - manage access */
  MANAGER: [
    AnalyticsPermission.VIEW_ANALYTICS,
    AnalyticsPermission.EXPORT_ANALYTICS,
    AnalyticsPermission.CREATE_REPORT,
    AnalyticsPermission.VIEW_REPORT,
    AnalyticsPermission.MANAGE_DASHBOARD,
    AnalyticsPermission.VIEW_DASHBOARD,
    AnalyticsPermission.MANAGE_WIDGET,
    AnalyticsPermission.VIEW_WIDGET,
    AnalyticsPermission.MANAGE_FILTER,
    AnalyticsPermission.VIEW_FILTER,
    AnalyticsPermission.MANAGE_METRIC,
    AnalyticsPermission.VIEW_METRIC,
    AnalyticsPermission.MANAGE_DIMENSION,
    AnalyticsPermission.VIEW_DIMENSION,
    AnalyticsPermission.MANAGE_INTERVAL,
    AnalyticsPermission.VIEW_INTERVAL,
    AnalyticsPermission.MANAGE_PERIOD,
    AnalyticsPermission.VIEW_PERIOD,
    AnalyticsPermission.MANAGE_COMPARISON,
    AnalyticsPermission.VIEW_COMPARISON,
    AnalyticsPermission.MANAGE_TREND,
    AnalyticsPermission.VIEW_TREND,
    AnalyticsPermission.MANAGE_AGGREGATION,
    AnalyticsPermission.VIEW_AGGREGATION,
  ],
  /** Analyst role - view and analyze */
  ANALYST: [
    AnalyticsPermission.VIEW_ANALYTICS,
    AnalyticsPermission.EXPORT_ANALYTICS,
    AnalyticsPermission.CREATE_REPORT,
    AnalyticsPermission.VIEW_REPORT,
    AnalyticsPermission.VIEW_DASHBOARD,
    AnalyticsPermission.VIEW_WIDGET,
    AnalyticsPermission.VIEW_FILTER,
    AnalyticsPermission.VIEW_METRIC,
    AnalyticsPermission.VIEW_DIMENSION,
    AnalyticsPermission.VIEW_INTERVAL,
    AnalyticsPermission.VIEW_PERIOD,
    AnalyticsPermission.VIEW_COMPARISON,
    AnalyticsPermission.VIEW_TREND,
    AnalyticsPermission.VIEW_AGGREGATION,
  ],
  /** Viewer role - read-only */
  VIEWER: [
    AnalyticsPermission.VIEW_ANALYTICS,
    AnalyticsPermission.VIEW_REPORT,
    AnalyticsPermission.VIEW_DASHBOARD,
    AnalyticsPermission.VIEW_WIDGET,
    AnalyticsPermission.VIEW_FILTER,
    AnalyticsPermission.VIEW_METRIC,
    AnalyticsPermission.VIEW_DIMENSION,
  ],
};
