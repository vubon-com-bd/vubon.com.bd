import { z } from 'zod';

export const UpdateAutomationRequestSchema = z.object({
  automationId: z.string().uuid(),
  name: z.string().min(2).max(100).optional(),
  trigger: z.string().min(1).max(100).optional(),
  action: z.string().min(1).max(100).optional(),
  status: z.string().min(1).max(50).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
});

export type UpdateAutomationRequestDTO = z.infer<typeof UpdateAutomationRequestSchema>;
