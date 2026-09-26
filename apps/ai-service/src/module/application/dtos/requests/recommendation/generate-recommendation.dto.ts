import { z } from 'zod';

export const GenerateRecommendationSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(['product', 'content', 'user', 'trending', 'similar', 'personalized']).default('personalized'),
  strategy: z.enum([
    'collaborative_filtering',
    'content_based',
    'hybrid',
    'matrix_factorization',
    'popularity',
    'recently_viewed',
  ]).default('hybrid'),
  limit: z.number().int().min(1).max(100).default(10),
  sessionId: z.string().optional(),
});

export type GenerateRecommendationRequestDTO = z.infer<typeof GenerateRecommendationSchema>;
