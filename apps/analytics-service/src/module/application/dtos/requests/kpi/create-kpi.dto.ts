/**
 * Create KPI Request DTO
 * @module analytics-service/application/dtos/requests/kpi
 */
import { z } from 'zod';

export const CreateKpiSchema = z.object({
  name: z.string().min(3).max(150),
  metric: z.string().min(2).max(100),
  target: z.number().positive().max(1e15),
  thresholdPercent: z.number().min(0).max(100).default(80),
  higherIsBetter: z.boolean().default(true),
  description: z.string().max(500).optional(),
  tags: z.array(z.string().min(1).max(50)).max(20).optional(),
});

export type CreateKpiDto = z.input<typeof CreateKpiSchema>;
