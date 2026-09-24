import { z } from 'zod';

export const UpdateAgentRequestSchema = z.object({
  agentId: z.string().uuid(),
  teamId: z.string().uuid().nullable().optional(),
  type: z.string().min(1).max(50).optional(),
  skills: z.array(z.string()).optional(),
  maxLoad: z.number().int().positive().optional(),
});

export type UpdateAgentRequestDTO = z.infer<typeof UpdateAgentRequestSchema>;
