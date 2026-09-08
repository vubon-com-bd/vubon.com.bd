import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { DATE_FORMAT } from '../common/date-format.constants';
import { MARKETING_ANALYTICS } from './marketing-analytics.constants';

export const MARKETING_REPORT = {
  TYPES: {
    ...COMMON_TYPES,
    CAMPAIGN: 'campaign',
    PROMOTION: 'promotion',
    AFFILIATE: 'affiliate',
    REFERRAL: 'referral',
    LOYALTY: 'loyalty',
    EMAIL: 'email',
    SMS: 'sms',
    SOCIAL: 'social',
    SEO: 'seo',
    OVERALL: 'overall',
  },
  DATE_FORMAT: { ...DATE_FORMAT },
  MARKETING_ANALYTICS: { ...MARKETING_ANALYTICS },
  REPORT_FORMATS: {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
    HTML: 'html',
    POWERPOINT: 'powerpoint',
  },
  REPORT_SECTIONS: [
    'executive_summary',
    'campaign_performance',
    'promotion_analysis',
    'channel_performance',
    'roi_analysis',
    'customer_acquisition',
    'recommendations',
  ],
  DEFAULT_REPORT_DAYS: 30,
  MAX_REPORT_DAYS: 365,
  REPORT_SCHEDULE: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
  },
} as const;
