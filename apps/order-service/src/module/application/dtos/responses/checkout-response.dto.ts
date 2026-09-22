import { z } from 'zod';

export const CheckoutResponseSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  status: z.string(),
  step: z.string(),
  addressId: z.string().nullable(),
  shippingId: z.string().nullable(),
  paymentId: z.string().nullable(),
  expiresAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CheckoutResponseDTO = z.infer<typeof CheckoutResponseSchema>;
