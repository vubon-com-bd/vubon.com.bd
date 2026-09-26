import { z } from 'zod';
import { MarketingAnalyticsSchema } from '@vubon/shared-schemas/marketing';

export type SeoMarketingResponseDTO = z.infer<typeof MarketingAnalyticsSchema>;
