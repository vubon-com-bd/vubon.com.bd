import { z } from 'zod';

export const SetDriverStatusRequestSchema = z.object({
  driverId: z.string().uuid(),
  status: z.enum(['available', 'on_duty', 'off_duty', 'suspended', 'on_leave']),
});

export type SetDriverStatusRequestDTO = z.infer<typeof SetDriverStatusRequestSchema>;
