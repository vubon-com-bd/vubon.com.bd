/**
 * Report Schedule Schema
 * @module shared-schemas/platform/reporting
 *
 * Values আসে shared-constants/platform/report-schedule.constants থেকে।
 */

import { z } from 'zod';
import {
  REPORT_SCHEDULE_TYPE,
  REPORT_SCHEDULE_FREQUENCY,
  REPORT_SCHEDULE_STATUS,
} from '@vubon/shared-constants/platform';

export const ReportScheduleTypeSchema = z.enum(
  Object.values(REPORT_SCHEDULE_TYPE) as [string, ...string[]]
);

export const ReportScheduleFrequencySchema = z.enum(
  Object.values(REPORT_SCHEDULE_FREQUENCY) as [string, ...string[]]
);

export const ReportScheduleStatusSchema = z.enum(
  Object.values(REPORT_SCHEDULE_STATUS) as [string, ...string[]]
);

export const ReportScheduleSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  type: ReportScheduleTypeSchema,
  frequency: ReportScheduleFrequencySchema,
  status: ReportScheduleStatusSchema,
  reportType: z.string().min(1).max(100),
  format: z.string().min(1).max(20),
  cronExpression: z.string().max(100).optional(),
  scheduledAt: z.string().datetime().optional(),
  timezone: z.string().min(1).max(64),
  recipients: z.array(z.string().email()).min(1).max(100),
  filters: z.record(z.string(), z.unknown()).optional(),
  nextRunAt: z.string().datetime().optional(),
  lastRunAt: z.string().datetime().optional(),
  runCount: z.number().int().nonnegative(),
  createdBy: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ReportScheduleCreateInputSchema = z
  .object({
    name: z.string().trim().min(1).max(150),
    type: ReportScheduleTypeSchema,
    frequency: ReportScheduleFrequencySchema,
    reportType: z.string().min(1).max(100),
    format: z.string().min(1).max(20),
    scheduledAt: z.string().datetime().optional(),
    timezone: z.string().min(1).max(64),
    recipients: z.array(z.string().email()).min(1).max(100),
  })
  .strict();

export type ReportScheduleTypeSchemaType = z.infer<typeof ReportScheduleTypeSchema>;
export type ReportScheduleFrequencySchemaType = z.infer<typeof ReportScheduleFrequencySchema>;
export type ReportScheduleStatusSchemaType = z.infer<typeof ReportScheduleStatusSchema>;
export type ReportScheduleSchemaType = z.infer<typeof ReportScheduleSchema>;
