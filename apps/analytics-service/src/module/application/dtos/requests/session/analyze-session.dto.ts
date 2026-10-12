/**
 * Analyze Session Request DTO
 * @module analytics-service/application/dtos/requests/session
 */
import { z } from 'zod';

export const AnalyzeSessionSchema = z.object({
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  userId: z.string().min(1).max(128).optional(),
  groupBy: z.enum(['none', 'device', 'source', 'country']).default('none'),
});

export type AnalyzeSessionDto = z.input<typeof AnalyzeSessionSchema>;
