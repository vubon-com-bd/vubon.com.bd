import { z } from 'zod';

export const UpdateDriverRequestSchema = z.object({
  driverId: z.string().uuid(),
  name: z.string().min(2).max(100).optional(),
  phone: z.string().min(10).max(20).optional(),
});

export type UpdateDriverRequestDTO = z.infer<typeof UpdateDriverRequestSchema>;
