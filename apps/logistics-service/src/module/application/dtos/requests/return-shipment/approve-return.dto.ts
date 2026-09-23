import { z } from 'zod';

export const ApproveReturnRequestSchema = z.object({
  returnShipmentId: z.string().uuid(),
  notes: z.string().max(500).optional(),
});

export type ApproveReturnRequestDTO = z.infer<typeof ApproveReturnRequestSchema>;
