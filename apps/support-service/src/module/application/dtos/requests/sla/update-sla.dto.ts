import { z } from 'zod';

export const UpdateSlaRequestSchema = z.object({
  slaId: z.string().uuid(),
  name: z.string().min(2).max(100).optional(),
  target: z.number().int().positive().optional(),
  priority: z.string().min(1).max(50).optional(),
  status: z.string().min(1).max(50).optional(),
  businessHoursOnly: z.boolean().optional(),
});

export type UpdateSlaRequestDTO = z.infer<typeof UpdateSlaRequestSchema>;
