import { BaseEntity } from '../../common/base.types';
import { SEO_CONTENT_OPTIMIZATION } from '@vubon/shared-constants/src/platform/seo/seo-content-optimization.constants';
import { SEOContent } from './seo-content.types';

export interface SEOContentOptimization extends BaseEntity {
  optimizationId: string;
  contentId: string;
  content: SEOContent;
  type: keyof typeof SEO_CONTENT_OPTIMIZATION.TYPES | string;
  factor: keyof typeof SEO_CONTENT_OPTIMIZATION.OPTIMIZATION_FACTORS | string;
  score: number;
  recommended: string;
  current: string;
  isOptimized: boolean;
  metadata: Record<string, unknown>;
}
