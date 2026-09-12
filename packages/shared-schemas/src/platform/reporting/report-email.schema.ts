import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { REPORT_EMAIL } from '@vubon/shared-constants/src/platform/reporting/report-email.constants';
import { REPORT_FORMAT } from '@vubon/shared-constants/src/platform/reporting/report-format.constants';

const reportEmailStatusKeys = Object.keys(REPORT_EMAIL.STATUS) as [string, ...string[]];
const reportEmailTypeKeys = Object.keys(REPORT_EMAIL.TYPES) as [string, ...string[]];
const reportEmailTemplateKeys = Object.keys(REPORT_EMAIL.EMAIL_TEMPLATES) as [string, ...string[]];
const reportFormatTypeKeys = Object.keys(REPORT_FORMAT.TYPES) as [string, ...string[]];

export const ReportEmailSchema = BaseSchema.extend({
  emailId: z.string().uuid(),
  reportId: z.string().uuid(),
  status: z.enum(reportEmailStatusKeys),
  type: z.enum(reportEmailTypeKeys),
  template: z.enum(reportEmailTemplateKeys),
  from: z.string().email(),
  to: z.array(z.string().email()),
  cc: z.array(z.string().email()),
  bcc: z.array(z.string().email()),
  subject: z.string().min(1).max(200),
  body: z.string().min(1).max(5000),
  format: z.enum(reportFormatTypeKeys),
  isSent: z.boolean().default(false),
  isFailed: z.boolean().default(false),
  sentAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
