import { z } from 'zod';

export const DeletePricingRuleRequestSchema = z.object({
  ruleId: z.string().min(1),
});

export type DeletePricingRuleRequestDTO = z.infer<typeof DeletePricingRuleRequestSchema>;
