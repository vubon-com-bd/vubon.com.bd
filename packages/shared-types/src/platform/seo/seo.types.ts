import { BaseEntity } from '../../common/base.types';
import { Content } from '../../content/content.types';
import { SEO } from '@vubon/shared-constants/src/platform/seo/seo.constants';
import { SEOStrategy } from './seo-strategy.types';
import { SEOKeyword } from './seo-keyword.types';
import { SEOContent } from './seo-content.types';
import { SEOAudit } from './seo-audit.types';
import { SEOScore } from './seo-score.types';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  noindex: boolean;
  nofollow: boolean;
  lastCrawledAt?: Date;
  lastIndexedAt?: Date;
}

export interface SEO extends BaseEntity {
  seoId: string;
  contentId: string;
  content: Content;
  status: keyof typeof SEO.STATUS | string;
  type: keyof typeof SEO.SEO_TYPES | string;
  strategy: SEOStrategy;
  keywords: SEOKeyword[];
  seoContent: SEOContent; // নাম পরিবর্তন করে conflict এড়ান
  audit: SEOAudit;
  score: SEOScore;
  isActive: boolean;
  isIndexed: boolean;
  isOptimized: boolean;
  metadata: SEOMetadata;
}
