/**
 * Log Configuration
 * ইউজার লগ কনফিগারেশন
 */

import { USER_LOG } from '@vubon/shared-constants';

export interface LogConfig {
  enabled: boolean;
  levels: string[];
  categories: string[];
  formats: string[];
  defaults: {
    level: string;
    format: string;
    maxSize: number;
    maxFiles: number;
    retentionDays: number;
  };
  filters: {
    minLevel: string;
    categories: string[];
  };
}

export const createLogConfig = (): LogConfig => ({
  enabled: true,
  levels: Object.values(USER_LOG.LEVELS),
  categories: Object.values(USER_LOG.CATEGORIES),
  formats: Object.values(USER_LOG.FORMATS),
  defaults: {
    level: USER_LOG.DEFAULTS.LEVEL,
    format: USER_LOG.DEFAULTS.FORMAT,
    maxSize: USER_LOG.DEFAULTS.MAX_SIZE,
    maxFiles: USER_LOG.DEFAULTS.MAX_FILES,
    retentionDays: USER_LOG.DEFAULTS.RETENTION_DAYS,
  },
  filters: {
    minLevel: 'info',
    categories: ['user', 'profile', 'settings', 'security'],
  },
});
