/**
 * Flash Sale Report Constants (EXTENDS common/types)
 * @module shared-constants/business/flash-sales/flash-sale-report.constants
 */

import { TYPES } from '../../common/types.constants';

export const FLASH_SALE_REPORT = {
  // Base types from common
  ...TYPES,

  // Report specific
  REPORT_CACHE_TTL: 3600,
  MAX_REPORT_ENTRIES: 500,
  REPORT_RETENTION_DAYS: 365,

  // Report type
  FLASH_SALE_REPORT_TYPE: {
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    ANALYTICS: 'analytics',
    FINANCIAL: 'financial',
    PERFORMANCE: 'performance',
    COMPARISON: 'comparison',
    CUSTOM: 'custom',
  } as const,

  // Report format
  FLASH_SALE_REPORT_FORMAT: {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
    HTML: 'html',
  } as const,

  // Report status
  FLASH_SALE_REPORT_STATUS: {
    PENDING: 'pending',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,

  // Report schedule
  FLASH_SALE_REPORT_SCHEDULE: {
    ON_DEMAND: 'on_demand',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    AFTER_EVENT: 'after_event',
  } as const,
} as const;

export type FlashSaleReportType =
  (typeof FLASH_SALE_REPORT.FLASH_SALE_REPORT_TYPE)[keyof typeof FLASH_SALE_REPORT.FLASH_SALE_REPORT_TYPE];
export type FlashSaleReportFormat =
  (typeof FLASH_SALE_REPORT.FLASH_SALE_REPORT_FORMAT)[keyof typeof FLASH_SALE_REPORT.FLASH_SALE_REPORT_FORMAT];
export type FlashSaleReportStatus =
  (typeof FLASH_SALE_REPORT.FLASH_SALE_REPORT_STATUS)[keyof typeof FLASH_SALE_REPORT.FLASH_SALE_REPORT_STATUS];
export type FlashSaleReportSchedule =
  (typeof FLASH_SALE_REPORT.FLASH_SALE_REPORT_SCHEDULE)[keyof typeof FLASH_SALE_REPORT.FLASH_SALE_REPORT_SCHEDULE];
