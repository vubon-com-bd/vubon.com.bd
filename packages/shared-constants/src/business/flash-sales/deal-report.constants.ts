import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { DATE_FORMAT } from '../../common/date-format.constants';
import { DEAL_ANALYTICS } from './deal-analytics.constants';

export const DEAL_REPORT = {
  TYPES: {
    ...COMMON_TYPES,
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    FINANCIAL: 'financial',
    PERFORMANCE: 'performance',
    INSIGHT: 'insight',
  },
  DATE_FORMAT: { ...DATE_FORMAT },
  DEAL_ANALYTICS: { ...DEAL_ANALYTICS },
  REPORT_FORMATS: {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
  },
  REPORT_SECTIONS: [
    'executive_summary',
    'performance_metrics',
    'top_deals',
    'customer_analysis',
    'revenue_analysis',
    'recommendations',
  ],
  DEFAULT_REPORT_DAYS: 30,
  MAX_REPORT_DAYS: 365,
} as const;
