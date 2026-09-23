import { z } from 'zod';
import { MarketingReportSchema } from '@vubon/shared-schemas/marketing';

export type MarketingReportResponseDTO = z.infer<typeof MarketingReportSchema>;
