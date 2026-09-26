import { z } from 'zod';

export const SelectItemRequestSchema = z.object({
  cartId: z.string().uuid(),
  itemId: z.string().uuid(),
  selected: z.boolean(),
}).strict();

export type SelectItemRequestDTO = z.infer<typeof SelectItemRequestSchema>;
