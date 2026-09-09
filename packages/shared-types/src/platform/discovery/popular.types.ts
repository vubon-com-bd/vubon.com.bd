import { BaseEntity } from '../../common/base.types';
import { POPULAR } from '@vubon/shared-constants/src/platform/discovery/popular.constants';

export interface Popular extends BaseEntity {
  popularId: string;
  type: keyof typeof POPULAR.TYPES | string;
  metric: keyof typeof POPULAR.POPULARITY_METRICS | string;
  score: number;
  rank: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
