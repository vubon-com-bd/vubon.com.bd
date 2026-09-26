import { z } from 'zod';
import { BrandPublicSchema } from '@vubon/shared-schemas/business/product';

export type BrandResponseDTO = z.infer<typeof BrandPublicSchema>;
