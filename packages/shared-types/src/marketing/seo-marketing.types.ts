import { TypeObject } from '../common/types.types';
import { SEO_MARKETING } from '@vubon/shared-constants/src/marketing/seo-marketing.constants';

export interface SeoMarketing extends TypeObject {
  type: keyof typeof SEO_MARKETING.TYPES | string;
  category: 'seo_marketing';
  keywordType: keyof typeof SEO_MARKETING.KEYWORD_TYPES | string;
  isOnPage: boolean;
  isOffPage: boolean;
  isTechnical: boolean;
  isLocal: boolean;
  isContent: boolean;
}

export type SeoMarketingKey = keyof typeof SEO_MARKETING.TYPES;
