import { z } from 'zod';

export const InvoicePublicResponseSchema = z.object({
  id: z.string().uuid(),
  number: z.string(),
  status: z.string(),
  amount: z.number(),
  currency: z.string().length(3),
  dueAt: z.string().datetime().nullable().optional(),
  paidAt: z.string().datetime().nullable().optional(),
  createdAt: z.string().datetime(),
});

export type InvoiceResponseDTO = z.infer<typeof InvoicePublicResponseSchema>;
