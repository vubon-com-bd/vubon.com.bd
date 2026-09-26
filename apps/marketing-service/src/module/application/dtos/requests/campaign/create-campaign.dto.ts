import { z } from 'zod';
import { CampaignCreateInputSchema } from '@vubon/shared-schemas/marketing';

export type CreateCampaignRequestDTO = z.infer<typeof CampaignCreateInputSchema>;
