import { z } from 'zod';

export const PackOrderRequestSchema = z.object({
  fulfillmentId: z.string().min(1),
  packedBy: z.string().min(1),
});

export type PackOrderRequestDTO = z.infer<typeof PackOrderRequestSchema>;
