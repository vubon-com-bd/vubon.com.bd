/**
 * Analyze Funnel Request DTO
 * @module analytics-service/application/dtos/requests/funnel
 */
import { z } from 'zod';

export const AnalyzeFunnelSchema = z.object({
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  breakdownBy: z.enum(['none', 'device', 'source', 'country']).default('none'),
});

export type AnalyzeFunnelDto = z.input<typeof AnalyzeFunnelSchema>;
