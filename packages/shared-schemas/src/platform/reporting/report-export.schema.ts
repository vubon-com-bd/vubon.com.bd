/**
 * Report Export Schema
 * @module shared-schemas/platform/reporting
 *
 * Values আসে shared-constants/platform/report-export.constants থেকে।
 */

import { z } from 'zod';
import {
  REPORT_EXPORT_TYPE,
  REPORT_EXPORT_STATUS,
  REPORT_EXPORT_DESTINATION,
} from '@vubon/shared-constants/platform';

export const ReportExportTypeSchema = z.enum(
  Object.values(REPORT_EXPORT_TYPE) as [string, ...string[]]
);

export const ReportExportStatusSchema = z.enum(
  Object.values(REPORT_EXPORT_STATUS) as [string, ...string[]]
);

export const ReportExportDestinationSchema = z.enum(
  Object.values(REPORT_EXPORT_DESTINATION) as [string, ...string[]]
);

export const ReportExportSchema = z.object({
  id: z.string().min(1),
  reportId: z.string().min(1),
  type: ReportExportTypeSchema,
  status: ReportExportStatusSchema,
  destination: ReportExportDestinationSchema,
  format: z.string().min(1).max(20),
  fileUrl: z.string().url().optional(),
  fileSize: z.number().int().nonnegative().optional(),
  rowCount: z.number().int().nonnegative().optional(),
  expiresAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  error: z.string().max(1000).optional(),
  requestedBy: z.string().min(1),
  createdAt: z.string().datetime(),
});

export type ReportExportTypeSchemaType = z.infer<typeof ReportExportTypeSchema>;
export type ReportExportStatusSchemaType = z.infer<typeof ReportExportStatusSchema>;
export type ReportExportDestinationSchemaType = z.infer<typeof ReportExportDestinationSchema>;
export type ReportExportSchemaType = z.infer<typeof ReportExportSchema>;
