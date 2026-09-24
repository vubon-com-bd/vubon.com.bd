import { z } from 'zod';

export const UpdateRuleRequestSchema = z.object({
  ruleId: z.string().uuid(),
  name: z.string().min(2).max(100).optional(),
  condition: z.string().min(1).max(2000).optional(),
  action: z.string().min(1).max(2000).optional(),
  priority: z.number().int().min(1).max(100).optional(),
  isActive: z.boolean().optional(),
});

export type UpdateRuleRequestDTO = z.infer<typeof UpdateRuleRequestSchema>;
