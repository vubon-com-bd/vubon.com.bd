import { z } from 'zod';

export const OptimizeRouteRequestSchema = z.object({
  routeId: z.string().uuid(),
  optimization: z.enum(['shortest', 'fastest', 'cheapest', 'balanced']),
});

export type OptimizeRouteRequestDTO = z.infer<typeof OptimizeRouteRequestSchema>;
