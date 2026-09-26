/**
 * Report Email Schema
 * @module shared-schemas/platform/reporting
 *
 * Values আসে shared-constants/platform/report-email.constants থেকে।
 */

import { z } from 'zod';
import {
  REPORT_EMAIL_TYPE,
  REPORT_EMAIL_STATUS,
  REPORT_EMAIL_FORMAT,
} from '@vubon/shared-constants/platform';
import { EmailSchema } from '../../common/primitives/email.schema';

export const ReportEmailTypeSchema = z.enum(
  Object.values(REPORT_EMAIL_TYPE) as [string, ...string[]]
);

export const ReportEmailStatusSchema = z.enum(
  Object.values(REPORT_EMAIL_STATUS) as [string, ...string[]]
);

export const ReportEmailFormatSchema = z.enum(
  Object.values(REPORT_EMAIL_FORMAT) as [string, ...string[]]
);

export const ReportEmailSchema = z.object({
  id: z.string().min(1),
  reportId: z.string().min(1),
  scheduleId: z.string().optional(),
  type: ReportEmailTypeSchema,
  status: ReportEmailStatusSchema,
  format: ReportEmailFormatSchema,
  to: z.array(EmailSchema).min(1).max(100),
  cc: z.array(EmailSchema).max(50).optional(),
  bcc: z.array(EmailSchema).max(50).optional(),
  subject: z.string().min(1).max(200),
  body: z.string().max(500000).optional(),
  attachmentUrl: z.string().url().optional(),
  sentAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  openedAt: z.string().datetime().optional(),
  failedAt: z.string().datetime().optional(),
  error: z.string().max(500).optional(),
  createdAt: z.string().datetime(),
});

export type ReportEmailTypeSchemaType = z.infer<typeof ReportEmailTypeSchema>;
export type ReportEmailStatusSchemaType = z.infer<typeof ReportEmailStatusSchema>;
export type ReportEmailFormatSchemaType = z.infer<typeof ReportEmailFormatSchema>;
export type ReportEmailSchemaType = z.infer<typeof ReportEmailSchema>;
