import { z } from 'zod';

export const AddTeamMemberRequestSchema = z.object({
  teamId: z.string().uuid(),
  agentId: z.string().uuid(),
});

export type AddTeamMemberRequestDTO = z.infer<typeof AddTeamMemberRequestSchema>;
