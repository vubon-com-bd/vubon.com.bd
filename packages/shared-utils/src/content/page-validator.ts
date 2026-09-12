import { PAGE_STATUS } from '@vubon/shared-constants/src/content/page-status.constants';
import { PAGE } from '@vubon/shared-constants/src/content/page.constants';

export interface PageInput {
  title: string;
  slug: string;
  content: string;
  status: string;
  type: string;
}

export const validatePage = (page: Partial<PageInput>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!page.title) errors.push('Page title is required');
  if (!page.slug) errors.push('Page slug is required');
  if (!page.content) errors.push('Page content is required');
  if (page.status && !Object.keys(PAGE_STATUS).includes(page.status)) {
    errors.push('Invalid page status');
  }
  if (page.type && !Object.keys(PAGE.PAGE_TYPES).includes(page.type)) {
    errors.push('Invalid page type');
  }
  return { isValid: errors.length === 0, errors };
};
