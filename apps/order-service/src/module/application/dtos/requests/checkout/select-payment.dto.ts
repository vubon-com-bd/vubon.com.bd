import { z } from 'zod';

export const SelectPaymentRequestSchema = z.object({
  checkoutId: z.string().min(1),
  paymentMethod: z.string().min(1),
});

export type SelectPaymentRequestDTO = z.infer<typeof SelectPaymentRequestSchema>;
