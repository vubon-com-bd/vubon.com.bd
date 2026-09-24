import { z } from 'zod';

export const ResolveComplaintRequestSchema = z.object({
  complaintId: z.string().uuid(),
  resolution: z.string().min(1).max(2000),
});

export type ResolveComplaintRequestDTO = z.infer<typeof ResolveComplaintRequestSchema>;
