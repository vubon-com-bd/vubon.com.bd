import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { ReportTemplateSchema } from './report-template.schema';
import { ReportFilterSchema } from './report-filter.schema';
import { ReportExportSchema } from './report-export.schema';
import { ReportEmailSchema } from './report-email.schema';
import { ReportScheduleSchema } from './report-schedule.schema';
import { REPORT_STATUS } from '@vubon/shared-constants/src/platform/reporting/report-status.constants';
import { REPORT } from '@vubon/shared-constants/src/platform/reporting/report.constants';

const reportStatusKeys = Object.keys(REPORT_STATUS) as [string, ...string[]];
const reportTypeKeys = Object.keys(REPORT.REPORT_TYPE) as [string, ...string[]];
const reportPriorityKeys = Object.keys(REPORT.REPORT_PRIORITY) as [string, ...string[]];

export const ReportSchema = BaseSchema.extend({
  reportId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(reportStatusKeys),
  type: z.enum(reportTypeKeys),
  category: z.enum(reportTypeKeys),
  priority: z.enum(reportPriorityKeys),
  template: ReportTemplateSchema,
  filters: z.array(ReportFilterSchema),
  export: ReportExportSchema,
  email: ReportEmailSchema,
  schedule: ReportScheduleSchema,
  createdBy: z.string().uuid(),
  createdByUser: UserSchema,
  generatedAt: z.date().optional(),
  fileUrl: z.string().url().optional(),
  fileSize: z.number().min(0).optional(),
  rowCount: z.number().int().min(0),
  isActive: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  metadata: z.object({
    timezone: z.string(),
    locale: z.string(),
    tags: z.array(z.string()),
    notes: z.string().optional(),
    version: z.number().int().min(1).default(1),
  }),
});

export const ReportCreateSchema = ReportSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  generatedAt: true,
  fileUrl: true,
  fileSize: true,
  rowCount: true,
});

export const ReportUpdateSchema = ReportCreateSchema.partial();
