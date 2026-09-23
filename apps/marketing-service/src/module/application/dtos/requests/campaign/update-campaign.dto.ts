import { z } from 'zod';
import { CampaignCreateInputSchema } from '@vubon/shared-schemas/marketing';

/**
 * CampaignCreateInputSchema is ZodEffects (has .refine/.superRefine)
 * — so .partial() isn't available. We build Update schema explicitly.
 */
const CampaignUpdateBaseSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  type: z.string().optional(),
  goal: z.string().optional(),
  channel: z.string().optional(),
  budgetId: z.string().uuid().optional(),
  audienceId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const UpdateCampaignRequestSchema = CampaignUpdateBaseSchema;

export type UpdateCampaignRequestDTO = z.infer<typeof UpdateCampaignRequestSchema>;
void CampaignCreateInputSchema;
