import { z } from 'zod';

export const ApproveReturnRequestSchema = z.object({
  returnId: z.string().min(1),
  approvedBy: z.string().min(1),
});

export type ApproveReturnRequestDTO = z.infer<typeof ApproveReturnRequestSchema>;
