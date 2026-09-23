import { z } from 'zod';

export const CompleteFulfillmentRequestSchema = z.object({
  fulfillmentId: z.string().uuid(),
});

export type CompleteFulfillmentRequestDTO = z.infer<typeof CompleteFulfillmentRequestSchema>;
