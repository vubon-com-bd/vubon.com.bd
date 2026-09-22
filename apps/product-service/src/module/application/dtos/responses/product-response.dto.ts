import { z } from 'zod';
import { ProductResponseSchema } from '@vubon/shared-schemas/business/product';

export type ProductResponseDTO = z.infer<typeof ProductResponseSchema>;
