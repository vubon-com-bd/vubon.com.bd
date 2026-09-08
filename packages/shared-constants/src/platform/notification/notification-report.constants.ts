import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { DATE_FORMAT } from '../../common/date-format.constants';
import { NOTIFICATION_ANALYTICS } from './notification-analytics.constants';

export const NOTIFICATION_REPORT = {
  TYPES: {
    ...COMMON_TYPES,
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    CHANNEL: 'channel',
    TYPE: 'type',
    ENGAGEMENT: 'engagement',
  },
  DATE_FORMAT: { ...DATE_FORMAT },
  NOTIFICATION_ANALYTICS: { ...NOTIFICATION_ANALYTICS },
  REPORT_FORMATS: {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
  },
  REPORT_SECTIONS: [
    'executive_summary',
    'delivery_metrics',
    'engagement_metrics',
    'channel_performance',
    'type_performance',
    'recommendations',
  ],
  DEFAULT_REPORT_DAYS: 30,
  MAX_REPORT_DAYS: 365,
} as const;
