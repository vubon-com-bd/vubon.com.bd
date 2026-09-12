import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { DATE_FORMAT } from '../../common/date-format.constants';
import { FLASH_SALE_ANALYTICS } from './flash-sale-analytics.constants';

export const FLASH_SALE_REPORT = {
  TYPES: {
    ...COMMON_TYPES,
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    FINANCIAL: 'financial',
    PRODUCT_PERFORMANCE: 'product_performance',
    CUSTOMER_INSIGHT: 'customer_insight',
  },
  DATE_FORMAT: { ...DATE_FORMAT },
  FLASH_SALE_ANALYTICS: { ...FLASH_SALE_ANALYTICS },
  REPORT_FORMATS: {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
    HTML: 'html',
  },
  REPORT_SECTIONS: [
    'overview',
    'sales_metrics',
    'top_products',
    'customer_demographics',
    'payment_analysis',
    'refund_analysis',
  ],
  DEFAULT_DATE_RANGE_DAYS: 30,
  MAX_DATE_RANGE_DAYS: 365,
} as const;
