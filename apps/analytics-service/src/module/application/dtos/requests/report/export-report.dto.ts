import { z } from 'zod';

const VALID_FORMATS = ['json', 'csv', 'xlsx', 'pdf', 'html'] as const;

export const ExportReportSchema = z
  .object({
    reportId: z.string().min(1).max(128),
    format: z.enum(VALID_FORMATS),
    filename: z.string().min(1).max(200).optional(),
  })
  .strict();

export type ExportReportDTO = z.infer<typeof ExportReportSchema>;
