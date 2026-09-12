import { CONTENT_STATUS } from '@vubon/shared-constants/src/content/content-status.constants';
import { CONTENT_TYPE } from '@vubon/shared-constants/src/content/content-type.constants';

export interface ContentInput {
  title: string;
  slug: string;
  body: string;
  status: string;
  type: string;
  isPublished: boolean;
  isActive: boolean;
}

export const validateContent = (
  content: Partial<ContentInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!content.title) errors.push('Title is required');
  if (!content.slug) errors.push('Slug is required');
  if (!content.body) errors.push('Body is required');
  if (content.status && !Object.keys(CONTENT_STATUS).includes(content.status)) {
    errors.push('Invalid content status');
  }
  if (content.type && !Object.keys(CONTENT_TYPE).includes(content.type)) {
    errors.push('Invalid content type');
  }
  return { isValid: errors.length === 0, errors };
};

export const isContentPublished = (content: ContentInput): boolean => {
  return content.isPublished && content.status === 'published';
};

export const isContentActive = (content: ContentInput): boolean => {
  return content.isActive && content.status !== 'deleted' && content.status !== 'archived';
};
