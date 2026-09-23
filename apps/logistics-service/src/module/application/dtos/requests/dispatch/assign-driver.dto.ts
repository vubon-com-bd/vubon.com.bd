import { z } from 'zod';

export const AssignDriverRequestSchema = z.object({
  dispatchId: z.string().uuid(),
  driverId: z.string().uuid(),
});

export type AssignDriverRequestDTO = z.infer<typeof AssignDriverRequestSchema>;
