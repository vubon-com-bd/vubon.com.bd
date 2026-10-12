/**
 * Generate Report Request DTO
 * @module analytics-service/application/dtos/requests/report
 */
import { z } from 'zod';

export const GenerateReportSchema = z.object({
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
  force: z.boolean().default(false),
});

export type GenerateReportDto = z.input<typeof GenerateReportSchema>;
