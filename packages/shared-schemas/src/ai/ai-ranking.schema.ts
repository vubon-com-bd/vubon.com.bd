import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AI_RANKING } from '@vubon/shared-constants/src/ai/ai-ranking.constants';

const aiRankingTypeKeys = Object.keys(AI_RANKING.TYPES) as [string, ...string[]];
const learningToRankAlgorithmKeys = Object.keys(AI_RANKING.LEARNING_TO_RANK_ALGORITHMS) as [
  string,
  ...string[],
];
const rankingFeatureKeys = Object.keys(AI_RANKING.RANKING_FEATURES) as [string, ...string[]];

export const AIRankingSchema = BaseSchema.extend({
  rankingId: z.string().uuid(),
  aiId: z.string().uuid(),
  type: z.enum(aiRankingTypeKeys),
  algorithm: z.enum(learningToRankAlgorithmKeys),
  features: z.array(z.enum(rankingFeatureKeys)),
  weights: z.record(z.number()),
  score: z.number().min(0).max(1),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
