import { z } from 'zod';
import { PricingSchema } from '@vubon/shared-schemas/business/product';

export type PricingResponseDTO = z.infer<typeof PricingSchema>;
