import { BaseEntity } from '../../common/base.types';
import { REPORT_SCHEDULE } from '@vubon/shared-constants/src/platform/reporting/report-schedule.constants';
import { REPORT_SCHEDULE_FREQUENCY } from '@vubon/shared-constants/src/platform/reporting/report-schedule-frequency.constants';
import { Report } from './report.types';

export interface ReportSchedule extends BaseEntity {
  scheduleId: string;
  reportId: string;
  report: Report;
  status: keyof typeof REPORT_SCHEDULE.STATUS | string;
  type: keyof typeof REPORT_SCHEDULE.SCHEDULE_TYPES | string;
  frequency: keyof typeof REPORT_SCHEDULE_FREQUENCY.TYPES | string;
  cronExpression?: string;
  startDate: Date;
  endDate?: Date;
  lastRunAt?: Date;
  nextRunAt: Date;
  runCount: number;
  maxRuns?: number;
  isActive: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  metadata: Record<string, unknown>;
}
