import { z } from 'zod';

export const CreatePricingRuleRequestSchema = z.object({
  productId: z.string().min(1),
  type: z.enum(['discount', 'markup', 'tiered', 'bogo', 'flash_sale']),
  value: z.string().min(1).max(500),
  startAt: z.string().datetime().optional(),
  endAt: z.string().datetime().optional(),
});

export type CreatePricingRuleRequestDTO = z.infer<typeof CreatePricingRuleRequestSchema>;
