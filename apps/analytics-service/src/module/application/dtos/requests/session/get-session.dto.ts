/**
 * Get Session Request DTO
 * @module analytics-service/application/dtos/requests/session
 */
import { z } from 'zod';

export const GetSessionSchema = z.object({
  includeEvents: z.boolean().default(false),
  includePageViews: z.boolean().default(false),
  eventLimit: z.number().int().positive().max(1000).default(100),
});

export type GetSessionDto = z.input<typeof GetSessionSchema>;
