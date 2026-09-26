import { z } from 'zod';
import { ProductListResponseSchema } from '@vubon/shared-schemas/business/product';

export type ProductListResponseDTO = z.infer<typeof ProductListResponseSchema>;
