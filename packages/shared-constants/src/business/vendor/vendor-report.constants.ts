import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { DATE_FORMAT } from '../../common/date-format.constants';
import { VENDOR_PERFORMANCE } from './vendor-performance.constants';
import { VENDOR_ACTIVITY } from './vendor-activity.constants';

export const VENDOR_REPORT = {
  TYPES: {
    ...COMMON_TYPES,
    PERFORMANCE: 'performance',
    FINANCIAL: 'financial',
    SALES: 'sales',
    PRODUCT: 'product',
    CUSTOMER: 'customer',
    OPERATIONAL: 'operational',
  },
  DATE_FORMAT: { ...DATE_FORMAT },
  VENDOR_PERFORMANCE: { ...VENDOR_PERFORMANCE },
  VENDOR_ACTIVITY: { ...VENDOR_ACTIVITY },
  REPORT_FORMATS: {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
    HTML: 'html',
  },
  REPORT_SECTIONS: [
    'executive_summary',
    'sales_metrics',
    'top_products',
    'customer_insights',
    'financial_summary',
    'performance_metrics',
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
