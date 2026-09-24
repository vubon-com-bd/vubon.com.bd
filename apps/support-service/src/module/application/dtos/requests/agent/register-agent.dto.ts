import { z } from 'zod';

export const RegisterAgentRequestSchema = z.object({
  userId: z.string().uuid(),
  teamId: z.string().uuid().optional(),
  type: z.string().min(1).max(50),
  skills: z.array(z.string()).optional(),
  maxLoad: z.number().int().positive().optional(),
});

export type RegisterAgentRequestDTO = z.infer<typeof RegisterAgentRequestSchema>;
