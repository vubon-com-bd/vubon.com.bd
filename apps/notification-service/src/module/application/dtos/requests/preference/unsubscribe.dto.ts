import { z } from 'zod';

export const UnsubscribeSchema = z.object({
  channel: z.enum(['email', 'sms', 'push', 'in_app', 'webhook']),
  reason: z.string().max(500).optional(),
});

export type UnsubscribeRequestDTO = z.infer<typeof UnsubscribeSchema>;
