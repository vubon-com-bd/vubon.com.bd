import { z } from 'zod';
import {
  MarketingAnalyticsSchema,
  MarketingAttributionSchema,
} from '@vubon/shared-schemas/marketing';

export type MarketingAnalyticsResponseDTO = z.infer<typeof MarketingAnalyticsSchema>;
export type MarketingAttributionResponseDTO = z.infer<typeof MarketingAttributionSchema>;
