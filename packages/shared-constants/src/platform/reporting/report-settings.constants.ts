import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { REPORT_FORMAT } from './report-format.constants';

export const REPORT_SETTINGS = {
  TYPES: {
    ...COMMON_TYPES,
    GENERAL: 'general',
    EXPORT: 'export',
    SCHEDULE: 'schedule',
    NOTIFICATION: 'notification',
    PRIVACY: 'privacy',
  },
  REPORT_FORMAT: { ...REPORT_FORMAT },
  SETTINGS_CATEGORIES: {
    DEFAULT_FORMAT: 'default_format',
    DEFAULT_TIMEZONE: 'default_timezone',
    DEFAULT_LOCALE: 'default_locale',
    MAX_RETENTION_DAYS: 'max_retention_days',
    ENABLE_EXPORT: 'enable_export',
    ENABLE_SCHEDULE: 'enable_schedule',
    ENABLE_NOTIFICATION: 'enable_notification',
  },
  DEFAULT_FORMAT: 'pdf',
  DEFAULT_TIMEZONE: 'Asia/Dhaka',
  DEFAULT_LOCALE: 'en_BD',
} as const;
