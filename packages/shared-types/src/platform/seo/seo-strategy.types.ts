import { BaseEntity } from '../../common/base.types';
import { SEO_STRATEGY } from '@vubon/shared-constants/src/platform/seo/seo-strategy.constants';
import { SEO } from './seo.types';

export interface SEOStrategy extends BaseEntity {
  strategyId: string;
  seoId: string;
  seo: SEO;
  type: keyof typeof SEO_STRATEGY.TYPES | string;
  goal: keyof typeof SEO_STRATEGY.STRATEGY_GOALS | string;
  priority: keyof typeof SEO_STRATEGY.STRATEGY_PRIORITIES | string;
  description?: string;
  isActive: boolean;
  duration: number;
  startDate: Date;
  endDate: Date;
  metadata: Record<string, unknown>;
}
