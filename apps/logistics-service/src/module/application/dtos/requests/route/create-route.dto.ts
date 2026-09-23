import { z } from 'zod';
import { RouteTypeSchema } from '@vubon/shared-schemas/logistics';

export const CreateRouteRequestSchema = z.object({
  name: z.string().min(2).max(100),
  type: RouteTypeSchema,
  zoneIds: z.array(z.string().uuid()).optional(),
});

export type CreateRouteRequestDTO = z.infer<typeof CreateRouteRequestSchema>;
