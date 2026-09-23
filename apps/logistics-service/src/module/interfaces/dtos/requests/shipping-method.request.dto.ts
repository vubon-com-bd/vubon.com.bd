import { z } from 'zod';

export const CreateShippingMethodRequestSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.string().min(1),
  baseRate: z.number().nonnegative(),
  perKgRate: z.number().nonnegative().optional(),
  currency: z.string().length(3).default('BDT'),
  estimatedDays: z.number().int().positive().optional(),
});

export type CreateShippingMethodRequestDTO = z.infer<typeof CreateShippingMethodRequestSchema>;
