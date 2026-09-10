import { z } from 'zod';
import { SEO_MARKETING } from '@vubon/shared-constants/src/marketing/seo-marketing.constants';

const seoMarketingTypeKeys = Object.keys(SEO_MARKETING.TYPES) as [string, ...string[]];
const seoMarketingKeywordTypeKeys = Object.keys(SEO_MARKETING.KEYWORD_TYPES) as [
  string,
  ...string[],
];

export const SeoMarketingSchema = z.object({
  type: z.enum(seoMarketingTypeKeys),
  category: z.literal('seo_marketing'),
  keywordType: z.enum(seoMarketingKeywordTypeKeys),
  isOnPage: z.boolean().default(false),
  isOffPage: z.boolean().default(false),
  isTechnical: z.boolean().default(false),
  isLocal: z.boolean().default(false),
  isContent: z.boolean().default(false),
});

export const SeoMarketingEnumSchema = z.enum(seoMarketingTypeKeys);
