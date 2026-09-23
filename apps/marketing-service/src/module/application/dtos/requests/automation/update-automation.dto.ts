import { z } from 'zod';

export const UpdateAutomationRequestSchema = z.object({
  automationId: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  config: z.record(z.unknown()).optional(),
  status: z.enum(['active', 'paused']).optional(),
});

export type UpdateAutomationRequestDTO = z.infer<typeof UpdateAutomationRequestSchema>;
