/**
 * Create Funnel Request DTO
 * @module analytics-service/application/dtos/requests/funnel
 */
import { z } from 'zod';

export const CreateFunnelSchema = z.object({
  name: z.string().min(3).max(200),
  steps: z
    .array(
      z.object({
        order: z.number().int().min(1).max(20),
        name: z.string().min(2).max(100),
      })
    )
    .min(2, 'Funnel requires at least 2 steps')
    .max(20, 'Max 20 steps per funnel'),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  windowMinutes: z.number().int().positive().max(43200).default(1440), // 24h
  stage: z.string().max(50).optional(),
});

export type CreateFunnelDto = z.input<typeof CreateFunnelSchema>;
