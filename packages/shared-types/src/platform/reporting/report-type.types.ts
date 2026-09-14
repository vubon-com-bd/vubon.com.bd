/**
 * Report Type Value Types
 * @module shared-types/platform/reporting
 */

import type { REPORT_TYPE } from '@vubon/shared-constants/platform';

export type ReportTypeValue = (typeof REPORT_TYPE)[keyof typeof REPORT_TYPE];

export interface ReportTypeMetadata {
  readonly value: ReportTypeValue;
  readonly label: string;
  readonly category: string;
  readonly isFinancial: boolean;
}
