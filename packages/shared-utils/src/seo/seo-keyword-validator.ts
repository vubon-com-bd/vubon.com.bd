import { SEO_KEYWORD } from '@vubon/shared-constants/src/platform/seo/seo-keyword.constants';

export interface SEOKeywordInput {
  keyword: string;
  type: string;
  difficulty: string;
  searchVolume: number;
  cpc: number;
}

export const validateSEOKeyword = (
  keyword: Partial<SEOKeywordInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!keyword.keyword) errors.push('Keyword is required');
  if (keyword.type && !Object.keys(SEO_KEYWORD.TYPES).includes(keyword.type)) {
    errors.push('Invalid keyword type');
  }
  if (
    keyword.difficulty &&
    !Object.keys(SEO_KEYWORD.KEYWORD_DIFFICULTY).includes(keyword.difficulty)
  ) {
    errors.push('Invalid difficulty level');
  }
  if (keyword.searchVolume !== undefined && keyword.searchVolume < 0) {
    errors.push('Search volume cannot be negative');
  }
  if (keyword.cpc !== undefined && keyword.cpc < 0) {
    errors.push('CPC cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};
