/**
 * Marketing Report Types
 * @module shared-types/marketing
 */

import type {
  MARKETING_REPORT_TYPE,
  MARKETING_REPORT_FORMAT,
  MARKETING_REPORT_SCHEDULE,
} from '@vubon/shared-constants/marketing';

export type MarketingReportTypeValue =
  (typeof MARKETING_REPORT_TYPE)[keyof typeof MARKETING_REPORT_TYPE];

export type MarketingReportFormatValue =
  (typeof MARKETING_REPORT_FORMAT)[keyof typeof MARKETING_REPORT_FORMAT];

export type MarketingReportScheduleValue =
  (typeof MARKETING_REPORT_SCHEDULE)[keyof typeof MARKETING_REPORT_SCHEDULE];

export interface MarketingReport {
  readonly id: string;
  readonly type: MarketingReportTypeValue;
  readonly format: MarketingReportFormatValue;
  readonly schedule?: MarketingReportScheduleValue;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly fileUrl?: string;
  readonly fileSize?: number;
  readonly generatedAt: string;
  readonly expiresAt?: string;
  readonly generatedBy?: string;
}

export interface MarketingReportRequest {
  readonly type: MarketingReportTypeValue;
  readonly format: MarketingReportFormatValue;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly filters?: Readonly<Record<string, unknown>>;
}
