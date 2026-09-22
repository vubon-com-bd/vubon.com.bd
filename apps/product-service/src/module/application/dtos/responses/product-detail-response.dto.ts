import { z } from 'zod';
import { ProductResponseSchema } from '@vubon/shared-schemas/business/product';

export const ProductDetailResponseSchema = ProductResponseSchema;

export type ProductDetailResponseDTO = z.infer<typeof ProductDetailResponseSchema>;
