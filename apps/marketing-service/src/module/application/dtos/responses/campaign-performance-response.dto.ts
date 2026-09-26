import { z } from 'zod';
import { CampaignMetricsSchema } from '@vubon/shared-schemas/marketing';

export type CampaignPerformanceResponseDTO = z.infer<typeof CampaignMetricsSchema>;
