import { z } from 'zod';
import {
  MarketingReportTypeSchema,
  MarketingReportFormatSchema,
} from '@vubon/shared-schemas/marketing';

export const GenerateReportRequestSchema = z.object({
  name: z.string().min(1).max(200),
  type: MarketingReportTypeSchema,
  format: MarketingReportFormatSchema.optional(),
  filters: z.record(z.unknown()).optional(),
});

export type GenerateReportRequestDTO = z.infer<typeof GenerateReportRequestSchema>;
