import { z } from 'zod';
import { CartTypeSchema } from '@vubon/shared-schemas/cart';

export const CreateCartRequestSchema = z.object({
  userId: z.string().uuid().optional(),
  type: CartTypeSchema,
  currency: z.string().length(3),
}).strict();

export type CreateCartRequestDTO = z.infer<typeof CreateCartRequestSchema>;
