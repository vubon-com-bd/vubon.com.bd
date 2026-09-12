import { BaseEntity } from '../common/base.types';
import { AI_FEATURE } from '@vubon/shared-constants/src/ai/ai-feature.constants';
import { AI } from './ai.types';

export interface AIFeature extends BaseEntity {
  featureId: string;
  aiId: string;
  ai: AI;
  type: keyof typeof AI_FEATURE.TYPES | string;
  name: string;
  description?: string;
  status: keyof typeof AI_FEATURE.AI_FEATURE_STATUS | string;
  requirements: string[];
  isActive: boolean;
  metadata: Record<string, unknown>;
}
