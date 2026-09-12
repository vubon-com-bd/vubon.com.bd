import { BaseEntity } from '../common/base.types';
import { AI_VECTOR } from '@vubon/shared-constants/src/ai/ai-vector.constants';
import { AI } from './ai.types';

export interface AIVector extends BaseEntity {
  vectorId: string;
  aiId: string;
  ai: AI;
  type: keyof typeof AI_VECTOR.TYPES | string;
  indexType: keyof typeof AI_VECTOR.VECTOR_INDEX_TYPES | string;
  dimensions: number;
  values: number[];
  metadata: Record<string, unknown>;
  isActive: boolean;
}
