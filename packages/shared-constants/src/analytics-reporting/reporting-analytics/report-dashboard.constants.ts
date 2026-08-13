/**
 * @fileoverview Report dashboard constants and configurations
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Dashboard layout types
 */
export enum DashboardLayoutType {
  /** Fixed layout - fixed width and positioning */
  FIXED = 'FIXED',
  /** Fluid layout - responsive and flexible */
  FLUID = 'FLUID',
  /** Responsive layout - adapts to screen size */
  RESPONSIVE = 'RESPONSIVE',
  /** Custom layout - user defined */
  CUSTOM = 'CUSTOM',
  /** Grid layout - grid-based positioning */
  GRID = 'GRID',
  /** Masonry layout - Pinterest-style layout */
  MASONRY = 'MASONRY',
  /** Freeform layout - drag and drop anywhere */
  FREEFORM = 'FREEFORM',
}

/**
 * Dashboard themes
 */
export enum DashboardTheme {
  /** Light theme */
  LIGHT = 'LIGHT',
  /** Dark theme */
  DARK = 'DARK',
  /** Custom theme */
  CUSTOM = 'CUSTOM',
  /** Professional theme */
  PROFESSIONAL = 'PROFESSIONAL',
  /** Modern theme */
  MODERN = 'MODERN',
  /** Classic theme */
  CLASSIC = 'CLASSIC',
  /** High contrast theme */
  HIGH_CONTRAST = 'HIGH_CONTRAST',
}

/**
 * Dashboard configuration
 */
export interface DashboardConfig {
  /** Dashboard ID */
  id: string;
  /** Dashboard name */
  name: string;
  /** Dashboard description */
  description: string;
  /** Layout type */
  layoutType: DashboardLayoutType;
  /** Theme */
  theme: DashboardTheme;
  /** Refresh interval in seconds */
  refreshIntervalSeconds: number;
  /** Widgets */
  widgets: DashboardWidget[];
  /** Max widgets */
  maxWidgets: number;
  /** Background color */
  backgroundColor: string;
  /** Text color */
  textColor: string;
  /** Primary color */
  primaryColor: string;
  /** Secondary color */
  secondaryColor: string;
  /** Is active */
  isActive: boolean;
  /** Is default */
  isDefault: boolean;
  /** Custom CSS */
  customCSS?: string;
  /** Custom JavaScript */
  customJavaScript?: string;
}

export const DEFAULT_DASHBOARD_CONFIG: DashboardConfig = {
  id: 'default',
  name: 'Default Dashboard',
  description: 'Default dashboard configuration',
  layoutType: DashboardLayoutType.RESPONSIVE,
  theme: DashboardTheme.LIGHT,
  refreshIntervalSeconds: 60,
  widgets: [],
  maxWidgets: 20,
  backgroundColor: '#FFFFFF',
  textColor: '#111827',
  primaryColor: '#3B82F6',
  secondaryColor: '#6B7280',
  isActive: true,
  isDefault: true,
};

/**
 * Dashboard widget
 */
export interface DashboardWidget {
  /** Widget ID */
  id: string;
  /** Widget type */
  type: string;
  /** Widget title */
  title: string;
  /** Widget description */
  description?: string;
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Width */
  width: number;
  /** Height */
  height: number;
  /** Configuration */
  config: Record<string, unknown>;
  /** Is visible */
  isVisible: boolean;
  /** Is resizable */
  isResizable: boolean;
  /** Is draggable */
  isDraggable: boolean;
}

/**
 * Dashboard refresh interval options
 */
export enum DashboardRefreshInterval {
  /** No auto-refresh */
  OFF = 'OFF',
  /** Every 5 seconds */
  FIVE_SECONDS = 'FIVE_SECONDS',
  /** Every 10 seconds */
  TEN_SECONDS = 'TEN_SECONDS',
  /** Every 30 seconds */
  THIRTY_SECONDS = 'THIRTY_SECONDS',
  /** Every 1 minute */
  ONE_MINUTE = 'ONE_MINUTE',
  /** Every 5 minutes */
  FIVE_MINUTES = 'FIVE_MINUTES',
  /** Every 15 minutes */
  FIFTEEN_MINUTES = 'FIFTEEN_MINUTES',
  /** Every 30 minutes */
  THIRTY_MINUTES = 'THIRTY_MINUTES',
  /** Every 1 hour */
  ONE_HOUR = 'ONE_HOUR',
  /** Every 6 hours */
  SIX_HOURS = 'SIX_HOURS',
  /** Every 12 hours */
  TWELVE_HOURS = 'TWELVE_HOURS',
  /** Every 24 hours */
  TWENTY_FOUR_HOURS = 'TWENTY_FOUR_HOURS',
}

/**
 * Dashboard refresh interval values in seconds
 */
export const DASHBOARD_REFRESH_INTERVAL_VALUES: Record<DashboardRefreshInterval, number> = {
  [DashboardRefreshInterval.OFF]: 0,
  [DashboardRefreshInterval.FIVE_SECONDS]: 5,
  [DashboardRefreshInterval.TEN_SECONDS]: 10,
  [DashboardRefreshInterval.THIRTY_SECONDS]: 30,
  [DashboardRefreshInterval.ONE_MINUTE]: 60,
  [DashboardRefreshInterval.FIVE_MINUTES]: 300,
  [DashboardRefreshInterval.FIFTEEN_MINUTES]: 900,
  [DashboardRefreshInterval.THIRTY_MINUTES]: 1800,
  [DashboardRefreshInterval.ONE_HOUR]: 3600,
  [DashboardRefreshInterval.SIX_HOURS]: 21600,
  [DashboardRefreshInterval.TWELVE_HOURS]: 43200,
  [DashboardRefreshInterval.TWENTY_FOUR_HOURS]: 86400,
};

/**
 * Dashboard permission settings
 */
export interface DashboardPermissionSettings {
  /** Enable permissions */
  enablePermissions: boolean;
  /** Default access level */
  defaultAccess: 'READ' | 'WRITE' | 'ADMIN' | 'NONE';
  /** Allowed roles */
  allowedRoles: string[];
  /** Allowed users */
  allowedUsers: string[];
  /** Allowed groups */
  allowedGroups: string[];
  /** Enable sharing */
  enableSharing: boolean;
  /** Share link expiry in days */
  shareLinkExpiryDays: number;
}

export const DEFAULT_DASHBOARD_PERMISSION: DashboardPermissionSettings = {
  enablePermissions: true,
  defaultAccess: 'READ',
  allowedRoles: ['admin', 'manager', 'analyst'],
  allowedUsers: [],
  allowedGroups: [],
  enableSharing: true,
  shareLinkExpiryDays: 7,
};

/**
 * Dashboard export settings
 */
export interface DashboardExportSettings {
  /** Enable export */
  enableExport: boolean;
  /** Export formats */
  exportFormats: ('PDF' | 'PNG' | 'JPEG' | 'CSV' | 'JSON')[];
  /** Export quality */
  exportQuality: number;
  /** Include metadata */
  includeMetadata: boolean;
  /** Include timestamp */
  includeTimestamp: boolean;
  /** Export timeout in seconds */
  exportTimeoutSeconds: number;
}

export const DEFAULT_DASHBOARD_EXPORT_SETTINGS: DashboardExportSettings = {
  enableExport: true,
  exportFormats: ['PDF', 'PNG', 'JSON'],
  exportQuality: 90,
  includeMetadata: true,
  includeTimestamp: true,
  exportTimeoutSeconds: 30,
};

/**
 * Dashboard import settings
 */
export interface DashboardImportSettings {
  /** Enable import */
  enableImport: boolean;
  /** Allowed import formats */
  importFormats: ('JSON' | 'XML' | 'CSV')[];
  /** Max import size in MB */
  maxImportSizeMB: number;
  /** Validate on import */
  validateOnImport: boolean;
  /** Overwrite existing */
  overwriteExisting: boolean;
  /** Import timeout in seconds */
  importTimeoutSeconds: number;
}

export const DEFAULT_DASHBOARD_IMPORT_SETTINGS: DashboardImportSettings = {
  enableImport: true,
  importFormats: ['JSON'],
  maxImportSizeMB: 10,
  validateOnImport: true,
  overwriteExisting: false,
  importTimeoutSeconds: 30,
};

/**
 * Dashboard backup settings
 */
export interface DashboardBackupSettings {
  /** Enable backup */
  enableBackup: boolean;
  /** Backup frequency in hours */
  backupFrequencyHours: number;
  /** Backup retention days */
  retentionDays: number;
  /** Backup location */
  location: string;
  /** Enable incremental backups */
  enableIncremental: boolean;
  /** Max backups to keep */
  maxBackups: number;
}

export const DEFAULT_DASHBOARD_BACKUP_SETTINGS: DashboardBackupSettings = {
  enableBackup: true,
  backupFrequencyHours: 24,
  retentionDays: 30,
  location: '/backup/dashboards',
  enableIncremental: true,
  maxBackups: 30,
};

/**
 * Dashboard restore settings
 */
export interface DashboardRestoreSettings {
  /** Enable restore */
  enableRestore: boolean;
  /** Restore timeout in seconds */
  restoreTimeoutSeconds: number;
  /** Validate before restore */
  validateBeforeRestore: boolean;
  /** Backup before restore */
  backupBeforeRestore: boolean;
  /** Restore history retention days */
  historyRetentionDays: number;
}

export const DEFAULT_DASHBOARD_RESTORE_SETTINGS: DashboardRestoreSettings = {
  enableRestore: true,
  restoreTimeoutSeconds: 60,
  validateBeforeRestore: true,
  backupBeforeRestore: true,
  historyRetentionDays: 90,
};

/**
 * Dashboard versioning settings
 */
export interface DashboardVersioningSettings {
  /** Enable versioning */
  enableVersioning: boolean;
  /** Max versions to keep */
  maxVersions: number;
  /** Version retention days */
  retentionDays: number;
  /** Enable auto-versioning */
  enableAutoVersioning: boolean;
  /** Version naming pattern */
  namingPattern: string;
}

export const DEFAULT_DASHBOARD_VERSIONING_SETTINGS: DashboardVersioningSettings = {
  enableVersioning: true,
  maxVersions: 10,
  retentionDays: 90,
  enableAutoVersioning: true,
  namingPattern: 'v{version}_{timestamp}',
};

/**
 * Dashboard holding settings
 */
export interface DashboardHoldingSettings {
  /** Enable holding */
  enableHolding: boolean;
  /** Holding timeout in minutes */
  holdingTimeoutMinutes: number;
  /** Holding reason required */
  reasonRequired: boolean;
  /** Auto-release after timeout */
  autoReleaseOnTimeout: boolean;
  /** Notification on hold */
  notifyOnHold: boolean;
}

export const DEFAULT_DASHBOARD_HOLDING_SETTINGS: DashboardHoldingSettings = {
  enableHolding: true,
  holdingTimeoutMinutes: 60,
  reasonRequired: true,
  autoReleaseOnTimeout: true,
  notifyOnHold: true,
};

/**
 * Dashboard caching settings
 */
export interface DashboardCacheSettings {
  /** Enable caching */
  enableCaching: boolean;
  /** Cache TTL in seconds */
  cacheTTLSeconds: number;
  /** Cache size limit in MB */
  cacheSizeLimitMB: number;
  /** Enable cache compression */
  enableCompression: boolean;
  /** Invalidate on update */
  invalidateOnUpdate: boolean;
}

export const DEFAULT_DASHBOARD_CACHE_SETTINGS: DashboardCacheSettings = {
  enableCaching: true,
  cacheTTLSeconds: 300,
  cacheSizeLimitMB: 1024,
  enableCompression: true,
  invalidateOnUpdate: true,
};

/**
 * Dashboard tracking settings
 */
export interface DashboardTrackingSettings {
  /** Enable tracking */
  enableTracking: boolean;
  /** Track views */
  trackViews: boolean;
  /** Track interactions */
  trackInteractions: boolean;
  /** Track errors */
  trackErrors: boolean;
  /** Track performance */
  trackPerformance: boolean;
  /** Tracking retention days */
  retentionDays: number;
}

export const DEFAULT_DASHBOARD_TRACKING_SETTINGS: DashboardTrackingSettings = {
  enableTracking: true,
  trackViews: true,
  trackInteractions: true,
  trackErrors: true,
  trackPerformance: true,
  retentionDays: 30,
};

/**
 * Dashboard analytics settings
 */
export interface DashboardAnalyticsSettings {
  /** Enable analytics */
  enableAnalytics: boolean;
  /** Track user engagement */
  trackUserEngagement: boolean;
  /** Track widget usage */
  trackWidgetUsage: boolean;
  /** Track load time */
  trackLoadTime: boolean;
  /** Track export usage */
  trackExportUsage: boolean;
  /** Analytics retention days */
  retentionDays: number;
}

export const DEFAULT_DASHBOARD_ANALYTICS_SETTINGS: DashboardAnalyticsSettings = {
  enableAnalytics: true,
  trackUserEngagement: true,
  trackWidgetUsage: true,
  trackLoadTime: true,
  trackExportUsage: true,
  retentionDays: 30,
};

/**
 * Dashboard widget gallery settings
 */
export interface DashboardWidgetGallery {
  /** Enable gallery */
  enableGallery: boolean;
  /** Gallery widgets */
  widgets: string[];
  /** Categories */
  categories: string[];
  /** Max widgets per category */
  maxWidgetsPerCategory: number;
  /** Featured widgets */
  featuredWidgets: string[];
}

export const DEFAULT_DASHBOARD_WIDGET_GALLERY: DashboardWidgetGallery = {
  enableGallery: true,
  widgets: ['chart', 'table', 'metric', 'kpi', 'summary', 'text', 'image'],
  categories: ['Charts', 'Metrics', 'Tables', 'Visualizations'],
  maxWidgetsPerCategory: 10,
  featuredWidgets: ['chart', 'metric', 'kpi'],
};

/**
 * Dashboard constants
 */
export const DASHBOARD_CONSTANTS = {
  /** Default layout type */
  DEFAULT_LAYOUT: DashboardLayoutType.RESPONSIVE,
  /** Default theme */
  DEFAULT_THEME: DashboardTheme.LIGHT,
  /** Default refresh interval in seconds */
  DEFAULT_REFRESH_INTERVAL: 60,
  /** Max widgets per dashboard */
  MAX_WIDGETS: 20,
  /** Default background color */
  DEFAULT_BACKGROUND_COLOR: '#FFFFFF',
  /** Default text color */
  DEFAULT_TEXT_COLOR: '#111827',
  /** Default primary color */
  DEFAULT_PRIMARY_COLOR: '#3B82F6',
  /** Default secondary color */
  DEFAULT_SECONDARY_COLOR: '#6B7280',
  /** Dashboard version */
  VERSION: '1.0.0',
} as const;

/**
 * Get dashboard layout label
 */
export function getDashboardLayoutLabel(layout: DashboardLayoutType): string {
  const labels: Record<DashboardLayoutType, string> = {
    [DashboardLayoutType.FIXED]: 'Fixed',
    [DashboardLayoutType.FLUID]: 'Fluid',
    [DashboardLayoutType.RESPONSIVE]: 'Responsive',
    [DashboardLayoutType.CUSTOM]: 'Custom',
    [DashboardLayoutType.GRID]: 'Grid',
    [DashboardLayoutType.MASONRY]: 'Masonry',
    [DashboardLayoutType.FREEFORM]: 'Freeform',
  };
  return labels[layout] || layout;
}

/**
 * Get dashboard theme label
 */
export function getDashboardThemeLabel(theme: DashboardTheme): string {
  const labels: Record<DashboardTheme, string> = {
    [DashboardTheme.LIGHT]: 'Light',
    [DashboardTheme.DARK]: 'Dark',
    [DashboardTheme.CUSTOM]: 'Custom',
    [DashboardTheme.PROFESSIONAL]: 'Professional',
    [DashboardTheme.MODERN]: 'Modern',
    [DashboardTheme.CLASSIC]: 'Classic',
    [DashboardTheme.HIGH_CONTRAST]: 'High Contrast',
  };
  return labels[theme] || theme;
}

/**
 * Get refresh interval label
 */
export function getRefreshIntervalLabel(interval: DashboardRefreshInterval): string {
  const labels: Record<DashboardRefreshInterval, string> = {
    [DashboardRefreshInterval.OFF]: 'Off',
    [DashboardRefreshInterval.FIVE_SECONDS]: '5 Seconds',
    [DashboardRefreshInterval.TEN_SECONDS]: '10 Seconds',
    [DashboardRefreshInterval.THIRTY_SECONDS]: '30 Seconds',
    [DashboardRefreshInterval.ONE_MINUTE]: '1 Minute',
    [DashboardRefreshInterval.FIVE_MINUTES]: '5 Minutes',
    [DashboardRefreshInterval.FIFTEEN_MINUTES]: '15 Minutes',
    [DashboardRefreshInterval.THIRTY_MINUTES]: '30 Minutes',
    [DashboardRefreshInterval.ONE_HOUR]: '1 Hour',
    [DashboardRefreshInterval.SIX_HOURS]: '6 Hours',
    [DashboardRefreshInterval.TWELVE_HOURS]: '12 Hours',
    [DashboardRefreshInterval.TWENTY_FOUR_HOURS]: '24 Hours',
  };
  return labels[interval] || interval;
}

/**
 * Get refresh interval value in seconds
 */
export function getRefreshIntervalValue(interval: DashboardRefreshInterval): number {
  return DASHBOARD_REFRESH_INTERVAL_VALUES[interval] || 0;
}

/**
 * Get recommended refresh interval based on data volatility
 */
export function getRecommendedRefreshInterval(
  dataVolatility: 'high' | 'medium' | 'low'
): DashboardRefreshInterval {
  switch (dataVolatility) {
    case 'high':
      return DashboardRefreshInterval.THIRTY_SECONDS;
    case 'medium':
      return DashboardRefreshInterval.ONE_MINUTE;
    case 'low':
      return DashboardRefreshInterval.FIVE_MINUTES;
    default:
      return DashboardRefreshInterval.ONE_MINUTE;
  }
}

/**
 * Check if refresh interval is valid
 */
export function isValidRefreshInterval(interval: DashboardRefreshInterval): boolean {
  return Object.values(DashboardRefreshInterval).includes(interval);
}
