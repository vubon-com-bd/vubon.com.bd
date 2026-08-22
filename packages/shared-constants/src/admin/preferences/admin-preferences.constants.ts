/**
 * Admin Preferences Constants
 * Admin preferences and user settings definitions
 */

export const ADMIN_PREFERENCES = {
  // Preference categories
  CATEGORIES: {
    GENERAL: 'general',
    APPEARANCE: 'appearance',
    NOTIFICATION: 'notification',
    LANGUAGE: 'language',
    ACCESSIBILITY: 'accessibility',
    WORKSPACE: 'workspace',
    DASHBOARD: 'dashboard',
    REPORTING: 'reporting',
    ANALYTICS: 'analytics',
    INTEGRATION: 'integration',
    SECURITY: 'security',
    PRIVACY: 'privacy',
    PERFORMANCE: 'performance',
    SHORTCUTS: 'shortcuts',
    WORKFLOW: 'workflow',
    TEAM: 'team',
    COLLABORATION: 'collaboration',
  },

  // Preference types
  TYPES: {
    BOOLEAN: 'boolean',
    STRING: 'string',
    NUMBER: 'number',
    ARRAY: 'array',
    OBJECT: 'object',
    ENUM: 'enum',
    DATE: 'date',
    TIME: 'time',
    COLOR: 'color',
    FONT: 'font',
    SIZE: 'size',
    POSITION: 'position',
    LAYOUT: 'layout',
    THEME: 'theme',
    LANGUAGE_CODE: 'language_code',
    TIMEZONE: 'timezone',
    CURRENCY: 'currency',
    UNIT: 'unit',
    FORMAT: 'format',
    VIEW: 'view',
    SORT: 'sort',
    FILTER: 'filter',
    GROUP: 'group',
  },

  // Preference statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DRAFT: 'draft',
    CONFIGURED: 'configured',
    UNCONFIGURED: 'unconfigured',
    DEFAULT: 'default',
    CUSTOM: 'custom',
    LOCKED: 'locked',
    UNLOCKED: 'unlocked',
    OVERRIDDEN: 'overridden',
    INHERITED: 'inherited',
  },

  // Preference scopes
  SCOPES: {
    SYSTEM: 'system',
    GLOBAL: 'global',
    USER: 'user',
    ROLE: 'role',
    TEAM: 'team',
    DEPARTMENT: 'department',
    ORGANIZATION: 'organization',
    INSTANCE: 'instance',
  },

  // Preference visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    PROTECTED: 'protected',
    INTERNAL: 'internal',
    HIDDEN: 'hidden',
  },

  // Preference sensitivity
  SENSITIVITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Preference sources
  SOURCES: {
    DEFAULT: 'default',
    USER: 'user',
    SYSTEM: 'system',
    IMPORT: 'import',
    MIGRATION: 'migration',
    SYNC: 'sync',
    BACKUP: 'backup',
    RESTORE: 'restore',
  },

  // Preference groups
  GROUPS: {
    DISPLAY: 'display',
    BEHAVIOR: 'behavior',
    COMMUNICATION: 'communication',
    WORKFLOW: 'workflow',
    DATA: 'data',
    SECURITY: 'security',
    INTEGRATION: 'integration',
    ADVANCED: 'advanced',
  },
} as const;

export type AdminPreferenceCategory =
  (typeof ADMIN_PREFERENCES.CATEGORIES)[keyof typeof ADMIN_PREFERENCES.CATEGORIES];
export type AdminPreferenceType =
  (typeof ADMIN_PREFERENCES.TYPES)[keyof typeof ADMIN_PREFERENCES.TYPES];
export type AdminPreferenceStatus =
  (typeof ADMIN_PREFERENCES.STATUSES)[keyof typeof ADMIN_PREFERENCES.STATUSES];
export type AdminPreferenceScope =
  (typeof ADMIN_PREFERENCES.SCOPES)[keyof typeof ADMIN_PREFERENCES.SCOPES];
export type AdminPreferenceVisibility =
  (typeof ADMIN_PREFERENCES.VISIBILITY)[keyof typeof ADMIN_PREFERENCES.VISIBILITY];
export type AdminPreferenceSensitivity =
  (typeof ADMIN_PREFERENCES.SENSITIVITY)[keyof typeof ADMIN_PREFERENCES.SENSITIVITY];
export type AdminPreferenceSource =
  (typeof ADMIN_PREFERENCES.SOURCES)[keyof typeof ADMIN_PREFERENCES.SOURCES];
export type AdminPreferenceGroup =
  (typeof ADMIN_PREFERENCES.GROUPS)[keyof typeof ADMIN_PREFERENCES.GROUPS];

export const ADMIN_PREFERENCES_CATEGORY_LABELS: Record<AdminPreferenceCategory, string> = {
  [ADMIN_PREFERENCES.CATEGORIES.GENERAL]: 'General',
  [ADMIN_PREFERENCES.CATEGORIES.APPEARANCE]: 'Appearance',
  [ADMIN_PREFERENCES.CATEGORIES.NOTIFICATION]: 'Notification',
  [ADMIN_PREFERENCES.CATEGORIES.LANGUAGE]: 'Language',
  [ADMIN_PREFERENCES.CATEGORIES.ACCESSIBILITY]: 'Accessibility',
  [ADMIN_PREFERENCES.CATEGORIES.WORKSPACE]: 'Workspace',
  [ADMIN_PREFERENCES.CATEGORIES.DASHBOARD]: 'Dashboard',
  [ADMIN_PREFERENCES.CATEGORIES.REPORTING]: 'Reporting',
  [ADMIN_PREFERENCES.CATEGORIES.ANALYTICS]: 'Analytics',
  [ADMIN_PREFERENCES.CATEGORIES.INTEGRATION]: 'Integration',
  [ADMIN_PREFERENCES.CATEGORIES.SECURITY]: 'Security',
  [ADMIN_PREFERENCES.CATEGORIES.PRIVACY]: 'Privacy',
  [ADMIN_PREFERENCES.CATEGORIES.PERFORMANCE]: 'Performance',
  [ADMIN_PREFERENCES.CATEGORIES.SHORTCUTS]: 'Shortcuts',
  [ADMIN_PREFERENCES.CATEGORIES.WORKFLOW]: 'Workflow',
  [ADMIN_PREFERENCES.CATEGORIES.TEAM]: 'Team',
  [ADMIN_PREFERENCES.CATEGORIES.COLLABORATION]: 'Collaboration',
};

export const ADMIN_PREFERENCES_CATEGORY_ICONS: Record<AdminPreferenceCategory, string> = {
  [ADMIN_PREFERENCES.CATEGORIES.GENERAL]: '⚙️',
  [ADMIN_PREFERENCES.CATEGORIES.APPEARANCE]: '🎨',
  [ADMIN_PREFERENCES.CATEGORIES.NOTIFICATION]: '🔔',
  [ADMIN_PREFERENCES.CATEGORIES.LANGUAGE]: '🌐',
  [ADMIN_PREFERENCES.CATEGORIES.ACCESSIBILITY]: '♿',
  [ADMIN_PREFERENCES.CATEGORIES.WORKSPACE]: '💼',
  [ADMIN_PREFERENCES.CATEGORIES.DASHBOARD]: '📊',
  [ADMIN_PREFERENCES.CATEGORIES.REPORTING]: '📈',
  [ADMIN_PREFERENCES.CATEGORIES.ANALYTICS]: '📉',
  [ADMIN_PREFERENCES.CATEGORIES.INTEGRATION]: '🔌',
  [ADMIN_PREFERENCES.CATEGORIES.SECURITY]: '🔐',
  [ADMIN_PREFERENCES.CATEGORIES.PRIVACY]: '🛡️',
  [ADMIN_PREFERENCES.CATEGORIES.PERFORMANCE]: '⚡',
  [ADMIN_PREFERENCES.CATEGORIES.SHORTCUTS]: '⌨️',
  [ADMIN_PREFERENCES.CATEGORIES.WORKFLOW]: '🔄',
  [ADMIN_PREFERENCES.CATEGORIES.TEAM]: '👥',
  [ADMIN_PREFERENCES.CATEGORIES.COLLABORATION]: '🤝',
};

export const ADMIN_PREFERENCES_TYPE_LABELS: Record<AdminPreferenceType, string> = {
  [ADMIN_PREFERENCES.TYPES.BOOLEAN]: 'Boolean',
  [ADMIN_PREFERENCES.TYPES.STRING]: 'String',
  [ADMIN_PREFERENCES.TYPES.NUMBER]: 'Number',
  [ADMIN_PREFERENCES.TYPES.ARRAY]: 'Array',
  [ADMIN_PREFERENCES.TYPES.OBJECT]: 'Object',
  [ADMIN_PREFERENCES.TYPES.ENUM]: 'Enum',
  [ADMIN_PREFERENCES.TYPES.DATE]: 'Date',
  [ADMIN_PREFERENCES.TYPES.TIME]: 'Time',
  [ADMIN_PREFERENCES.TYPES.COLOR]: 'Color',
  [ADMIN_PREFERENCES.TYPES.FONT]: 'Font',
  [ADMIN_PREFERENCES.TYPES.SIZE]: 'Size',
  [ADMIN_PREFERENCES.TYPES.POSITION]: 'Position',
  [ADMIN_PREFERENCES.TYPES.LAYOUT]: 'Layout',
  [ADMIN_PREFERENCES.TYPES.THEME]: 'Theme',
  [ADMIN_PREFERENCES.TYPES.LANGUAGE_CODE]: 'Language Code',
  [ADMIN_PREFERENCES.TYPES.TIMEZONE]: 'Timezone',
  [ADMIN_PREFERENCES.TYPES.CURRENCY]: 'Currency',
  [ADMIN_PREFERENCES.TYPES.UNIT]: 'Unit',
  [ADMIN_PREFERENCES.TYPES.FORMAT]: 'Format',
  [ADMIN_PREFERENCES.TYPES.VIEW]: 'View',
  [ADMIN_PREFERENCES.TYPES.SORT]: 'Sort',
  [ADMIN_PREFERENCES.TYPES.FILTER]: 'Filter',
  [ADMIN_PREFERENCES.TYPES.GROUP]: 'Group',
};

export const ADMIN_PREFERENCES_STATUS_LABELS: Record<AdminPreferenceStatus, string> = {
  [ADMIN_PREFERENCES.STATUSES.ACTIVE]: 'Active',
  [ADMIN_PREFERENCES.STATUSES.INACTIVE]: 'Inactive',
  [ADMIN_PREFERENCES.STATUSES.PENDING]: 'Pending',
  [ADMIN_PREFERENCES.STATUSES.DRAFT]: 'Draft',
  [ADMIN_PREFERENCES.STATUSES.CONFIGURED]: 'Configured',
  [ADMIN_PREFERENCES.STATUSES.UNCONFIGURED]: 'Unconfigured',
  [ADMIN_PREFERENCES.STATUSES.DEFAULT]: 'Default',
  [ADMIN_PREFERENCES.STATUSES.CUSTOM]: 'Custom',
  [ADMIN_PREFERENCES.STATUSES.LOCKED]: 'Locked',
  [ADMIN_PREFERENCES.STATUSES.UNLOCKED]: 'Unlocked',
  [ADMIN_PREFERENCES.STATUSES.OVERRIDDEN]: 'Overridden',
  [ADMIN_PREFERENCES.STATUSES.INHERITED]: 'Inherited',
};

export const ADMIN_PREFERENCES_STATUS_COLORS: Record<AdminPreferenceStatus, string> = {
  [ADMIN_PREFERENCES.STATUSES.ACTIVE]: '#10B981',
  [ADMIN_PREFERENCES.STATUSES.INACTIVE]: '#6B7280',
  [ADMIN_PREFERENCES.STATUSES.PENDING]: '#F59E0B',
  [ADMIN_PREFERENCES.STATUSES.DRAFT]: '#9CA3AF',
  [ADMIN_PREFERENCES.STATUSES.CONFIGURED]: '#3B82F6',
  [ADMIN_PREFERENCES.STATUSES.UNCONFIGURED]: '#9CA3AF',
  [ADMIN_PREFERENCES.STATUSES.DEFAULT]: '#6B7280',
  [ADMIN_PREFERENCES.STATUSES.CUSTOM]: '#8B5CF6',
  [ADMIN_PREFERENCES.STATUSES.LOCKED]: '#EF4444',
  [ADMIN_PREFERENCES.STATUSES.UNLOCKED]: '#10B981',
  [ADMIN_PREFERENCES.STATUSES.OVERRIDDEN]: '#F97316',
  [ADMIN_PREFERENCES.STATUSES.INHERITED]: '#6366F1',
};

export const ADMIN_PREFERENCES_SCOPE_LABELS: Record<AdminPreferenceScope, string> = {
  [ADMIN_PREFERENCES.SCOPES.SYSTEM]: 'System',
  [ADMIN_PREFERENCES.SCOPES.GLOBAL]: 'Global',
  [ADMIN_PREFERENCES.SCOPES.USER]: 'User',
  [ADMIN_PREFERENCES.SCOPES.ROLE]: 'Role',
  [ADMIN_PREFERENCES.SCOPES.TEAM]: 'Team',
  [ADMIN_PREFERENCES.SCOPES.DEPARTMENT]: 'Department',
  [ADMIN_PREFERENCES.SCOPES.ORGANIZATION]: 'Organization',
  [ADMIN_PREFERENCES.SCOPES.INSTANCE]: 'Instance',
};

export const ADMIN_PREFERENCES_VISIBILITY_LABELS: Record<AdminPreferenceVisibility, string> = {
  [ADMIN_PREFERENCES.VISIBILITY.PUBLIC]: 'Public',
  [ADMIN_PREFERENCES.VISIBILITY.PRIVATE]: 'Private',
  [ADMIN_PREFERENCES.VISIBILITY.PROTECTED]: 'Protected',
  [ADMIN_PREFERENCES.VISIBILITY.INTERNAL]: 'Internal',
  [ADMIN_PREFERENCES.VISIBILITY.HIDDEN]: 'Hidden',
};

export const ADMIN_PREFERENCES_SENSITIVITY_LABELS: Record<AdminPreferenceSensitivity, string> = {
  [ADMIN_PREFERENCES.SENSITIVITY.LOW]: 'Low',
  [ADMIN_PREFERENCES.SENSITIVITY.MEDIUM]: 'Medium',
  [ADMIN_PREFERENCES.SENSITIVITY.HIGH]: 'High',
  [ADMIN_PREFERENCES.SENSITIVITY.CRITICAL]: 'Critical',
};

export const ADMIN_PREFERENCES_SENSITIVITY_COLORS: Record<AdminPreferenceSensitivity, string> = {
  [ADMIN_PREFERENCES.SENSITIVITY.LOW]: '#10B981',
  [ADMIN_PREFERENCES.SENSITIVITY.MEDIUM]: '#F59E0B',
  [ADMIN_PREFERENCES.SENSITIVITY.HIGH]: '#F97316',
  [ADMIN_PREFERENCES.SENSITIVITY.CRITICAL]: '#EF4444',
};

export const ADMIN_PREFERENCES_GROUP_LABELS: Record<AdminPreferenceGroup, string> = {
  [ADMIN_PREFERENCES.GROUPS.DISPLAY]: 'Display',
  [ADMIN_PREFERENCES.GROUPS.BEHAVIOR]: 'Behavior',
  [ADMIN_PREFERENCES.GROUPS.COMMUNICATION]: 'Communication',
  [ADMIN_PREFERENCES.GROUPS.WORKFLOW]: 'Workflow',
  [ADMIN_PREFERENCES.GROUPS.DATA]: 'Data',
  [ADMIN_PREFERENCES.GROUPS.SECURITY]: 'Security',
  [ADMIN_PREFERENCES.GROUPS.INTEGRATION]: 'Integration',
  [ADMIN_PREFERENCES.GROUPS.ADVANCED]: 'Advanced',
};

export function getAdminPreferenceCategoryLabel(category: AdminPreferenceCategory): string {
  return ADMIN_PREFERENCES_CATEGORY_LABELS[category] || 'Unknown Category';
}

export function getAdminPreferenceCategoryIcon(category: AdminPreferenceCategory): string {
  return ADMIN_PREFERENCES_CATEGORY_ICONS[category] || '❓';
}

export function getAdminPreferenceTypeLabel(type: AdminPreferenceType): string {
  return ADMIN_PREFERENCES_TYPE_LABELS[type] || 'Unknown Type';
}

export function getAdminPreferenceStatusLabel(status: AdminPreferenceStatus): string {
  return ADMIN_PREFERENCES_STATUS_LABELS[status] || 'Unknown Status';
}

export function getAdminPreferenceStatusColor(status: AdminPreferenceStatus): string {
  return ADMIN_PREFERENCES_STATUS_COLORS[status] || '#6B7280';
}

export function getAdminPreferenceScopeLabel(scope: AdminPreferenceScope): string {
  return ADMIN_PREFERENCES_SCOPE_LABELS[scope] || 'Unknown Scope';
}

export function getAdminPreferenceVisibilityLabel(visibility: AdminPreferenceVisibility): string {
  return ADMIN_PREFERENCES_VISIBILITY_LABELS[visibility] || 'Unknown Visibility';
}

export function getAdminPreferenceSensitivityLabel(
  sensitivity: AdminPreferenceSensitivity
): string {
  return ADMIN_PREFERENCES_SENSITIVITY_LABELS[sensitivity] || 'Unknown Sensitivity';
}

export function getAdminPreferenceSensitivityColor(
  sensitivity: AdminPreferenceSensitivity
): string {
  return ADMIN_PREFERENCES_SENSITIVITY_COLORS[sensitivity] || '#6B7280';
}

export function getAdminPreferenceGroupLabel(group: AdminPreferenceGroup): string {
  return ADMIN_PREFERENCES_GROUP_LABELS[group] || 'Unknown Group';
}

export function isPreferenceActive(status: AdminPreferenceStatus): boolean {
  return (
    status === ADMIN_PREFERENCES.STATUSES.ACTIVE ||
    status === ADMIN_PREFERENCES.STATUSES.CONFIGURED ||
    status === ADMIN_PREFERENCES.STATUSES.UNLOCKED
  );
}

export function isPreferenceInactive(status: AdminPreferenceStatus): boolean {
  return (
    status === ADMIN_PREFERENCES.STATUSES.INACTIVE ||
    status === ADMIN_PREFERENCES.STATUSES.DRAFT ||
    status === ADMIN_PREFERENCES.STATUSES.UNCONFIGURED
  );
}

export function isPreferenceLocked(status: AdminPreferenceStatus): boolean {
  return status === ADMIN_PREFERENCES.STATUSES.LOCKED;
}

export function isPreferenceDefault(status: AdminPreferenceStatus): boolean {
  return (
    status === ADMIN_PREFERENCES.STATUSES.DEFAULT || status === ADMIN_PREFERENCES.STATUSES.INHERITED
  );
}

export function isPreferenceCustom(status: AdminPreferenceStatus): boolean {
  return (
    status === ADMIN_PREFERENCES.STATUSES.CUSTOM || status === ADMIN_PREFERENCES.STATUSES.OVERRIDDEN
  );
}

export function getPreferenceSourceLabel(source: AdminPreferenceSource): string {
  const labels: Record<AdminPreferenceSource, string> = {
    [ADMIN_PREFERENCES.SOURCES.DEFAULT]: 'Default',
    [ADMIN_PREFERENCES.SOURCES.USER]: 'User',
    [ADMIN_PREFERENCES.SOURCES.SYSTEM]: 'System',
    [ADMIN_PREFERENCES.SOURCES.IMPORT]: 'Import',
    [ADMIN_PREFERENCES.SOURCES.MIGRATION]: 'Migration',
    [ADMIN_PREFERENCES.SOURCES.SYNC]: 'Sync',
    [ADMIN_PREFERENCES.SOURCES.BACKUP]: 'Backup',
    [ADMIN_PREFERENCES.SOURCES.RESTORE]: 'Restore',
  };
  return labels[source] || 'Unknown';
}
