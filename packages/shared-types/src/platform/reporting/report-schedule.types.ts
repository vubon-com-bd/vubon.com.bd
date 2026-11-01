/**
 * Report Schedule Types
 * @module shared-types/platform/reporting
 */

import type {
  REPORT_SCHEDULE_TYPE,
  REPORT_SCHEDULE_FREQUENCY,
  REPORT_SCHEDULE_STATUS,
} from '@vubon/shared-constants/platform';

export type ReportScheduleTypeValue =
  (typeof REPORT_SCHEDULE_TYPE)[keyof typeof REPORT_SCHEDULE_TYPE];

export type ReportScheduleFrequencyValue =
  (typeof REPORT_SCHEDULE_FREQUENCY)[keyof typeof REPORT_SCHEDULE_FREQUENCY];

export type ReportScheduleStatusValue =
  (typeof REPORT_SCHEDULE_STATUS)[keyof typeof REPORT_SCHEDULE_STATUS];

export interface ReportSchedule {
  readonly id: string;
  readonly name: string;
  readonly type: ReportScheduleTypeValue;
  readonly frequency: ReportScheduleFrequencyValue;
  readonly status: ReportScheduleStatusValue;
  readonly reportType: string;
  readonly format: string;
  readonly cronExpression?: string;
  readonly scheduledAt?: string;
  readonly timezone: string;
  readonly recipients: readonly string[];
  readonly filters?: Readonly<Record<string, unknown>>;
  readonly nextRunAt?: string;
  readonly lastRunAt?: string;
  readonly runCount: number;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ReportScheduleCreateInput {
  readonly name: string;
  readonly type: ReportScheduleTypeValue;
  readonly frequency: ReportScheduleFrequencyValue;
  readonly reportType: string;
  readonly format: string;
  readonly scheduledAt?: string;
  readonly timezone: string;
  readonly recipients: readonly string[];
}
