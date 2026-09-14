/**
 * Report Priority Value Types
 * @module shared-types/platform/reporting
 */

import type {
  REPORT_PRIORITY,
  REPORT_PRIORITY_WEIGHT,
  REPORT_PRIORITY_SLA_SECONDS,
} from '@vubon/shared-constants/platform';

export type ReportPriorityValue = (typeof REPORT_PRIORITY)[keyof typeof REPORT_PRIORITY];

export type ReportPriorityWeight = typeof REPORT_PRIORITY_WEIGHT;
export type ReportPrioritySla = typeof REPORT_PRIORITY_SLA_SECONDS;

export interface ReportPriorityMetadata {
  readonly value: ReportPriorityValue;
  readonly weight: number;
  readonly slaSeconds: number;
  readonly label: string;
}
