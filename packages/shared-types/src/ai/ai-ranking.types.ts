import { BaseEntity } from '../common/base.types';
import { AI_RANKING } from '@vubon/shared-constants/src/ai/ai-ranking.constants';
import { AI } from './ai.types';

export interface AIRanking extends BaseEntity {
  rankingId: string;
  aiId: string;
  ai: AI;
  type: keyof typeof AI_RANKING.TYPES | string;
  algorithm: keyof typeof AI_RANKING.LEARNING_TO_RANK_ALGORITHMS | string;
  features: (keyof typeof AI_RANKING.RANKING_FEATURES | string)[];
  weights: Record<string, number>;
  score: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
