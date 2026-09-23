import { z } from 'zod';

export const PickItemsRequestSchema = z.object({
  fulfillmentId: z.string().uuid(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      locationId: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ).min(1),
});

export type PickItemsRequestDTO = z.infer<typeof PickItemsRequestSchema>;
