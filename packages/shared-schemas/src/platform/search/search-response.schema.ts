import { z } from 'zod';
import { ProductSchema } from '../../business/product/product.schema';
import { PaginationMetaSchema } from '../../common/pagination.schema';

export const PlatformSearchResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    results: z.array(ProductSchema),
    total: z.number().int().min(0),
    took: z.number().min(0),
    pagination: PaginationMetaSchema,
    facets: z.record(z.unknown()).optional(),
    suggestions: z.array(z.string()).optional(),
  }),
});
