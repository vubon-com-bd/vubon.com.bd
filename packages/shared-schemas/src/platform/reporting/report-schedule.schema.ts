import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { REPORT_SCHEDULE } from '@vubon/shared-constants/src/platform/reporting/report-schedule.constants';
import { REPORT_SCHEDULE_FREQUENCY } from '@vubon/shared-constants/src/platform/reporting/report-schedule-frequency.constants';

const reportScheduleStatusKeys = Object.keys(REPORT_SCHEDULE.STATUS) as [string, ...string[]];
const reportScheduleTypeKeys = Object.keys(REPORT_SCHEDULE.SCHEDULE_TYPES) as [string, ...string[]];
const reportScheduleFrequencyKeys = Object.keys(REPORT_SCHEDULE_FREQUENCY.TYPES) as [
  string,
  ...string[],
];

export const ReportScheduleSchema = BaseSchema.extend({
  scheduleId: z.string().uuid(),
  reportId: z.string().uuid(),
  status: z.enum(reportScheduleStatusKeys),
  type: z.enum(reportScheduleTypeKeys),
  frequency: z.enum(reportScheduleFrequencyKeys),
  cronExpression: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  lastRunAt: z.date().optional(),
  nextRunAt: z.date(),
  runCount: z.number().int().min(0).default(0),
  maxRuns: z.number().int().min(0).optional(),
  isActive: z.boolean().default(true),
  isPaused: z.boolean().default(false),
  isCompleted: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
