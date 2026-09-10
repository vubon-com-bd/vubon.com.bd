import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { REPORT_EXPORT } from '@vubon/shared-constants/src/platform/reporting/report-export.constants';
import { REPORT_FORMAT } from '@vubon/shared-constants/src/platform/reporting/report-format.constants';

const reportExportTypeKeys = Object.keys(REPORT_EXPORT.TYPES) as [string, ...string[]];
const reportFormatTypeKeys = Object.keys(REPORT_FORMAT.TYPES) as [string, ...string[]];
const exportDestinationKeys = Object.keys(REPORT_EXPORT.EXPORT_DESTINATIONS) as [
  string,
  ...string[],
];

export const ReportExportSchema = BaseSchema.extend({
  exportId: z.string().uuid(),
  reportId: z.string().uuid(),
  type: z.enum(reportExportTypeKeys),
  format: z.enum(reportFormatTypeKeys),
  destination: z.enum(exportDestinationKeys),
  fileUrl: z.string().url().optional(),
  fileSize: z.number().min(0),
  rowCount: z.number().int().min(0),
  isCompleted: z.boolean().default(false),
  isFailed: z.boolean().default(false),
  exportedAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
