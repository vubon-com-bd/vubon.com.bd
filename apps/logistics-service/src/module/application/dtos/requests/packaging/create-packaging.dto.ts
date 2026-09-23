import { z } from 'zod';

export const CreatePackagingRequestSchema = z.object({
  type: z.enum(['box', 'envelope', 'bag', 'tube', 'pallet', 'crate']),
  material: z.enum(['cardboard', 'plastic', 'wood', 'metal', 'bubble_wrap', 'foam']),
  size: z.string().min(1).max(50),
  maxWeight: z.number().positive().optional(),
  cost: z.number().nonnegative(),
  currency: z.string().length(3).default('BDT'),
});

export type CreatePackagingRequestDTO = z.infer<typeof CreatePackagingRequestSchema>;
