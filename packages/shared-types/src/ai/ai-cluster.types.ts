import { BaseEntity } from '../common/base.types';
import { AI_CLUSTER } from '@vubon/shared-constants/src/ai/ai-cluster.constants';
import { AIVector } from './ai-vector.types';
import { AI } from './ai.types';

export interface AICluster extends BaseEntity {
  clusterId: string;
  aiId: string;
  ai: AI;
  type: keyof typeof AI_CLUSTER.TYPES | string;
  vectors: AIVector[];
  centroid: AIVector;
  size: number;
  silhouetteScore: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
