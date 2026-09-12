import { BaseEntity } from '../../common/base.types';
import { SEO_KEYWORD } from '@vubon/shared-constants/src/platform/seo/seo-keyword.constants';
import { SEO } from './seo.types';

export interface SEOKeyword extends BaseEntity {
  keywordId: string;
  seoId: string;
  seo: SEO;
  type: keyof typeof SEO_KEYWORD.TYPES | string;
  keyword: string;
  length: keyof typeof SEO_KEYWORD.KEYWORD_LENGTHS | string;
  difficulty: keyof typeof SEO_KEYWORD.KEYWORD_DIFFICULTY | string;
  searchVolume: number;
  cpc: number;
  competition: number;
  isActive: boolean;
  isTracking: boolean;
  metadata: Record<string, unknown>;
}
