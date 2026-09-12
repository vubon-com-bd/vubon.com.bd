import { SUPPORT_FAQ } from '@vubon/shared-constants/src/support/faq.constants';

export interface SupportFaqInput {
  question: string;
  answer: string;
  status: string;
  type: string;
  category: string;
}

export const validateSupportFaq = (
  faq: Partial<SupportFaqInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!faq.question) errors.push('Question is required');
  if (!faq.answer) errors.push('Answer is required');
  if (faq.status && !Object.keys(SUPPORT_FAQ.STATUS).includes(faq.status)) {
    errors.push('Invalid FAQ status');
  }
  return { isValid: errors.length === 0, errors };
};
