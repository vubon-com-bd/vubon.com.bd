import { z } from 'zod';

export const CreateRouteRequestSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.string().min(1),
  zoneIds: z.array(z.string().uuid()).optional(),
});

export type CreateRouteRequestDTO = z.infer<typeof CreateRouteRequestSchema>;
