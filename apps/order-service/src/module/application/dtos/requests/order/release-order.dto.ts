import { z } from 'zod';

export const ReleaseOrderRequestSchema = z.object({
  orderId: z.string().min(1),
});

export type ReleaseOrderRequestDTO = z.infer<typeof ReleaseOrderRequestSchema>;
