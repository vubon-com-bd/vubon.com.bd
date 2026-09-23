import { z } from 'zod';
import {
  MarketingAutomationTypeSchema,
  MarketingAutomationTriggerSchema,
} from '@vubon/shared-schemas/marketing';

export const CreateAutomationRequestSchema = z.object({
  name: z.string().min(1).max(200),
  type: MarketingAutomationTypeSchema,
  trigger: MarketingAutomationTriggerSchema,
  config: z.record(z.unknown()).optional(),
});

export type CreateAutomationRequestDTO = z.infer<typeof CreateAutomationRequestSchema>;
