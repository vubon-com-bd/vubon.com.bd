import { z } from 'zod';

export const UpdateZoneRequestSchema = z.object({
  zoneId: z.string().uuid(),
  name: z.string().min(2).max(100).optional(),
  divisions: z.array(z.string()).optional(),
  districts: z.array(z.string()).optional(),
});

export type UpdateZoneRequestDTO = z.infer<typeof UpdateZoneRequestSchema>;
