/**
 * Admin Settings Constants
 * Admin settings and configuration definitions
 */

export const ADMIN_SETTINGS = {
  // Settings categories
  CATEGORIES: {
    GENERAL: 'general',
    SECURITY: 'security',
    NOTIFICATION: 'notification',
    PREFERENCE: 'preference',
    APPEARANCE: 'appearance',
    LANGUAGE: 'language',
    TIMEZONE: 'timezone',
    INTEGRATION: 'integration',
    ADVANCED: 'advanced',
    PRIVACY: 'privacy',
    ACCESSIBILITY: 'accessibility',
    PERFORMANCE: 'performance',
    MAINTENANCE: 'maintenance',
    BACKUP: 'backup',
    LOGGING: 'logging',
    MONITORING: 'monitoring',
    ALERTING: 'alerting',
    REPORTING: 'reporting',
    ANALYTICS: 'analytics',
    API: 'api',
    WEBHOOK: 'webhook',
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    SOCIAL: 'social',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    TAX: 'tax',
    INVENTORY: 'inventory',
    ORDER: 'order',
    USER: 'user',
    ROLE: 'role',
    PERMISSION: 'permission',
  },

  // Settings types
  TYPES: {
    BOOLEAN: 'boolean',
    STRING: 'string',
    NUMBER: 'number',
    ARRAY: 'array',
    OBJECT: 'object',
    JSON: 'json',
    ENUM: 'enum',
    DATE: 'date',
    TIME: 'time',
    DATETIME: 'datetime',
    EMAIL: 'email',
    URL: 'url',
    PHONE: 'phone',
    COLOR: 'color',
    PASSWORD: 'password',
    FILE: 'file',
    IMAGE: 'image',
    HTML: 'html',
    MARKDOWN: 'markdown',
    TEXT: 'text',
    TEXTAREA: 'textarea',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    RADIO: 'radio',
    CHECKBOX: 'checkbox',
    TOGGLE: 'toggle',
    SLIDER: 'slider',
    RANGE: 'range',
  },

  // Settings statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
    LOCKED: 'locked',
    UNLOCKED: 'unlocked',
    CONFIGURED: 'configured',
    UNCONFIGURED: 'unconfigured',
    VALID: 'valid',
    INVALID: 'invalid',
    SYNCED: 'synced',
    UNSYNCED: 'unsynced',
  },

  // Settings scopes
  SCOPES: {
    SYSTEM: 'system',
    ADMIN: 'admin',
    USER: 'user',
    ROLE: 'role',
    DEPARTMENT: 'department',
    TEAM: 'team',
    GLOBAL: 'global',
    LOCAL: 'local',
    INSTANCE: 'instance',
    ORGANIZATION: 'organization',
  },

  // Settings visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    PROTECTED: 'protected',
    INTERNAL: 'internal',
    HIDDEN: 'hidden',
  },

  // Settings sensitivity
  SENSITIVITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
    SECRET: 'secret',
  },

  // Settings validation
  VALIDATION: {
    REQUIRED: 'required',
    OPTIONAL: 'optional',
    CONDITIONAL: 'conditional',
    DEPENDENT: 'dependent',
    MUTUALLY_EXCLUSIVE: 'mutually_exclusive',
    MUTUALLY_INCLUSIVE: 'mutually_inclusive',
  },

  // Settings modification
  MODIFICATION: {
    ALLOWED: 'allowed',
    RESTRICTED: 'restricted',
    READ_ONLY: 'read_only',
    WRITE_ONCE: 'write_once',
    IMMUTABLE: 'immutable',
    DEPRECATED: 'deprecated',
  },

  // Settings sources
  SOURCES: {
    DEFAULT: 'default',
    USER: 'user',
    SYSTEM: 'system',
    ENVIRONMENT: 'environment',
    CONFIG_FILE: 'config_file',
    DATABASE: 'database',
    API: 'api',
    CLI: 'cli',
    UI: 'ui',
    IMPORT: 'import',
    MIGRATION: 'migration',
  },

  // Settings priorities
  PRIORITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
    URGENT: 'urgent',
  },

  // Settings groups
  GROUPS: {
    SYSTEM: 'system',
    SECURITY: 'security',
    BUSINESS: 'business',
    TECHNICAL: 'technical',
    USER_INTERFACE: 'user_interface',
    COMMUNICATION: 'communication',
    INTEGRATION: 'integration',
    DATA: 'data',
    OPERATIONS: 'operations',
  },
} as const;

export type AdminSettingsCategory =
  (typeof ADMIN_SETTINGS.CATEGORIES)[keyof typeof ADMIN_SETTINGS.CATEGORIES];
export type AdminSettingsType = (typeof ADMIN_SETTINGS.TYPES)[keyof typeof ADMIN_SETTINGS.TYPES];
export type AdminSettingsStatus =
  (typeof ADMIN_SETTINGS.STATUSES)[keyof typeof ADMIN_SETTINGS.STATUSES];
export type AdminSettingsScope = (typeof ADMIN_SETTINGS.SCOPES)[keyof typeof ADMIN_SETTINGS.SCOPES];
export type AdminSettingsVisibility =
  (typeof ADMIN_SETTINGS.VISIBILITY)[keyof typeof ADMIN_SETTINGS.VISIBILITY];
export type AdminSettingsSensitivity =
  (typeof ADMIN_SETTINGS.SENSITIVITY)[keyof typeof ADMIN_SETTINGS.SENSITIVITY];
export type AdminSettingsValidation =
  (typeof ADMIN_SETTINGS.VALIDATION)[keyof typeof ADMIN_SETTINGS.VALIDATION];
export type AdminSettingsModification =
  (typeof ADMIN_SETTINGS.MODIFICATION)[keyof typeof ADMIN_SETTINGS.MODIFICATION];
export type AdminSettingsSource =
  (typeof ADMIN_SETTINGS.SOURCES)[keyof typeof ADMIN_SETTINGS.SOURCES];
export type AdminSettingsPriority =
  (typeof ADMIN_SETTINGS.PRIORITIES)[keyof typeof ADMIN_SETTINGS.PRIORITIES];
export type AdminSettingsGroup = (typeof ADMIN_SETTINGS.GROUPS)[keyof typeof ADMIN_SETTINGS.GROUPS];

export const ADMIN_SETTINGS_CATEGORY_LABELS: Record<AdminSettingsCategory, string> = {
  [ADMIN_SETTINGS.CATEGORIES.GENERAL]: 'General',
  [ADMIN_SETTINGS.CATEGORIES.SECURITY]: 'Security',
  [ADMIN_SETTINGS.CATEGORIES.NOTIFICATION]: 'Notification',
  [ADMIN_SETTINGS.CATEGORIES.PREFERENCE]: 'Preference',
  [ADMIN_SETTINGS.CATEGORIES.APPEARANCE]: 'Appearance',
  [ADMIN_SETTINGS.CATEGORIES.LANGUAGE]: 'Language',
  [ADMIN_SETTINGS.CATEGORIES.TIMEZONE]: 'Timezone',
  [ADMIN_SETTINGS.CATEGORIES.INTEGRATION]: 'Integration',
  [ADMIN_SETTINGS.CATEGORIES.ADVANCED]: 'Advanced',
  [ADMIN_SETTINGS.CATEGORIES.PRIVACY]: 'Privacy',
  [ADMIN_SETTINGS.CATEGORIES.ACCESSIBILITY]: 'Accessibility',
  [ADMIN_SETTINGS.CATEGORIES.PERFORMANCE]: 'Performance',
  [ADMIN_SETTINGS.CATEGORIES.MAINTENANCE]: 'Maintenance',
  [ADMIN_SETTINGS.CATEGORIES.BACKUP]: 'Backup',
  [ADMIN_SETTINGS.CATEGORIES.LOGGING]: 'Logging',
  [ADMIN_SETTINGS.CATEGORIES.MONITORING]: 'Monitoring',
  [ADMIN_SETTINGS.CATEGORIES.ALERTING]: 'Alerting',
  [ADMIN_SETTINGS.CATEGORIES.REPORTING]: 'Reporting',
  [ADMIN_SETTINGS.CATEGORIES.ANALYTICS]: 'Analytics',
  [ADMIN_SETTINGS.CATEGORIES.API]: 'API',
  [ADMIN_SETTINGS.CATEGORIES.WEBHOOK]: 'Webhook',
  [ADMIN_SETTINGS.CATEGORIES.EMAIL]: 'Email',
  [ADMIN_SETTINGS.CATEGORIES.SMS]: 'SMS',
  [ADMIN_SETTINGS.CATEGORIES.PUSH]: 'Push',
  [ADMIN_SETTINGS.CATEGORIES.SOCIAL]: 'Social',
  [ADMIN_SETTINGS.CATEGORIES.PAYMENT]: 'Payment',
  [ADMIN_SETTINGS.CATEGORIES.SHIPPING]: 'Shipping',
  [ADMIN_SETTINGS.CATEGORIES.TAX]: 'Tax',
  [ADMIN_SETTINGS.CATEGORIES.INVENTORY]: 'Inventory',
  [ADMIN_SETTINGS.CATEGORIES.ORDER]: 'Order',
  [ADMIN_SETTINGS.CATEGORIES.USER]: 'User',
  [ADMIN_SETTINGS.CATEGORIES.ROLE]: 'Role',
  [ADMIN_SETTINGS.CATEGORIES.PERMISSION]: 'Permission',
};

export const ADMIN_SETTINGS_CATEGORY_ICONS: Record<AdminSettingsCategory, string> = {
  [ADMIN_SETTINGS.CATEGORIES.GENERAL]: '⚙️',
  [ADMIN_SETTINGS.CATEGORIES.SECURITY]: '🔐',
  [ADMIN_SETTINGS.CATEGORIES.NOTIFICATION]: '🔔',
  [ADMIN_SETTINGS.CATEGORIES.PREFERENCE]: '🎯',
  [ADMIN_SETTINGS.CATEGORIES.APPEARANCE]: '🎨',
  [ADMIN_SETTINGS.CATEGORIES.LANGUAGE]: '🌐',
  [ADMIN_SETTINGS.CATEGORIES.TIMEZONE]: '🕐',
  [ADMIN_SETTINGS.CATEGORIES.INTEGRATION]: '🔌',
  [ADMIN_SETTINGS.CATEGORIES.ADVANCED]: '🚀',
  [ADMIN_SETTINGS.CATEGORIES.PRIVACY]: '🛡️',
  [ADMIN_SETTINGS.CATEGORIES.ACCESSIBILITY]: '♿',
  [ADMIN_SETTINGS.CATEGORIES.PERFORMANCE]: '⚡',
  [ADMIN_SETTINGS.CATEGORIES.MAINTENANCE]: '🔧',
  [ADMIN_SETTINGS.CATEGORIES.BACKUP]: '💾',
  [ADMIN_SETTINGS.CATEGORIES.LOGGING]: '📝',
  [ADMIN_SETTINGS.CATEGORIES.MONITORING]: '📊',
  [ADMIN_SETTINGS.CATEGORIES.ALERTING]: '🚨',
  [ADMIN_SETTINGS.CATEGORIES.REPORTING]: '📈',
  [ADMIN_SETTINGS.CATEGORIES.ANALYTICS]: '📉',
  [ADMIN_SETTINGS.CATEGORIES.API]: '🔌',
  [ADMIN_SETTINGS.CATEGORIES.WEBHOOK]: '🔗',
  [ADMIN_SETTINGS.CATEGORIES.EMAIL]: '✉️',
  [ADMIN_SETTINGS.CATEGORIES.SMS]: '💬',
  [ADMIN_SETTINGS.CATEGORIES.PUSH]: '📱',
  [ADMIN_SETTINGS.CATEGORIES.SOCIAL]: '👥',
  [ADMIN_SETTINGS.CATEGORIES.PAYMENT]: '💳',
  [ADMIN_SETTINGS.CATEGORIES.SHIPPING]: '🚚',
  [ADMIN_SETTINGS.CATEGORIES.TAX]: '💰',
  [ADMIN_SETTINGS.CATEGORIES.INVENTORY]: '📦',
  [ADMIN_SETTINGS.CATEGORIES.ORDER]: '📋',
  [ADMIN_SETTINGS.CATEGORIES.USER]: '👤',
  [ADMIN_SETTINGS.CATEGORIES.ROLE]: '🎭',
  [ADMIN_SETTINGS.CATEGORIES.PERMISSION]: '🔑',
};

export const ADMIN_SETTINGS_TYPE_LABELS: Record<AdminSettingsType, string> = {
  [ADMIN_SETTINGS.TYPES.BOOLEAN]: 'Boolean',
  [ADMIN_SETTINGS.TYPES.STRING]: 'String',
  [ADMIN_SETTINGS.TYPES.NUMBER]: 'Number',
  [ADMIN_SETTINGS.TYPES.ARRAY]: 'Array',
  [ADMIN_SETTINGS.TYPES.OBJECT]: 'Object',
  [ADMIN_SETTINGS.TYPES.JSON]: 'JSON',
  [ADMIN_SETTINGS.TYPES.ENUM]: 'Enum',
  [ADMIN_SETTINGS.TYPES.DATE]: 'Date',
  [ADMIN_SETTINGS.TYPES.TIME]: 'Time',
  [ADMIN_SETTINGS.TYPES.DATETIME]: 'DateTime',
  [ADMIN_SETTINGS.TYPES.EMAIL]: 'Email',
  [ADMIN_SETTINGS.TYPES.URL]: 'URL',
  [ADMIN_SETTINGS.TYPES.PHONE]: 'Phone',
  [ADMIN_SETTINGS.TYPES.COLOR]: 'Color',
  [ADMIN_SETTINGS.TYPES.PASSWORD]: 'Password',
  [ADMIN_SETTINGS.TYPES.FILE]: 'File',
  [ADMIN_SETTINGS.TYPES.IMAGE]: 'Image',
  [ADMIN_SETTINGS.TYPES.HTML]: 'HTML',
  [ADMIN_SETTINGS.TYPES.MARKDOWN]: 'Markdown',
  [ADMIN_SETTINGS.TYPES.TEXT]: 'Text',
  [ADMIN_SETTINGS.TYPES.TEXTAREA]: 'Textarea',
  [ADMIN_SETTINGS.TYPES.SELECT]: 'Select',
  [ADMIN_SETTINGS.TYPES.MULTI_SELECT]: 'Multi-Select',
  [ADMIN_SETTINGS.TYPES.RADIO]: 'Radio',
  [ADMIN_SETTINGS.TYPES.CHECKBOX]: 'Checkbox',
  [ADMIN_SETTINGS.TYPES.TOGGLE]: 'Toggle',
  [ADMIN_SETTINGS.TYPES.SLIDER]: 'Slider',
  [ADMIN_SETTINGS.TYPES.RANGE]: 'Range',
};

export const ADMIN_SETTINGS_STATUS_LABELS: Record<AdminSettingsStatus, string> = {
  [ADMIN_SETTINGS.STATUSES.ACTIVE]: 'Active',
  [ADMIN_SETTINGS.STATUSES.INACTIVE]: 'Inactive',
  [ADMIN_SETTINGS.STATUSES.PENDING]: 'Pending',
  [ADMIN_SETTINGS.STATUSES.DRAFT]: 'Draft',
  [ADMIN_SETTINGS.STATUSES.PUBLISHED]: 'Published',
  [ADMIN_SETTINGS.STATUSES.ARCHIVED]: 'Archived',
  [ADMIN_SETTINGS.STATUSES.DELETED]: 'Deleted',
  [ADMIN_SETTINGS.STATUSES.LOCKED]: 'Locked',
  [ADMIN_SETTINGS.STATUSES.UNLOCKED]: 'Unlocked',
  [ADMIN_SETTINGS.STATUSES.CONFIGURED]: 'Configured',
  [ADMIN_SETTINGS.STATUSES.UNCONFIGURED]: 'Unconfigured',
  [ADMIN_SETTINGS.STATUSES.VALID]: 'Valid',
  [ADMIN_SETTINGS.STATUSES.INVALID]: 'Invalid',
  [ADMIN_SETTINGS.STATUSES.SYNCED]: 'Synced',
  [ADMIN_SETTINGS.STATUSES.UNSYNCED]: 'Unsynced',
};

export const ADMIN_SETTINGS_STATUS_COLORS: Record<AdminSettingsStatus, string> = {
  [ADMIN_SETTINGS.STATUSES.ACTIVE]: '#10B981',
  [ADMIN_SETTINGS.STATUSES.INACTIVE]: '#6B7280',
  [ADMIN_SETTINGS.STATUSES.PENDING]: '#F59E0B',
  [ADMIN_SETTINGS.STATUSES.DRAFT]: '#9CA3AF',
  [ADMIN_SETTINGS.STATUSES.PUBLISHED]: '#34D399',
  [ADMIN_SETTINGS.STATUSES.ARCHIVED]: '#6B7280',
  [ADMIN_SETTINGS.STATUSES.DELETED]: '#DC2626',
  [ADMIN_SETTINGS.STATUSES.LOCKED]: '#EF4444',
  [ADMIN_SETTINGS.STATUSES.UNLOCKED]: '#10B981',
  [ADMIN_SETTINGS.STATUSES.CONFIGURED]: '#3B82F6',
  [ADMIN_SETTINGS.STATUSES.UNCONFIGURED]: '#9CA3AF',
  [ADMIN_SETTINGS.STATUSES.VALID]: '#10B981',
  [ADMIN_SETTINGS.STATUSES.INVALID]: '#EF4444',
  [ADMIN_SETTINGS.STATUSES.SYNCED]: '#34D399',
  [ADMIN_SETTINGS.STATUSES.UNSYNCED]: '#F59E0B',
};

export const ADMIN_SETTINGS_SCOPE_LABELS: Record<AdminSettingsScope, string> = {
  [ADMIN_SETTINGS.SCOPES.SYSTEM]: 'System',
  [ADMIN_SETTINGS.SCOPES.ADMIN]: 'Admin',
  [ADMIN_SETTINGS.SCOPES.USER]: 'User',
  [ADMIN_SETTINGS.SCOPES.ROLE]: 'Role',
  [ADMIN_SETTINGS.SCOPES.DEPARTMENT]: 'Department',
  [ADMIN_SETTINGS.SCOPES.TEAM]: 'Team',
  [ADMIN_SETTINGS.SCOPES.GLOBAL]: 'Global',
  [ADMIN_SETTINGS.SCOPES.LOCAL]: 'Local',
  [ADMIN_SETTINGS.SCOPES.INSTANCE]: 'Instance',
  [ADMIN_SETTINGS.SCOPES.ORGANIZATION]: 'Organization',
};

export const ADMIN_SETTINGS_VISIBILITY_LABELS: Record<AdminSettingsVisibility, string> = {
  [ADMIN_SETTINGS.VISIBILITY.PUBLIC]: 'Public',
  [ADMIN_SETTINGS.VISIBILITY.PRIVATE]: 'Private',
  [ADMIN_SETTINGS.VISIBILITY.PROTECTED]: 'Protected',
  [ADMIN_SETTINGS.VISIBILITY.INTERNAL]: 'Internal',
  [ADMIN_SETTINGS.VISIBILITY.HIDDEN]: 'Hidden',
};

export const ADMIN_SETTINGS_SENSITIVITY_LABELS: Record<AdminSettingsSensitivity, string> = {
  [ADMIN_SETTINGS.SENSITIVITY.LOW]: 'Low',
  [ADMIN_SETTINGS.SENSITIVITY.MEDIUM]: 'Medium',
  [ADMIN_SETTINGS.SENSITIVITY.HIGH]: 'High',
  [ADMIN_SETTINGS.SENSITIVITY.CRITICAL]: 'Critical',
  [ADMIN_SETTINGS.SENSITIVITY.SECRET]: 'Secret',
};

export const ADMIN_SETTINGS_SENSITIVITY_COLORS: Record<AdminSettingsSensitivity, string> = {
  [ADMIN_SETTINGS.SENSITIVITY.LOW]: '#10B981',
  [ADMIN_SETTINGS.SENSITIVITY.MEDIUM]: '#F59E0B',
  [ADMIN_SETTINGS.SENSITIVITY.HIGH]: '#F97316',
  [ADMIN_SETTINGS.SENSITIVITY.CRITICAL]: '#EF4444',
  [ADMIN_SETTINGS.SENSITIVITY.SECRET]: '#DC2626',
};

export const ADMIN_SETTINGS_PRIORITY_LABELS: Record<AdminSettingsPriority, string> = {
  [ADMIN_SETTINGS.PRIORITIES.LOW]: 'Low',
  [ADMIN_SETTINGS.PRIORITIES.MEDIUM]: 'Medium',
  [ADMIN_SETTINGS.PRIORITIES.HIGH]: 'High',
  [ADMIN_SETTINGS.PRIORITIES.CRITICAL]: 'Critical',
  [ADMIN_SETTINGS.PRIORITIES.URGENT]: 'Urgent',
};

export const ADMIN_SETTINGS_GROUP_LABELS: Record<AdminSettingsGroup, string> = {
  [ADMIN_SETTINGS.GROUPS.SYSTEM]: 'System',
  [ADMIN_SETTINGS.GROUPS.SECURITY]: 'Security',
  [ADMIN_SETTINGS.GROUPS.BUSINESS]: 'Business',
  [ADMIN_SETTINGS.GROUPS.TECHNICAL]: 'Technical',
  [ADMIN_SETTINGS.GROUPS.USER_INTERFACE]: 'User Interface',
  [ADMIN_SETTINGS.GROUPS.COMMUNICATION]: 'Communication',
  [ADMIN_SETTINGS.GROUPS.INTEGRATION]: 'Integration',
  [ADMIN_SETTINGS.GROUPS.DATA]: 'Data',
  [ADMIN_SETTINGS.GROUPS.OPERATIONS]: 'Operations',
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

export function isSettingsActive(status: AdminSettingsStatus): boolean {
  return (
    status === ADMIN_SETTINGS.STATUSES.ACTIVE ||
    status === ADMIN_SETTINGS.STATUSES.PUBLISHED ||
    status === ADMIN_SETTINGS.STATUSES.CONFIGURED ||
    status === ADMIN_SETTINGS.STATUSES.VALID
  );
}

export function isSettingsInactive(status: AdminSettingsStatus): boolean {
  return (
    status === ADMIN_SETTINGS.STATUSES.INACTIVE ||
    status === ADMIN_SETTINGS.STATUSES.ARCHIVED ||
    status === ADMIN_SETTINGS.STATUSES.DELETED ||
    status === ADMIN_SETTINGS.STATUSES.UNCONFIGURED ||
    status === ADMIN_SETTINGS.STATUSES.INVALID
  );
}

export function isSettingsLocked(status: AdminSettingsStatus): boolean {
  return status === ADMIN_SETTINGS.STATUSES.LOCKED;
}

export function isSettingsSynced(status: AdminSettingsStatus): boolean {
  return status === ADMIN_SETTINGS.STATUSES.SYNCED;
}

export function isHighSensitivity(sensitivity: AdminSettingsSensitivity): boolean {
  return (
    sensitivity === ADMIN_SETTINGS.SENSITIVITY.HIGH ||
    sensitivity === ADMIN_SETTINGS.SENSITIVITY.CRITICAL ||
    sensitivity === ADMIN_SETTINGS.SENSITIVITY.SECRET
  );
}

export function isVisibleSettings(visibility: AdminSettingsVisibility): boolean {
  return (
    visibility === ADMIN_SETTINGS.VISIBILITY.PUBLIC ||
    visibility === ADMIN_SETTINGS.VISIBILITY.PROTECTED ||
    visibility === ADMIN_SETTINGS.VISIBILITY.INTERNAL
  );
}

export function getSettingsModification(modification: AdminSettingsModification): string {
  const labels: Record<AdminSettingsModification, string> = {
    [ADMIN_SETTINGS.MODIFICATION.ALLOWED]: 'Allowed',
    [ADMIN_SETTINGS.MODIFICATION.RESTRICTED]: 'Restricted',
    [ADMIN_SETTINGS.MODIFICATION.READ_ONLY]: 'Read Only',
    [ADMIN_SETTINGS.MODIFICATION.WRITE_ONCE]: 'Write Once',
    [ADMIN_SETTINGS.MODIFICATION.IMMUTABLE]: 'Immutable',
    [ADMIN_SETTINGS.MODIFICATION.DEPRECATED]: 'Deprecated',
  };
  return labels[modification] || 'Unknown';
}

export function getSettingsSourceLabel(source: AdminSettingsSource): string {
  const labels: Record<AdminSettingsSource, string> = {
    [ADMIN_SETTINGS.SOURCES.DEFAULT]: 'Default',
    [ADMIN_SETTINGS.SOURCES.USER]: 'User',
    [ADMIN_SETTINGS.SOURCES.SYSTEM]: 'System',
    [ADMIN_SETTINGS.SOURCES.ENVIRONMENT]: 'Environment',
    [ADMIN_SETTINGS.SOURCES.CONFIG_FILE]: 'Config File',
    [ADMIN_SETTINGS.SOURCES.DATABASE]: 'Database',
    [ADMIN_SETTINGS.SOURCES.API]: 'API',
    [ADMIN_SETTINGS.SOURCES.CLI]: 'CLI',
    [ADMIN_SETTINGS.SOURCES.UI]: 'UI',
    [ADMIN_SETTINGS.SOURCES.IMPORT]: 'Import',
    [ADMIN_SETTINGS.SOURCES.MIGRATION]: 'Migration',
  };
  return labels[source] || 'Unknown';
}
