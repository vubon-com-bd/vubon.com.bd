/**
 * @fileoverview Report widget constants and configurations
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Widget sizes
 */
export enum WidgetSize {
  /** Extra small widget */
  EXTRA_SMALL = 'EXTRA_SMALL',
  /** Small widget */
  SMALL = 'SMALL',
  /** Medium widget */
  MEDIUM = 'MEDIUM',
  /** Large widget */
  LARGE = 'LARGE',
  /** Extra large widget */
  EXTRA_LARGE = 'EXTRA_LARGE',
  /** Full width widget */
  FULL_WIDTH = 'FULL_WIDTH',
  /** Custom size widget */
  CUSTOM = 'CUSTOM',
}

/**
 * Widget themes
 */
export enum WidgetTheme {
  /** Light theme */
  LIGHT = 'LIGHT',
  /** Dark theme */
  DARK = 'DARK',
  /** Default theme */
  DEFAULT = 'DEFAULT',
  /** Custom theme */
  CUSTOM = 'CUSTOM',
  /** Transparent theme */
  TRANSPARENT = 'TRANSPARENT',
  /** Minimal theme */
  MINIMAL = 'MINIMAL',
}

/**
 * Widget interaction settings
 */
export interface WidgetInteractionSettings {
  /** Is clickable */
  clickable: boolean;
  /** Is draggable */
  draggable: boolean;
  /** Is resizable */
  resizable: boolean;
  /** Is closeable */
  closeable: boolean;
  /** Is minimizable */
  minimizable: boolean;
  /** Is maximizable */
  maximizable: boolean;
  /** Is expandable */
  expandable: boolean;
  /** Is collapsible */
  collapsible: boolean;
  /** Is selectable */
  selectable: boolean;
}

export const DEFAULT_WIDGET_INTERACTION: WidgetInteractionSettings = {
  clickable: true,
  draggable: true,
  resizable: true,
  closeable: true,
  minimizable: true,
  maximizable: true,
  expandable: true,
  collapsible: true,
  selectable: false,
};

/**
 * Widget pagination settings
 */
export interface WidgetPaginationSettings {
  /** Enable pagination */
  enabled: boolean;
  /** Page size */
  pageSize: number;
  /** Page size options */
  pageSizeOptions: number[];
  /** Show page info */
  showPageInfo: boolean;
  /** Show page controls */
  showPageControls: boolean;
  /** Show total count */
  showTotalCount: boolean;
}

export const DEFAULT_WIDGET_PAGINATION: WidgetPaginationSettings = {
  enabled: true,
  pageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
  showPageInfo: true,
  showPageControls: true,
  showTotalCount: true,
};

/**
 * Widget export settings
 */
export interface WidgetExportSettings {
  /** Enable export */
  enabled: boolean;
  /** Export formats */
  formats: ('PNG' | 'PDF' | 'CSV' | 'JSON' | 'SVG')[];
  /** Include metadata */
  includeMetadata: boolean;
  /** Include timestamp */
  includeTimestamp: boolean;
  /** Export quality (1-100) */
  quality: number;
}

export const DEFAULT_WIDGET_EXPORT: WidgetExportSettings = {
  enabled: true,
  formats: ['PNG', 'PDF', 'CSV'],
  includeMetadata: true,
  includeTimestamp: true,
  quality: 90,
};

/**
 * Widget print settings
 */
export interface WidgetPrintSettings {
  /** Enable print */
  enabled: boolean;
  /** Fit to page */
  fitToPage: boolean;
  /** Margin in pixels */
  margin: number;
  /** Include title */
  includeTitle: boolean;
  /** Include timestamp */
  includeTimestamp: boolean;
}

export const DEFAULT_WIDGET_PRINT: WidgetPrintSettings = {
  enabled: true,
  fitToPage: true,
  margin: 10,
  includeTitle: true,
  includeTimestamp: true,
};

/**
 * Widget sharing settings
 */
export interface WidgetSharingSettings {
  /** Enable sharing */
  enabled: boolean;
  /** Enable shareable link */
  shareableLink: boolean;
  /** Enable embedding */
  embeddable: boolean;
  /** Share link expiry in days */
  linkExpiryDays: number;
  /** Allow public sharing */
  allowPublic: boolean;
}

export const DEFAULT_WIDGET_SHARING: WidgetSharingSettings = {
  enabled: true,
  shareableLink: true,
  embeddable: false,
  linkExpiryDays: 7,
  allowPublic: false,
};

/**
 * Widget permission settings
 */
export interface WidgetPermissionSettings {
  /** View roles */
  viewRoles: string[];
  /** Edit roles */
  editRoles: string[];
  /** Delete roles */
  deleteRoles: string[];
  /** Admin roles */
  adminRoles: string[];
  /** Enable role-based access */
  enableRoleBasedAccess: boolean;
}

export const DEFAULT_WIDGET_PERMISSIONS: WidgetPermissionSettings = {
  viewRoles: ['admin', 'manager', 'analyst'],
  editRoles: ['admin', 'manager'],
  deleteRoles: ['admin'],
  adminRoles: ['admin'],
  enableRoleBasedAccess: true,
};

/**
 * Widget cache settings
 */
export interface WidgetCacheSettings {
  /** Enable caching */
  enabled: boolean;
  /** Cache TTL in seconds */
  ttlSeconds: number;
  /** Stale while revalidate */
  staleWhileRevalidate: boolean;
  /** Cache key prefix */
  keyPrefix?: string;
  /** Enable compression */
  enableCompression: boolean;
}

export const DEFAULT_WIDGET_CACHE: WidgetCacheSettings = {
  enabled: true,
  ttlSeconds: 300,
  staleWhileRevalidate: true,
  enableCompression: true,
};

/**
 * Widget security settings
 */
export interface WidgetSecuritySettings {
  /** Sanitize data */
  sanitizeData: boolean;
  /** Enable CSP */
  enableCSP: boolean;
  /** Require authentication */
  requireAuth: boolean;
  /** Enable rate limiting */
  enableRateLimiting: boolean;
  /** Max requests per minute */
  maxRequestsPerMinute: number;
  /** Enable audit logging */
  enableAuditLogging: boolean;
}

export const DEFAULT_WIDGET_SECURITY: WidgetSecuritySettings = {
  sanitizeData: true,
  enableCSP: true,
  requireAuth: true,
  enableRateLimiting: true,
  maxRequestsPerMinute: 60,
  enableAuditLogging: true,
};

/**
 * Widget configuration
 */
export interface WidgetConfig {
  /** Widget ID */
  id: string;
  /** Widget type */
  type: string;
  /** Widget title */
  title: string;
  /** Widget description */
  description?: string;
  /** Widget size */
  size: WidgetSize;
  /** Widget theme */
  theme: WidgetTheme;
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Width */
  width: number;
  /** Height */
  height: number;
  /** Interaction settings */
  interaction: WidgetInteractionSettings;
  /** Refresh rate in seconds */
  refreshRateSeconds: number;
  /** Data binding */
  dataBinding: Record<string, unknown>;
  /** Filters */
  filters: Record<string, unknown>;
  /** Sorting */
  sorting: Record<string, unknown>;
  /** Pagination */
  pagination: WidgetPaginationSettings;
  /** Export settings */
  export: WidgetExportSettings;
  /** Print settings */
  print: WidgetPrintSettings;
  /** Sharing settings */
  sharing: WidgetSharingSettings;
  /** Permission settings */
  permissions: WidgetPermissionSettings;
  /** Cache settings */
  cache: WidgetCacheSettings;
  /** Security settings */
  security: WidgetSecuritySettings;
}

export const DEFAULT_WIDGET_CONFIG: WidgetConfig = {
  id: 'default-widget',
  type: 'chart',
  title: 'Default Widget',
  description: 'Default widget configuration',
  size: WidgetSize.MEDIUM,
  theme: WidgetTheme.DEFAULT,
  x: 0,
  y: 0,
  width: 400,
  height: 300,
  interaction: DEFAULT_WIDGET_INTERACTION,
  refreshRateSeconds: 60,
  dataBinding: {},
  filters: {},
  sorting: {},
  pagination: DEFAULT_WIDGET_PAGINATION,
  export: DEFAULT_WIDGET_EXPORT,
  print: DEFAULT_WIDGET_PRINT,
  sharing: DEFAULT_WIDGET_SHARING,
  permissions: DEFAULT_WIDGET_PERMISSIONS,
  cache: DEFAULT_WIDGET_CACHE,
  security: DEFAULT_WIDGET_SECURITY,
};

/**
 * Widget size values in pixels
 */
export const WIDGET_SIZE_VALUES: Record<WidgetSize, { width: number; height: number }> = {
  [WidgetSize.EXTRA_SMALL]: { width: 150, height: 100 },
  [WidgetSize.SMALL]: { width: 300, height: 200 },
  [WidgetSize.MEDIUM]: { width: 400, height: 300 },
  [WidgetSize.LARGE]: { width: 600, height: 400 },
  [WidgetSize.EXTRA_LARGE]: { width: 800, height: 500 },
  [WidgetSize.FULL_WIDTH]: { width: 1200, height: 400 },
  [WidgetSize.CUSTOM]: { width: 0, height: 0 },
};

/**
 * Widget constants
 */
export const WIDGET_CONSTANTS = {
  /** Default widget size */
  DEFAULT_SIZE: WidgetSize.MEDIUM,
  /** Default widget theme */
  DEFAULT_THEME: WidgetTheme.DEFAULT,
  /** Default refresh rate in seconds */
  DEFAULT_REFRESH_RATE: 60,
  /** Max widgets per dashboard */
  MAX_WIDGETS_PER_DASHBOARD: 20,
  /** Max refresh rate in seconds */
  MAX_REFRESH_RATE: 3600,
  /** Min refresh rate in seconds */
  MIN_REFRESH_RATE: 5,
} as const;

/**
 * Get widget size label
 */
export function getWidgetSizeLabel(size: WidgetSize): string {
  const labels: Record<WidgetSize, string> = {
    [WidgetSize.EXTRA_SMALL]: 'Extra Small',
    [WidgetSize.SMALL]: 'Small',
    [WidgetSize.MEDIUM]: 'Medium',
    [WidgetSize.LARGE]: 'Large',
    [WidgetSize.EXTRA_LARGE]: 'Extra Large',
    [WidgetSize.FULL_WIDTH]: 'Full Width',
    [WidgetSize.CUSTOM]: 'Custom',
  };
  return labels[size] || size;
}

/**
 * Get widget theme label
 */
export function getWidgetThemeLabel(theme: WidgetTheme): string {
  const labels: Record<WidgetTheme, string> = {
    [WidgetTheme.LIGHT]: 'Light',
    [WidgetTheme.DARK]: 'Dark',
    [WidgetTheme.DEFAULT]: 'Default',
    [WidgetTheme.CUSTOM]: 'Custom',
    [WidgetTheme.TRANSPARENT]: 'Transparent',
    [WidgetTheme.MINIMAL]: 'Minimal',
  };
  return labels[theme] || theme;
}

/**
 * Get widget size dimensions
 */
export function getWidgetSizeDimensions(size: WidgetSize): { width: number; height: number } {
  return WIDGET_SIZE_VALUES[size] || WIDGET_SIZE_VALUES[WidgetSize.MEDIUM];
}

/**
 * Get recommended widget size for content type
 */
export function getRecommendedWidgetSize(contentType: string): WidgetSize {
  const recommendations: Record<string, WidgetSize> = {
    chart: WidgetSize.LARGE,
    table: WidgetSize.LARGE,
    metric: WidgetSize.SMALL,
    kpi: WidgetSize.SMALL,
    text: WidgetSize.MEDIUM,
    image: WidgetSize.MEDIUM,
    summary: WidgetSize.MEDIUM,
    list: WidgetSize.MEDIUM,
    grid: WidgetSize.LARGE,
    map: WidgetSize.EXTRA_LARGE,
    gauge: WidgetSize.MEDIUM,
  };
  return recommendations[contentType] || WidgetSize.MEDIUM;
}

/**
 * Check if widget size is valid
 */
export function isValidWidgetSize(size: WidgetSize): boolean {
  return Object.values(WidgetSize).includes(size);
}

/**
 * Check if widget interaction is valid
 */
export function isValidWidgetInteraction(interaction: WidgetInteractionSettings): boolean {
  return (
    typeof interaction.clickable === 'boolean' &&
    typeof interaction.draggable === 'boolean' &&
    typeof interaction.resizable === 'boolean' &&
    typeof interaction.closeable === 'boolean' &&
    typeof interaction.minimizable === 'boolean' &&
    typeof interaction.maximizable === 'boolean' &&
    typeof interaction.expandable === 'boolean' &&
    typeof interaction.collapsible === 'boolean' &&
    typeof interaction.selectable === 'boolean'
  );
}

/**
 * Get default interaction settings
 */
export function getDefaultInteractionSettings(): WidgetInteractionSettings {
  return { ...DEFAULT_WIDGET_INTERACTION };
}

/**
 * Validate widget configuration
 */
export function validateWidgetConfig(config: WidgetConfig): boolean {
  if (!config.id || !config.type || !config.title) {
    return false;
  }

  if (!isValidWidgetSize(config.size)) {
    return false;
  }

  if (config.refreshRateSeconds < WIDGET_CONSTANTS.MIN_REFRESH_RATE) {
    return false;
  }

  if (config.refreshRateSeconds > WIDGET_CONSTANTS.MAX_REFRESH_RATE) {
    return false;
  }

  return true;
}
