import { NEWSLETTER_STATUS } from '@vubon/shared-constants/src/content/newsletter-status.constants';
import { NEWSLETTER } from '@vubon/shared-constants/src/content/newsletter.constants';

export interface NewsletterInput {
  subject: string;
  content: string;
  status: string;
  type: string;
}

export const validateNewsletter = (
  newsletter: Partial<NewsletterInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!newsletter.subject) errors.push('Subject is required');
  if (!newsletter.content) errors.push('Content is required');
  if (newsletter.status && !Object.keys(NEWSLETTER_STATUS).includes(newsletter.status)) {
    errors.push('Invalid newsletter status');
  }
  if (newsletter.type && !Object.keys(NEWSLETTER.NEWSLETTER_TYPES).includes(newsletter.type)) {
    errors.push('Invalid newsletter type');
  }
  return { isValid: errors.length === 0, errors };
};
