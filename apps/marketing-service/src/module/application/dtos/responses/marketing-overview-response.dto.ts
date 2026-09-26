import { z } from 'zod';
import {
  MarketingOverviewSchema,
  MarketingStatsSchema,
} from '@vubon/shared-schemas/marketing';

export type MarketingOverviewResponseDTO = z.infer<typeof MarketingOverviewSchema>;
export type MarketingStatsResponseDTO = z.infer<typeof MarketingStatsSchema>;
