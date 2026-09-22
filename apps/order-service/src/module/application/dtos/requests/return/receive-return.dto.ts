import { z } from 'zod';

export const ReceiveReturnRequestSchema = z.object({
  returnId: z.string().min(1),
  receivedBy: z.string().min(1),
});

export type ReceiveReturnRequestDTO = z.infer<typeof ReceiveReturnRequestSchema>;
