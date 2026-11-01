/**
 * Report Format Value Types
 * @module shared-types/platform/reporting
 */

import type { REPORT_FORMAT, REPORT_FORMAT_MIME } from '@vubon/shared-constants/platform';

export type ReportFormatValue = (typeof REPORT_FORMAT)[keyof typeof REPORT_FORMAT];

export type ReportFormatMime = typeof REPORT_FORMAT_MIME;

export interface ReportFormatMetadata {
  readonly value: ReportFormatValue;
  readonly label: string;
  readonly mime: string;
  readonly maxSizeMb: number;
}
