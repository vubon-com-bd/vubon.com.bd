import { z } from 'zod';

export const UpdateTeamRequestSchema = z.object({
  teamId: z.string().uuid(),
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  isActive: z.boolean().optional(),
});

export type UpdateTeamRequestDTO = z.infer<typeof UpdateTeamRequestSchema>;
