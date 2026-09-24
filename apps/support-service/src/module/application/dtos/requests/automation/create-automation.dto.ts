import { z } from 'zod';

export const CreateAutomationRequestSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.string().min(1).max(50),
  trigger: z.string().min(1).max(100),
  action: z.string().min(1).max(100),
  config: z.record(z.string(), z.unknown()).optional(),
});

export type CreateAutomationRequestDTO = z.infer<typeof CreateAutomationRequestSchema>;
