/**
 * Deal Report Constants (EXTENDS common/types)
 * @module shared-constants/business/flash-sales/deal-report.constants
 */

import { TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { TAX } from '../../common/tax.constants';
import { DISCOUNT } from '../../common/discount.constants';

export const DEAL_REPORT = {
  // Base types from common
  ...TYPES,

  // Currency from common
  CURRENCY: CURRENCY,

  // Tax from common
  TAX: TAX,

  // Discount from common
  DISCOUNT: DISCOUNT,

  // Report specific
  REPORT_CACHE_TTL: 3600,
  MAX_REPORT_ENTRIES: 500,
  REPORT_RETENTION_DAYS: 730,

  // Report type
  DEAL_REPORT_TYPE: {
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    FINANCIAL: 'financial',
    PERFORMANCE: 'performance',
    COMPARISON: 'comparison',
    ANALYTICS: 'analytics',
    CUSTOMER: 'customer',
    PRODUCT: 'product',
    CUSTOM: 'custom',
  } as const,

  // Report format
  DEAL_REPORT_FORMAT: {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
    HTML: 'html',
    PPT: 'ppt',
  } as const,

  // Report status
  DEAL_REPORT_STATUS: {
    PENDING: 'pending',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    SCHEDULED: 'scheduled',
  } as const,

  // Report schedule
  DEAL_REPORT_SCHEDULE: {
    ON_DEMAND: 'on_demand',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    POST_DEAL: 'post_deal',
    PRE_DEAL: 'pre_deal',
    DURING_DEAL: 'during_deal',
  } as const,
} as const;

export type DealReportType =
  (typeof DEAL_REPORT.DEAL_REPORT_TYPE)[keyof typeof DEAL_REPORT.DEAL_REPORT_TYPE];
export type DealReportFormat =
  (typeof DEAL_REPORT.DEAL_REPORT_FORMAT)[keyof typeof DEAL_REPORT.DEAL_REPORT_FORMAT];
export type DealReportStatus =
  (typeof DEAL_REPORT.DEAL_REPORT_STATUS)[keyof typeof DEAL_REPORT.DEAL_REPORT_STATUS];
export type DealReportSchedule =
  (typeof DEAL_REPORT.DEAL_REPORT_SCHEDULE)[keyof typeof DEAL_REPORT.DEAL_REPORT_SCHEDULE];
