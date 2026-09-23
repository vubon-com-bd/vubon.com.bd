import { z } from 'zod';
import {
  AffiliateSchema,
  AffiliatePublicSchema,
  AffiliateSummarySchema,
  AffiliateStatsSchema,
} from '@vubon/shared-schemas/marketing';

export type AffiliateResponseDTO = z.infer<typeof AffiliateSchema>;
export type AffiliatePublicResponseDTO = z.infer<typeof AffiliatePublicSchema>;
export type AffiliateSummaryResponseDTO = z.infer<typeof AffiliateSummarySchema>;
export type AffiliateStatsResponseDTO = z.infer<typeof AffiliateStatsSchema>;
