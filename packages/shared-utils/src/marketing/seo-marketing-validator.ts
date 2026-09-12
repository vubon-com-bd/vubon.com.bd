import { SEO_MARKETING } from '@vubon/shared-constants/src/marketing/seo-marketing.constants';

export interface SeoMarketingInput {
  type: string;
  keywordType: string;
}

export const validateSeoMarketing = (
  seo: Partial<SeoMarketingInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!seo.type) errors.push('SEO type is required');
  if (seo.type && !Object.keys(SEO_MARKETING.TYPES).includes(seo.type)) {
    errors.push('Invalid SEO type');
  }
  if (seo.keywordType && !Object.keys(SEO_MARKETING.KEYWORD_TYPES).includes(seo.keywordType)) {
    errors.push('Invalid keyword type');
  }
  return { isValid: errors.length === 0, errors };
};
