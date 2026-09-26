import { z } from 'zod';

export const UpdatePricingRuleRequestSchema = z.object({
  ruleId: z.string().min(1),
  value: z.string().min(1).max(500).optional(),
  isActive: z.boolean().optional(),
});

export type UpdatePricingRuleRequestDTO = z.infer<typeof UpdatePricingRuleRequestSchema>;
