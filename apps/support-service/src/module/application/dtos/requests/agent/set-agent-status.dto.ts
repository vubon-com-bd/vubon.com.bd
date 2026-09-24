import { z } from 'zod';

export const SetAgentStatusRequestSchema = z.object({
  agentId: z.string().uuid(),
  status: z.string().min(1).max(50),
});

export type SetAgentStatusRequestDTO = z.infer<typeof SetAgentStatusRequestSchema>;
