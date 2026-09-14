/**
 * SEO Report Types
 * @module shared-types/platform/seo
 */

import type {
  SEO_REPORT_TYPE,
  SEO_REPORT_FORMAT,
  SEO_REPORT_SCHEDULE,
} from '@vubon/shared-constants/platform';

export type SeoReportTypeValue = (typeof SEO_REPORT_TYPE)[keyof typeof SEO_REPORT_TYPE];

export type SeoReportFormatValue = (typeof SEO_REPORT_FORMAT)[keyof typeof SEO_REPORT_FORMAT];

export type SeoReportScheduleValue = (typeof SEO_REPORT_SCHEDULE)[keyof typeof SEO_REPORT_SCHEDULE];

export interface SeoReport {
  readonly id: string;
  readonly type: SeoReportTypeValue;
  readonly format: SeoReportFormatValue;
  readonly schedule?: SeoReportScheduleValue;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly fileUrl?: string;
  readonly fileSize?: number;
  readonly generatedAt: string;
  readonly expiresAt?: string;
  readonly generatedBy?: string;
}

export interface SeoReportRequest {
  readonly type: SeoReportTypeValue;
  readonly format: SeoReportFormatValue;
  readonly periodStart: string;
  readonly periodEnd: string;
}
