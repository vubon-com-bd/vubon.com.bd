/**
 * User Log Type Constants
 * Defines all possible user log types
 */

export const USER_LOG_TYPE = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  DEBUG: 'debug',
  AUDIT: 'audit',
  SECURITY: 'security',
  PERFORMANCE: 'performance',
  ACCESS: 'access',
  SYSTEM: 'system',
  APPLICATION: 'application',
} as const;

export type UserLogType = (typeof USER_LOG_TYPE)[keyof typeof USER_LOG_TYPE];

export const USER_LOG_TYPE_LABELS: Record<UserLogType, string> = {
  [USER_LOG_TYPE.INFO]: 'Information',
  [USER_LOG_TYPE.WARNING]: 'Warning',
  [USER_LOG_TYPE.ERROR]: 'Error',
  [USER_LOG_TYPE.DEBUG]: 'Debug',
  [USER_LOG_TYPE.AUDIT]: 'Audit',
  [USER_LOG_TYPE.SECURITY]: 'Security',
  [USER_LOG_TYPE.PERFORMANCE]: 'Performance',
  [USER_LOG_TYPE.ACCESS]: 'Access',
  [USER_LOG_TYPE.SYSTEM]: 'System',
  [USER_LOG_TYPE.APPLICATION]: 'Application',
};

export const USER_LOG_TYPE_DESCRIPTIONS: Record<UserLogType, string> = {
  [USER_LOG_TYPE.INFO]: 'General information log entry',
  [USER_LOG_TYPE.WARNING]: 'Warning log entry for potential issues',
  [USER_LOG_TYPE.ERROR]: 'Error log entry for failures',
  [USER_LOG_TYPE.DEBUG]: 'Debug log entry for development',
  [USER_LOG_TYPE.AUDIT]: 'Audit log entry for tracking changes',
  [USER_LOG_TYPE.SECURITY]: 'Security log entry for security events',
  [USER_LOG_TYPE.PERFORMANCE]: 'Performance log entry for metrics',
  [USER_LOG_TYPE.ACCESS]: 'Access log entry for system access',
  [USER_LOG_TYPE.SYSTEM]: 'System log entry for system events',
  [USER_LOG_TYPE.APPLICATION]: 'Application log entry for app events',
};

export const USER_LOG_TYPE_CATEGORIES: Record<string, readonly UserLogType[]> = {
  OPERATIONAL: [USER_LOG_TYPE.INFO, USER_LOG_TYPE.WARNING, USER_LOG_TYPE.ERROR] as const,
  DEVELOPMENT: [USER_LOG_TYPE.DEBUG] as const,
  SECURITY: [USER_LOG_TYPE.SECURITY, USER_LOG_TYPE.ACCESS] as const,
  PERFORMANCE: [USER_LOG_TYPE.PERFORMANCE] as const,
  AUDIT: [USER_LOG_TYPE.AUDIT] as const,
  SYSTEM: [USER_LOG_TYPE.SYSTEM, USER_LOG_TYPE.APPLICATION] as const,
} as const;

export type UserLogCategory = keyof typeof USER_LOG_TYPE_CATEGORIES;

export function getLogTypeLabel(type: UserLogType): string {
  return USER_LOG_TYPE_LABELS[type] || 'Unknown';
}

export function getLogTypeDescription(type: UserLogType): string {
  return USER_LOG_TYPE_DESCRIPTIONS[type] || '';
}

export function getLogCategory(type: UserLogType): UserLogCategory | null {
  for (const [category, types] of Object.entries(USER_LOG_TYPE_CATEGORIES)) {
    if (types.includes(type)) {
      return category as UserLogCategory;
    }
  }
  return null;
}

export function getLogTypesByCategory(category: UserLogCategory): readonly UserLogType[] {
  return USER_LOG_TYPE_CATEGORIES[category] || [];
}

export function isOperationalLog(type: UserLogType): boolean {
  return getLogCategory(type) === 'OPERATIONAL';
}

export function isSecurityLog(type: UserLogType): boolean {
  return getLogCategory(type) === 'SECURITY';
}

export function isPerformanceLog(type: UserLogType): boolean {
  return getLogCategory(type) === 'PERFORMANCE';
}

export function isAuditLog(type: UserLogType): boolean {
  return getLogCategory(type) === 'AUDIT';
}

export function isSystemLog(type: UserLogType): boolean {
  return getLogCategory(type) === 'SYSTEM';
}
