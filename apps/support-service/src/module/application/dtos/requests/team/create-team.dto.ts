import { z } from 'zod';

export const CreateTeamRequestSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.string().min(1).max(50),
  description: z.string().max(500).optional(),
});

export type CreateTeamRequestDTO = z.infer<typeof CreateTeamRequestSchema>;
