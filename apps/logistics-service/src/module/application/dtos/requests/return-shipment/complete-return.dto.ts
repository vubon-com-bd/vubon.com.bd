import { z } from 'zod';

export const CompleteReturnRequestSchema = z.object({
  returnShipmentId: z.string().uuid(),
  receivedAt: z.string().datetime().optional(),
});

export type CompleteReturnRequestDTO = z.infer<typeof CompleteReturnRequestSchema>;
