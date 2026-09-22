import { z } from 'zod';

export const CompleteReturnRequestSchema = z.object({
  returnId: z.string().min(1),
});

export type CompleteReturnRequestDTO = z.infer<typeof CompleteReturnRequestSchema>;
