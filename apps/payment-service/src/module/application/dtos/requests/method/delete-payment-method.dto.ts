import { z } from 'zod';

export const DeletePaymentMethodRequestSchema = z.object({
  methodId: z.string().uuid(),
}).strict();

export type DeletePaymentMethodRequestDTO = z.infer<typeof DeletePaymentMethodRequestSchema>;
