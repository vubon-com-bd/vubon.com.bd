import { z } from 'zod';

export const CreateZoneRequestSchema = z.object({
  code: z.string().min(2).max(20),
  name: z.string().min(2).max(100),
  type: z.enum(['urban', 'suburban', 'rural', 'remote']),
  divisions: z.array(z.string()).default([]),
  districts: z.array(z.string()).default([]),
});

export type CreateZoneRequestDTO = z.infer<typeof CreateZoneRequestSchema>;
