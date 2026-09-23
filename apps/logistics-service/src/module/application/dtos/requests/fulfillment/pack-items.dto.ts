import { z } from 'zod';

export const PackItemsRequestSchema = z.object({
  fulfillmentId: z.string().uuid(),
  packagingId: z.string().uuid().optional(),
  notes: z.string().max(500).optional(),
});

export type PackItemsRequestDTO = z.infer<typeof PackItemsRequestSchema>;
