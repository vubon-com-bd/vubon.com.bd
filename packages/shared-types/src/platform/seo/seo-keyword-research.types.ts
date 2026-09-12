import { BaseEntity } from '../../common/base.types';
import { SEO_KEYWORD_RESEARCH } from '@vubon/shared-constants/src/platform/seo/seo-keyword-research.constants';
import { SEOKeyword } from './seo-keyword.types';

export interface KeywordResearchMetrics {
  searchVolume: number;
  keywordDifficulty: number;
  cpc: number;
  trend: number;
  competition: number;
}

export interface SEOKeywordResearch extends BaseEntity {
  researchId: string;
  keywordId: string;
  keyword: SEOKeyword;
  type: keyof typeof SEO_KEYWORD_RESEARCH.TYPES | string;
  tool: keyof typeof SEO_KEYWORD_RESEARCH.RESEARCH_TOOLS | string;
  metrics: KeywordResearchMetrics;
  isActive: boolean;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
