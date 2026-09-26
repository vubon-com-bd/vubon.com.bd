import { z } from 'zod';

export const RankProductsSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    relevanceScore: z.number().min(0).max(1),
    clickThroughRate: z.number().min(0).max(1).default(0),
    freshness: z.number().min(0).max(1).default(0.5),
    popularity: z.number().min(0).max(1).default(0.5),
  })).min(1),
  algorithm: z.enum(['linear', 'learning_to_rank', 'hybrid']).default('learning_to_rank'),
  limit: z.number().int().min(1).max(100).optional(),
});

export type RankProductsRequestDTO = z.infer<typeof RankProductsSchema>;
