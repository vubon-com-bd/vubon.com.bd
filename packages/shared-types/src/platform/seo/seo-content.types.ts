import { BaseEntity } from '../../common/base.types';
import { Content } from '../../content/content.types';
import { SEO_CONTENT } from '@vubon/shared-constants/src/platform/seo/seo-content.constants';
import { SEOKeyword } from './seo-keyword.types';
import { SEO } from './seo.types';

export interface SEOContent extends BaseEntity {
  contentId: string;
  seoId: string;
  seo: SEO;
  type: keyof typeof SEO_CONTENT.TYPES | string;
  content: Content;
  keywords: SEOKeyword[];
  wordCount: number;
  readabilityScore: number;
  length: keyof typeof SEO_CONTENT.CONTENT_LENGTH | string;
  isActive: boolean;
  isOptimized: boolean;
  metadata: Record<string, unknown>;
}
