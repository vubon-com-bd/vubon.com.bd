import { z } from 'zod';

export const CreateOrderRequestSchema = z.object({
  customerId: z.string().min(1),
  vendorId: z.string().optional(),
  channel: z.string().default('web'),
  source: z.string().default('direct'),
  note: z.string().max(500).optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        variantId: z.string().optional(),
        productName: z.string().min(1),
        quantity: z.number().int().min(1),
        price: z.number().nonnegative(),
      }),
    )
    .min(1),
});

export type CreateOrderRequestDTO = z.infer<typeof CreateOrderRequestSchema>;
