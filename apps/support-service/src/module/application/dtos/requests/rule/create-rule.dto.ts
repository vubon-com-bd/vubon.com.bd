import { z } from 'zod';

export const CreateRuleRequestSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.string().min(1).max(50),
  condition: z.string().min(1).max(2000),
  action: z.string().min(1).max(2000),
  priority: z.number().int().min(1).max(100).optional(),
});

export type CreateRuleRequestDTO = z.infer<typeof CreateRuleRequestSchema>;
