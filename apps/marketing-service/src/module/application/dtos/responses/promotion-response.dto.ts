import { z } from 'zod';
import {
  PromotionSchema,
  PromotionPublicSchema,
  PromotionSummarySchema,
} from '@vubon/shared-schemas/marketing';

export type PromotionResponseDTO = z.infer<typeof PromotionSchema>;
export type PromotionPublicResponseDTO = z.infer<typeof PromotionPublicSchema>;
export type PromotionSummaryResponseDTO = z.infer<typeof PromotionSummarySchema>;
