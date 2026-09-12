import { SEO } from '@vubon/shared-constants/src/platform/seo/seo.constants';

export interface SEOInput {
  contentId: string;
  status: string;
  type: string;
  isActive: boolean;
  isOptimized: boolean;
  isIndexed: boolean;
  metadata?: {
    title?: string;
    description?: string;
  };
}

export const validateSEO = (seo: Partial<SEOInput>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!seo.contentId) errors.push('Content ID is required');
  if (seo.status && !Object.keys(SEO.STATUS).includes(seo.status)) {
    errors.push('Invalid SEO status');
  }
  if (seo.type && !Object.keys(SEO.SEO_TYPES).includes(seo.type)) {
    errors.push('Invalid SEO type');
  }
  if (seo.metadata?.title && seo.metadata.title.length > 60) {
    errors.push('Title must not exceed 60 characters');
  }
  if (seo.metadata?.description && seo.metadata.description.length > 160) {
    errors.push('Description must not exceed 160 characters');
  }
  return { isValid: errors.length === 0, errors };
};

export const isSEOActive = (seo: SEOInput): boolean => {
  return seo.isActive && seo.isOptimized;
};

export const isSEOIndexed = (seo: SEOInput): boolean => {
  return seo.isIndexed;
};
