import { z } from 'zod';

export const AddAttributeRequestSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1).max(100),
  value: z.string().min(1).max(255),
});

export type AddAttributeRequestDTO = z.infer<typeof AddAttributeRequestSchema>;
