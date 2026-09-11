import { EMAIL_MARKETING } from '@vubon/shared-constants/src/marketing/email-marketing.constants';

export interface EmailMarketingInput {
  subject: string;
  content: string;
  status: string;
  type: string;
}

export const validateEmailMarketing = (
  email: Partial<EmailMarketingInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!email.subject) errors.push('Subject is required');
  if (!email.content) errors.push('Content is required');
  if (email.status && !Object.keys(EMAIL_MARKETING.STATUS).includes(email.status)) {
    errors.push('Invalid email status');
  }
  if (email.type && !Object.keys(EMAIL_MARKETING.EMAIL_TYPES).includes(email.type)) {
    errors.push('Invalid email type');
  }
  return { isValid: errors.length === 0, errors };
};
