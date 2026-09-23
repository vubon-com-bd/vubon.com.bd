import { z } from 'zod';

export const TriggerAutomationRequestSchema = z.object({
  automationId: z.string().uuid(),
  userId: z.string().uuid(),
});

export type TriggerAutomationRequestDTO = z.infer<typeof TriggerAutomationRequestSchema>;
