/**
 * Admin Settings Constants
 * Admin settings and configuration definitions
 */

export const ADMIN_SETTINGS = {
  // Settings categories
  CATEGORY: {
    GENERAL: 'general',
    SECURITY: 'security',
    NOTIFICATION: 'notification',
    PRIVACY: 'privacy',
    INTEGRATION: 'integration',
    PERFORMANCE: 'performance',
    CUSTOMIZATION: 'customization',
  },

  // Settings types
  TYPE: {
    BOOLEAN: 'boolean',
    STRING: 'string',
    NUMBER: 'number',
    ARRAY: 'array',
    OBJECT: 'object',
    ENUM: 'enum',
    JSON: 'json',
  },

  // Settings status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    LOCKED: 'locked',
    ARCHIVED: 'archived',
  },

  // Settings scope
  SCOPE: {
    GLOBAL: 'global',
    USER: 'user',
    ROLE: 'role',
    DEPARTMENT: 'department',
    TEAM: 'team',
  },

  // Settings visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    RESTRICTED: 'restricted',
  },

  // Settings sensitivity
  SENSITIVITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Settings priority
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Settings group
  GROUP: {
    SYSTEM: 'system',
    USER_INTERFACE: 'user_interface',
    SECURITY: 'security',
    INTEGRATION: 'integration',
    NOTIFICATION: 'notification',
    REPORTING: 'reporting',
  },

  // Default values
  DEFAULTS: {
    CATEGORY: 'general',
    TYPE: 'string',
    STATUS: 'active',
    SCOPE: 'global',
    VISIBILITY: 'public',
    SENSITIVITY: 'low',
    PRIORITY: 'medium',
    GROUP: 'system',
  },
} as const;

export type AdminSettingsCategory =
  (typeof ADMIN_SETTINGS.CATEGORY)[keyof typeof ADMIN_SETTINGS.CATEGORY];
export type AdminSettingsType = (typeof ADMIN_SETTINGS.TYPE)[keyof typeof ADMIN_SETTINGS.TYPE];
export type AdminSettingsStatus = (typeof ADMIN_SETTINGS.STATUS)[keyof typeof ADMIN_SETTINGS.STATUS];
export type AdminSettingsScope = (typeof ADMIN_SETTINGS.SCOPE)[keyof typeof ADMIN_SETTINGS.SCOPE];
export type AdminSettingsVisibility =
  (typeof ADMIN_SETTINGS.VISIBILITY)[keyof typeof ADMIN_SETTINGS.VISIBILITY];
export type AdminSettingsSensitivity =
  (typeof ADMIN_SETTINGS.SENSITIVITY)[keyof typeof ADMIN_SETTINGS.SENSITIVITY];
export type AdminSettingsPriority =
  (typeof ADMIN_SETTINGS.PRIORITY)[keyof typeof ADMIN_SETTINGS.PRIORITY];
export type AdminSettingsGroup = (typeof ADMIN_SETTINGS.GROUP)[keyof typeof ADMIN_SETTINGS.GROUP];
export type AdminSettingsValidation = 'required' | 'optional' | 'conditional';
export type AdminSettingsModification = 'system' | 'user' | 'admin' | 'api' | 'import';
export type AdminSettingsSource = 'system' | 'user' | 'admin' | 'api' | 'import';

export const ADMIN_SETTINGS_CATEGORY_LABELS: Record<AdminSettingsCategory, string> = {
  [ADMIN_SETTINGS.CATEGORY.GENERAL]: 'General',
  [ADMIN_SETTINGS.CATEGORY.SECURITY]: 'Security',
  [ADMIN_SETTINGS.CATEGORY.NOTIFICATION]: 'Notification',
  [ADMIN_SETTINGS.CATEGORY.PRIVACY]: 'Privacy',
  [ADMIN_SETTINGS.CATEGORY.INTEGRATION]: 'Integration',
  [ADMIN_SETTINGS.CATEGORY.PERFORMANCE]: 'Performance',
  [ADMIN_SETTINGS.CATEGORY.CUSTOMIZATION]: 'Customization',
};

export const ADMIN_SETTINGS_CATEGORY_ICONS: Record<AdminSettingsCategory, string> = {
  [ADMIN_SETTINGS.CATEGORY.GENERAL]: '⚙️',
  [ADMIN_SETTINGS.CATEGORY.SECURITY]: '🔒',
  [ADMIN_SETTINGS.CATEGORY.NOTIFICATION]: '🔔',
  [ADMIN_SETTINGS.CATEGORY.PRIVACY]: '🛡️',
  [ADMIN_SETTINGS.CATEGORY.INTEGRATION]: '🔗',
  [ADMIN_SETTINGS.CATEGORY.PERFORMANCE]: '⚡',
  [ADMIN_SETTINGS.CATEGORY.CUSTOMIZATION]: '🎨',
};

export const ADMIN_SETTINGS_TYPE_LABELS: Record<AdminSettingsType, string> = {
  [ADMIN_SETTINGS.TYPE.BOOLEAN]: 'Boolean',
  [ADMIN_SETTINGS.TYPE.STRING]: 'String',
  [ADMIN_SETTINGS.TYPE.NUMBER]: 'Number',
  [ADMIN_SETTINGS.TYPE.ARRAY]: 'Array',
  [ADMIN_SETTINGS.TYPE.OBJECT]: 'Object',
  [ADMIN_SETTINGS.TYPE.ENUM]: 'Enum',
  [ADMIN_SETTINGS.TYPE.JSON]: 'JSON',
};

export const ADMIN_SETTINGS_STATUS_LABELS: Record<AdminSettingsStatus, string> = {
  [ADMIN_SETTINGS.STATUS.ACTIVE]: 'Active',
  [ADMIN_SETTINGS.STATUS.INACTIVE]: 'Inactive',
  [ADMIN_SETTINGS.STATUS.PENDING]: 'Pending',
  [ADMIN_SETTINGS.STATUS.LOCKED]: 'Locked',
  [ADMIN_SETTINGS.STATUS.ARCHIVED]: 'Archived',
};

export const ADMIN_SETTINGS_STATUS_COLORS: Record<AdminSettingsStatus, string> = {
  [ADMIN_SETTINGS.STATUS.ACTIVE]: '#10B981',
  [ADMIN_SETTINGS.STATUS.INACTIVE]: '#6B7280',
  [ADMIN_SETTINGS.STATUS.PENDING]: '#F59E0B',
  [ADMIN_SETTINGS.STATUS.LOCKED]: '#EF4444',
  [ADMIN_SETTINGS.STATUS.ARCHIVED]: '#9CA3AF',
};

export const ADMIN_SETTINGS_SCOPE_LABELS: Record<AdminSettingsScope, string> = {
  [ADMIN_SETTINGS.SCOPE.GLOBAL]: 'Global',
  [ADMIN_SETTINGS.SCOPE.USER]: 'User',
  [ADMIN_SETTINGS.SCOPE.ROLE]: 'Role',
  [ADMIN_SETTINGS.SCOPE.DEPARTMENT]: 'Department',
  [ADMIN_SETTINGS.SCOPE.TEAM]: 'Team',
};

export const ADMIN_SETTINGS_VISIBILITY_LABELS: Record<AdminSettingsVisibility, string> = {
  [ADMIN_SETTINGS.VISIBILITY.PUBLIC]: 'Public',
  [ADMIN_SETTINGS.VISIBILITY.PRIVATE]: 'Private',
  [ADMIN_SETTINGS.VISIBILITY.RESTRICTED]: 'Restricted',
};

export const ADMIN_SETTINGS_SENSITIVITY_LABELS: Record<AdminSettingsSensitivity, string> = {
  [ADMIN_SETTINGS.SENSITIVITY.LOW]: 'Low',
  [ADMIN_SETTINGS.SENSITIVITY.MEDIUM]: 'Medium',
  [ADMIN_SETTINGS.SENSITIVITY.HIGH]: 'High',
  [ADMIN_SETTINGS.SENSITIVITY.CRITICAL]: 'Critical',
};

export const ADMIN_SETTINGS_SENSITIVITY_COLORS: Record<AdminSettingsSensitivity, string> = {
  [ADMIN_SETTINGS.SENSITIVITY.LOW]: '#10B981',
  [ADMIN_SETTINGS.SENSITIVITY.MEDIUM]: '#F59E0B',
  [ADMIN_SETTINGS.SENSITIVITY.HIGH]: '#F97316',
  [ADMIN_SETTINGS.SENSITIVITY.CRITICAL]: '#EF4444',
};

export const ADMIN_SETTINGS_PRIORITY_LABELS: Record<AdminSettingsPriority, string> = {
  [ADMIN_SETTINGS.PRIORITY.LOW]: 'Low',
  [ADMIN_SETTINGS.PRIORITY.MEDIUM]: 'Medium',
  [ADMIN_SETTINGS.PRIORITY.HIGH]: 'High',
  [ADMIN_SETTINGS.PRIORITY.CRITICAL]: 'Critical',
};

export const ADMIN_SETTINGS_GROUP_LABELS: Record<AdminSettingsGroup, string> = {
  [ADMIN_SETTINGS.GROUP.SYSTEM]: 'System',
  [ADMIN_SETTINGS.GROUP.USER_INTERFACE]: 'User Interface',
  [ADMIN_SETTINGS.GROUP.SECURITY]: 'Security',
  [ADMIN_SETTINGS.GROUP.INTEGRATION]: 'Integration',
  [ADMIN_SETTINGS.GROUP.NOTIFICATION]: 'Notification',
  [ADMIN_SETTINGS.GROUP.REPORTING]: 'Reporting',
};

export function getAdminSettingsCategoryLabel(category: AdminSettingsCategory): string {
  return ADMIN_SETTINGS_CATEGORY_LABELS[category] || 'Unknown Category';
}

export function getAdminSettingsCategoryIcon(category: AdminSettingsCategory): string {
  return ADMIN_SETTINGS_CATEGORY_ICONS[category] || '❓';
}

export function getAdminSettingsTypeLabel(type: AdminSettingsType): string {
  return ADMIN_SETTINGS_TYPE_LABELS[type] || 'Unknown Type';
}

export function getAdminSettingsStatusLabel(status: AdminSettingsStatus): string {
  return ADMIN_SETTINGS_STATUS_LABELS[status] || 'Unknown Status';
}

export function getAdminSettingsStatusColor(status: AdminSettingsStatus): string {
  return ADMIN_SETTINGS_STATUS_COLORS[status] || '#6B7280';
}

export function getAdminSettingsScopeLabel(scope: AdminSettingsScope): string {
  return ADMIN_SETTINGS_SCOPE_LABELS[scope] || 'Unknown Scope';
}

export function getAdminSettingsVisibilityLabel(visibility: AdminSettingsVisibility): string {
  return ADMIN_SETTINGS_VISIBILITY_LABELS[visibility] || 'Unknown Visibility';
}

export function getAdminSettingsSensitivityLabel(sensitivity: AdminSettingsSensitivity): string {
  return ADMIN_SETTINGS_SENSITIVITY_LABELS[sensitivity] || 'Unknown Sensitivity';
}

export function getAdminSettingsSensitivityColor(sensitivity: AdminSettingsSensitivity): string {
  return ADMIN_SETTINGS_SENSITIVITY_COLORS[sensitivity] || '#6B7280';
}

export function getAdminSettingsPriorityLabel(priority: AdminSettingsPriority): string {
  return ADMIN_SETTINGS_PRIORITY_LABELS[priority] || 'Unknown Priority';
}

export function getAdminSettingsGroupLabel(group: AdminSettingsGroup): string {
  return ADMIN_SETTINGS_GROUP_LABELS[group] || 'Unknown Group';
}

// রিনেম করা ফাংশন (Admin প্রিফিক্স যোগ করা হয়েছে)
export function isAdminSettingsActive(status: AdminSettingsStatus): boolean {
  return status === ADMIN_SETTINGS.STATUS.ACTIVE;
}

export function isAdminSettingsInactive(status: AdminSettingsStatus): boolean {
  return status === ADMIN_SETTINGS.STATUS.INACTIVE;
}

export function isAdminSettingsLocked(status: AdminSettingsStatus): boolean {
  return status === ADMIN_SETTINGS.STATUS.LOCKED;
}

export function isAdminSettingsSynced(status: AdminSettingsStatus): boolean {
  return status === ADMIN_SETTINGS.STATUS.ACTIVE || status === ADMIN_SETTINGS.STATUS.INACTIVE;
}

export function isHighSensitivity(sensitivity: AdminSettingsSensitivity): boolean {
  return sensitivity === ADMIN_SETTINGS.SENSITIVITY.HIGH || 
         sensitivity === ADMIN_SETTINGS.SENSITIVITY.CRITICAL;
}

export function isVisibleSettings(visibility: AdminSettingsVisibility): boolean {
  return visibility === ADMIN_SETTINGS.VISIBILITY.PUBLIC;
}

export function getSettingsModification(source: string): string {
  return `Modified from ${source}`;
}

export function getSettingsSourceLabel(source: AdminSettingsSource): string {
  const labels: Record<AdminSettingsSource, string> = {
    'system': 'System',
    'user': 'User',
    'admin': 'Administrator',
    'api': 'API',
    'import': 'Import',
  };
  return labels[source] || 'Unknown Source';
}
