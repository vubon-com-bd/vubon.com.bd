import { z } from 'zod';
import { ProductPublicResponseSchema } from '@vubon/shared-schemas/business/product';

export type ProductPublicResponseDTO = z.infer<typeof ProductPublicResponseSchema>;
