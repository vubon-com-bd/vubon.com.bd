import { z } from 'zod';

export const CancelBroadcastSchema = z.object({
  broadcastId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export type CancelBroadcastRequestDTO = z.infer<typeof CancelBroadcastSchema>;
