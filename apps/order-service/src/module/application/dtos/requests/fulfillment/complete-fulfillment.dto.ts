import { z } from 'zod';

export const CompleteFulfillmentRequestSchema = z.object({
  fulfillmentId: z.string().min(1),
});

export type CompleteFulfillmentRequestDTO = z.infer<typeof CompleteFulfillmentRequestSchema>;
