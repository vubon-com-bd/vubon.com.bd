import { z } from 'zod';
import {
  MarketingAutomationSchema,
  AutomationExecutionSchema,
} from '@vubon/shared-schemas/marketing';

export type AutomationResponseDTO = z.infer<typeof MarketingAutomationSchema>;
export type AutomationExecutionResponseDTO = z.infer<typeof AutomationExecutionSchema>;
