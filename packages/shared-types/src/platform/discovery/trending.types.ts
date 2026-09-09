import { BaseEntity } from '../../common/base.types';
import { TRENDING } from '@vubon/shared-constants/src/platform/discovery/trending.constants';

export interface Trending extends BaseEntity {
  trendingId: string;
  type: keyof typeof TRENDING.TYPES | string;
  timeFrame: keyof typeof TRENDING.TIME_FRAMES | string;
  score: number;
  rank: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
