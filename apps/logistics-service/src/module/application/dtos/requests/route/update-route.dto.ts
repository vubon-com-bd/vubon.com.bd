import { z } from 'zod';

export const UpdateRouteRequestSchema = z.object({
  routeId: z.string().uuid(),
  name: z.string().min(2).max(100).optional(),
  distanceKm: z.number().nonnegative().optional(),
});

export type UpdateRouteRequestDTO = z.infer<typeof UpdateRouteRequestSchema>;
