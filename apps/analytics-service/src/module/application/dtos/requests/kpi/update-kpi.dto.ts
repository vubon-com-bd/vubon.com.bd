/**
 * Update KPI Request DTO
 * @module analytics-service/application/dtos/requests/kpi
 */
import { z } from 'zod';

export const UpdateKpiSchema = z
  .object({
    name: z.string().min(3).max(150).optional(),
    target: z.number().positive().max(1e15).optional(),
    thresholdPercent: z.number().min(0).max(100).optional(),
    higherIsBetter: z.boolean().optional(),
    description: z.string().max(500).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((d) => Object.keys(d).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateKpiDto = z.input<typeof UpdateKpiSchema>;
