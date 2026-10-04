/**
 * Report Status Value Types
 * @module shared-types/platform/reporting
 *
 * Values আসে shared-constants/platform/reporting/report-status.constants থেকে।
 */

import type { REPORT_STATUS } from '@vubon/shared-constants/platform';

export type ReportStatusValue = (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS];

export interface ReportStatusMetadata {
  readonly value: ReportStatusValue;
  readonly label: string;
  readonly isFinal: boolean;
  readonly isSuccess: boolean;
}
