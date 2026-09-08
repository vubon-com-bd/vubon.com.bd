import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { DATE_FORMAT } from '../common/date-format.constants';
import { LOGISTICS_ANALYTICS } from './logistics-analytics.constants';
import { SHIPMENT_STATUS } from './shipment-status.constants';
import { DELIVERY_STATUS } from './delivery-status.constants';

export const LOGISTICS_REPORT = {
  TYPES: {
    ...COMMON_TYPES,
    SHIPMENT: 'shipment',
    DELIVERY: 'delivery',
    COURIER: 'courier',
    PERFORMANCE: 'performance',
    FINANCIAL: 'financial',
    OPERATIONAL: 'operational',
  },
  DATE_FORMAT: { ...DATE_FORMAT },
  LOGISTICS_ANALYTICS: { ...LOGISTICS_ANALYTICS },
  SHIPMENT_STATUS: { ...SHIPMENT_STATUS },
  DELIVERY_STATUS: { ...DELIVERY_STATUS },
  REPORT_FORMATS: {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
    HTML: 'html',
  },
  REPORT_SECTIONS: [
    'executive_summary',
    'shipment_metrics',
    'delivery_performance',
    'courier_analysis',
    'cost_analysis',
    'return_analysis',
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
