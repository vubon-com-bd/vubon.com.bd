import { z } from 'zod';

export const StartBroadcastSchema = z.object({
  broadcastId: z.string().uuid(),
});

export type StartBroadcastRequestDTO = z.infer<typeof StartBroadcastSchema>;
