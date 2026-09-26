import { z } from 'zod';

export const RemoveOrderItemRequestSchema = z.object({
  itemId: z.string().min(1),
});

export type RemoveOrderItemRequestDTO = z.infer<typeof RemoveOrderItemRequestSchema>;
